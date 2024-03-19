package org.audit.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.audit.app.IntegrationTest;
import org.audit.app.domain.SubCity;
import org.audit.app.repository.SubCityRepository;
import org.audit.app.service.SubCityService;
import org.audit.app.service.dto.SubCityDTO;
import org.audit.app.service.mapper.SubCityMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link SubCityResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class SubCityResourceIT {

    private static final String DEFAULT_SUB_CITY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SUB_CITY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/sub-cities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private SubCityRepository subCityRepository;

    @Mock
    private SubCityRepository subCityRepositoryMock;

    @Autowired
    private SubCityMapper subCityMapper;

    @Mock
    private SubCityService subCityServiceMock;

    @Autowired
    private MockMvc restSubCityMockMvc;

    private SubCity subCity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubCity createEntity() {
        SubCity subCity = new SubCity().subCityName(DEFAULT_SUB_CITY_NAME).description(DEFAULT_DESCRIPTION);
        return subCity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubCity createUpdatedEntity() {
        SubCity subCity = new SubCity().subCityName(UPDATED_SUB_CITY_NAME).description(UPDATED_DESCRIPTION);
        return subCity;
    }

    @BeforeEach
    public void initTest() {
        subCityRepository.deleteAll();
        subCity = createEntity();
    }

    @Test
    void createSubCity() throws Exception {
        int databaseSizeBeforeCreate = subCityRepository.findAll().size();
        // Create the SubCity
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);
        restSubCityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subCityDTO)))
            .andExpect(status().isCreated());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeCreate + 1);
        SubCity testSubCity = subCityList.get(subCityList.size() - 1);
        assertThat(testSubCity.getSubCityName()).isEqualTo(DEFAULT_SUB_CITY_NAME);
        assertThat(testSubCity.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    void createSubCityWithExistingId() throws Exception {
        // Create the SubCity with an existing ID
        subCity.setId("existing_id");
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        int databaseSizeBeforeCreate = subCityRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubCityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subCityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkSubCityNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subCityRepository.findAll().size();
        // set the field null
        subCity.setSubCityName(null);

        // Create the SubCity, which fails.
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        restSubCityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subCityDTO)))
            .andExpect(status().isBadRequest());

        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllSubCities() throws Exception {
        // Initialize the database
        subCityRepository.save(subCity);

        // Get all the subCityList
        restSubCityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subCity.getId())))
            .andExpect(jsonPath("$.[*].subCityName").value(hasItem(DEFAULT_SUB_CITY_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSubCitiesWithEagerRelationshipsIsEnabled() throws Exception {
        when(subCityServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSubCityMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(subCityServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSubCitiesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(subCityServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSubCityMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(subCityRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getSubCity() throws Exception {
        // Initialize the database
        subCityRepository.save(subCity);

        // Get the subCity
        restSubCityMockMvc
            .perform(get(ENTITY_API_URL_ID, subCity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subCity.getId()))
            .andExpect(jsonPath("$.subCityName").value(DEFAULT_SUB_CITY_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    void getNonExistingSubCity() throws Exception {
        // Get the subCity
        restSubCityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingSubCity() throws Exception {
        // Initialize the database
        subCityRepository.save(subCity);

        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();

        // Update the subCity
        SubCity updatedSubCity = subCityRepository.findById(subCity.getId()).get();
        updatedSubCity.subCityName(UPDATED_SUB_CITY_NAME).description(UPDATED_DESCRIPTION);
        SubCityDTO subCityDTO = subCityMapper.toDto(updatedSubCity);

        restSubCityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, subCityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(subCityDTO))
            )
            .andExpect(status().isOk());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
        SubCity testSubCity = subCityList.get(subCityList.size() - 1);
        assertThat(testSubCity.getSubCityName()).isEqualTo(UPDATED_SUB_CITY_NAME);
        assertThat(testSubCity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void putNonExistingSubCity() throws Exception {
        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();
        subCity.setId(UUID.randomUUID().toString());

        // Create the SubCity
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubCityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, subCityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(subCityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchSubCity() throws Exception {
        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();
        subCity.setId(UUID.randomUUID().toString());

        // Create the SubCity
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubCityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(subCityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamSubCity() throws Exception {
        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();
        subCity.setId(UUID.randomUUID().toString());

        // Create the SubCity
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubCityMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subCityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateSubCityWithPatch() throws Exception {
        // Initialize the database
        subCityRepository.save(subCity);

        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();

        // Update the subCity using partial update
        SubCity partialUpdatedSubCity = new SubCity();
        partialUpdatedSubCity.setId(subCity.getId());

        partialUpdatedSubCity.subCityName(UPDATED_SUB_CITY_NAME).description(UPDATED_DESCRIPTION);

        restSubCityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubCity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSubCity))
            )
            .andExpect(status().isOk());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
        SubCity testSubCity = subCityList.get(subCityList.size() - 1);
        assertThat(testSubCity.getSubCityName()).isEqualTo(UPDATED_SUB_CITY_NAME);
        assertThat(testSubCity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void fullUpdateSubCityWithPatch() throws Exception {
        // Initialize the database
        subCityRepository.save(subCity);

        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();

        // Update the subCity using partial update
        SubCity partialUpdatedSubCity = new SubCity();
        partialUpdatedSubCity.setId(subCity.getId());

        partialUpdatedSubCity.subCityName(UPDATED_SUB_CITY_NAME).description(UPDATED_DESCRIPTION);

        restSubCityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubCity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSubCity))
            )
            .andExpect(status().isOk());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
        SubCity testSubCity = subCityList.get(subCityList.size() - 1);
        assertThat(testSubCity.getSubCityName()).isEqualTo(UPDATED_SUB_CITY_NAME);
        assertThat(testSubCity.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void patchNonExistingSubCity() throws Exception {
        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();
        subCity.setId(UUID.randomUUID().toString());

        // Create the SubCity
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubCityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, subCityDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(subCityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchSubCity() throws Exception {
        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();
        subCity.setId(UUID.randomUUID().toString());

        // Create the SubCity
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubCityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(subCityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamSubCity() throws Exception {
        int databaseSizeBeforeUpdate = subCityRepository.findAll().size();
        subCity.setId(UUID.randomUUID().toString());

        // Create the SubCity
        SubCityDTO subCityDTO = subCityMapper.toDto(subCity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubCityMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(subCityDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SubCity in the database
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteSubCity() throws Exception {
        // Initialize the database
        subCityRepository.save(subCity);

        int databaseSizeBeforeDelete = subCityRepository.findAll().size();

        // Delete the subCity
        restSubCityMockMvc
            .perform(delete(ENTITY_API_URL_ID, subCity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubCity> subCityList = subCityRepository.findAll();
        assertThat(subCityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
