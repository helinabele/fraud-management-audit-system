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
import org.audit.app.domain.WhistleBlowerReport;
import org.audit.app.domain.enumeration.Gender;
import org.audit.app.repository.WhistleBlowerReportRepository;
import org.audit.app.service.WhistleBlowerReportService;
import org.audit.app.service.dto.WhistleBlowerReportDTO;
import org.audit.app.service.mapper.WhistleBlowerReportMapper;
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
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link WhistleBlowerReportResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class WhistleBlowerReportResourceIT {

    private static final String DEFAULT_FULL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FULL_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER_TYPE = Gender.MALE;
    private static final Gender UPDATED_GENDER_TYPE = Gender.FEMALE;

    private static final String DEFAULT_EMAIL_ADRESS = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ADRESS = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHONE = 1;
    private static final Integer UPDATED_PHONE = 2;

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ATTACHMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ATTACHMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ATTACHMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ATTACHMENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_ZONE = "AAAAAAAAAA";
    private static final String UPDATED_ZONE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/whistle-blower-reports";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private WhistleBlowerReportRepository whistleBlowerReportRepository;

    @Mock
    private WhistleBlowerReportRepository whistleBlowerReportRepositoryMock;

    @Autowired
    private WhistleBlowerReportMapper whistleBlowerReportMapper;

    @Mock
    private WhistleBlowerReportService whistleBlowerReportServiceMock;

    @Autowired
    private MockMvc restWhistleBlowerReportMockMvc;

    private WhistleBlowerReport whistleBlowerReport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WhistleBlowerReport createEntity() {
        WhistleBlowerReport whistleBlowerReport = new WhistleBlowerReport()
            .fullName(DEFAULT_FULL_NAME)
            .genderType(DEFAULT_GENDER_TYPE)
            .emailAdress(DEFAULT_EMAIL_ADRESS)
            .phone(DEFAULT_PHONE)
            .organization(DEFAULT_ORGANIZATION)
            .message(DEFAULT_MESSAGE)
            .attachment(DEFAULT_ATTACHMENT)
            .attachmentContentType(DEFAULT_ATTACHMENT_CONTENT_TYPE)
            .position(DEFAULT_POSITION)
            .zone(DEFAULT_ZONE)
            .description(DEFAULT_DESCRIPTION);
        return whistleBlowerReport;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WhistleBlowerReport createUpdatedEntity() {
        WhistleBlowerReport whistleBlowerReport = new WhistleBlowerReport()
            .fullName(UPDATED_FULL_NAME)
            .genderType(UPDATED_GENDER_TYPE)
            .emailAdress(UPDATED_EMAIL_ADRESS)
            .phone(UPDATED_PHONE)
            .organization(UPDATED_ORGANIZATION)
            .message(UPDATED_MESSAGE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .position(UPDATED_POSITION)
            .zone(UPDATED_ZONE)
            .description(UPDATED_DESCRIPTION);
        return whistleBlowerReport;
    }

    @BeforeEach
    public void initTest() {
        whistleBlowerReportRepository.deleteAll();
        whistleBlowerReport = createEntity();
    }

    @Test
    void createWhistleBlowerReport() throws Exception {
        int databaseSizeBeforeCreate = whistleBlowerReportRepository.findAll().size();
        // Create the WhistleBlowerReport
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);
        restWhistleBlowerReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isCreated());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeCreate + 1);
        WhistleBlowerReport testWhistleBlowerReport = whistleBlowerReportList.get(whistleBlowerReportList.size() - 1);
        assertThat(testWhistleBlowerReport.getFullName()).isEqualTo(DEFAULT_FULL_NAME);
        assertThat(testWhistleBlowerReport.getGenderType()).isEqualTo(DEFAULT_GENDER_TYPE);
        assertThat(testWhistleBlowerReport.getEmailAdress()).isEqualTo(DEFAULT_EMAIL_ADRESS);
        assertThat(testWhistleBlowerReport.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testWhistleBlowerReport.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testWhistleBlowerReport.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testWhistleBlowerReport.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testWhistleBlowerReport.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testWhistleBlowerReport.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testWhistleBlowerReport.getZone()).isEqualTo(DEFAULT_ZONE);
        assertThat(testWhistleBlowerReport.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    void createWhistleBlowerReportWithExistingId() throws Exception {
        // Create the WhistleBlowerReport with an existing ID
        whistleBlowerReport.setId("existing_id");
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);

        int databaseSizeBeforeCreate = whistleBlowerReportRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWhistleBlowerReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllWhistleBlowerReports() throws Exception {
        // Initialize the database
        whistleBlowerReportRepository.save(whistleBlowerReport);

        // Get all the whistleBlowerReportList
        restWhistleBlowerReportMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(whistleBlowerReport.getId())))
            .andExpect(jsonPath("$.[*].fullName").value(hasItem(DEFAULT_FULL_NAME)))
            .andExpect(jsonPath("$.[*].genderType").value(hasItem(DEFAULT_GENDER_TYPE.toString())))
            .andExpect(jsonPath("$.[*].emailAdress").value(hasItem(DEFAULT_EMAIL_ADRESS)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION)))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
            .andExpect(jsonPath("$.[*].zone").value(hasItem(DEFAULT_ZONE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWhistleBlowerReportsWithEagerRelationshipsIsEnabled() throws Exception {
        when(whistleBlowerReportServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restWhistleBlowerReportMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(whistleBlowerReportServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWhistleBlowerReportsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(whistleBlowerReportServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restWhistleBlowerReportMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(whistleBlowerReportRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getWhistleBlowerReport() throws Exception {
        // Initialize the database
        whistleBlowerReportRepository.save(whistleBlowerReport);

        // Get the whistleBlowerReport
        restWhistleBlowerReportMockMvc
            .perform(get(ENTITY_API_URL_ID, whistleBlowerReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(whistleBlowerReport.getId()))
            .andExpect(jsonPath("$.fullName").value(DEFAULT_FULL_NAME))
            .andExpect(jsonPath("$.genderType").value(DEFAULT_GENDER_TYPE.toString()))
            .andExpect(jsonPath("$.emailAdress").value(DEFAULT_EMAIL_ADRESS))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE))
            .andExpect(jsonPath("$.attachmentContentType").value(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.attachment").value(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION))
            .andExpect(jsonPath("$.zone").value(DEFAULT_ZONE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    void getNonExistingWhistleBlowerReport() throws Exception {
        // Get the whistleBlowerReport
        restWhistleBlowerReportMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingWhistleBlowerReport() throws Exception {
        // Initialize the database
        whistleBlowerReportRepository.save(whistleBlowerReport);

        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();

        // Update the whistleBlowerReport
        WhistleBlowerReport updatedWhistleBlowerReport = whistleBlowerReportRepository.findById(whistleBlowerReport.getId()).get();
        updatedWhistleBlowerReport
            .fullName(UPDATED_FULL_NAME)
            .genderType(UPDATED_GENDER_TYPE)
            .emailAdress(UPDATED_EMAIL_ADRESS)
            .phone(UPDATED_PHONE)
            .organization(UPDATED_ORGANIZATION)
            .message(UPDATED_MESSAGE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .position(UPDATED_POSITION)
            .zone(UPDATED_ZONE)
            .description(UPDATED_DESCRIPTION);
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(updatedWhistleBlowerReport);

        restWhistleBlowerReportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, whistleBlowerReportDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isOk());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
        WhistleBlowerReport testWhistleBlowerReport = whistleBlowerReportList.get(whistleBlowerReportList.size() - 1);
        assertThat(testWhistleBlowerReport.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testWhistleBlowerReport.getGenderType()).isEqualTo(UPDATED_GENDER_TYPE);
        assertThat(testWhistleBlowerReport.getEmailAdress()).isEqualTo(UPDATED_EMAIL_ADRESS);
        assertThat(testWhistleBlowerReport.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testWhistleBlowerReport.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testWhistleBlowerReport.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testWhistleBlowerReport.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testWhistleBlowerReport.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testWhistleBlowerReport.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testWhistleBlowerReport.getZone()).isEqualTo(UPDATED_ZONE);
        assertThat(testWhistleBlowerReport.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void putNonExistingWhistleBlowerReport() throws Exception {
        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();
        whistleBlowerReport.setId(UUID.randomUUID().toString());

        // Create the WhistleBlowerReport
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWhistleBlowerReportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, whistleBlowerReportDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchWhistleBlowerReport() throws Exception {
        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();
        whistleBlowerReport.setId(UUID.randomUUID().toString());

        // Create the WhistleBlowerReport
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWhistleBlowerReportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamWhistleBlowerReport() throws Exception {
        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();
        whistleBlowerReport.setId(UUID.randomUUID().toString());

        // Create the WhistleBlowerReport
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWhistleBlowerReportMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateWhistleBlowerReportWithPatch() throws Exception {
        // Initialize the database
        whistleBlowerReportRepository.save(whistleBlowerReport);

        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();

        // Update the whistleBlowerReport using partial update
        WhistleBlowerReport partialUpdatedWhistleBlowerReport = new WhistleBlowerReport();
        partialUpdatedWhistleBlowerReport.setId(whistleBlowerReport.getId());

        partialUpdatedWhistleBlowerReport
            .fullName(UPDATED_FULL_NAME)
            .emailAdress(UPDATED_EMAIL_ADRESS)
            .phone(UPDATED_PHONE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .position(UPDATED_POSITION)
            .zone(UPDATED_ZONE)
            .description(UPDATED_DESCRIPTION);

        restWhistleBlowerReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWhistleBlowerReport.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWhistleBlowerReport))
            )
            .andExpect(status().isOk());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
        WhistleBlowerReport testWhistleBlowerReport = whistleBlowerReportList.get(whistleBlowerReportList.size() - 1);
        assertThat(testWhistleBlowerReport.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testWhistleBlowerReport.getGenderType()).isEqualTo(DEFAULT_GENDER_TYPE);
        assertThat(testWhistleBlowerReport.getEmailAdress()).isEqualTo(UPDATED_EMAIL_ADRESS);
        assertThat(testWhistleBlowerReport.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testWhistleBlowerReport.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
        assertThat(testWhistleBlowerReport.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testWhistleBlowerReport.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testWhistleBlowerReport.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testWhistleBlowerReport.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testWhistleBlowerReport.getZone()).isEqualTo(UPDATED_ZONE);
        assertThat(testWhistleBlowerReport.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void fullUpdateWhistleBlowerReportWithPatch() throws Exception {
        // Initialize the database
        whistleBlowerReportRepository.save(whistleBlowerReport);

        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();

        // Update the whistleBlowerReport using partial update
        WhistleBlowerReport partialUpdatedWhistleBlowerReport = new WhistleBlowerReport();
        partialUpdatedWhistleBlowerReport.setId(whistleBlowerReport.getId());

        partialUpdatedWhistleBlowerReport
            .fullName(UPDATED_FULL_NAME)
            .genderType(UPDATED_GENDER_TYPE)
            .emailAdress(UPDATED_EMAIL_ADRESS)
            .phone(UPDATED_PHONE)
            .organization(UPDATED_ORGANIZATION)
            .message(UPDATED_MESSAGE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .position(UPDATED_POSITION)
            .zone(UPDATED_ZONE)
            .description(UPDATED_DESCRIPTION);

        restWhistleBlowerReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWhistleBlowerReport.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWhistleBlowerReport))
            )
            .andExpect(status().isOk());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
        WhistleBlowerReport testWhistleBlowerReport = whistleBlowerReportList.get(whistleBlowerReportList.size() - 1);
        assertThat(testWhistleBlowerReport.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testWhistleBlowerReport.getGenderType()).isEqualTo(UPDATED_GENDER_TYPE);
        assertThat(testWhistleBlowerReport.getEmailAdress()).isEqualTo(UPDATED_EMAIL_ADRESS);
        assertThat(testWhistleBlowerReport.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testWhistleBlowerReport.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
        assertThat(testWhistleBlowerReport.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testWhistleBlowerReport.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testWhistleBlowerReport.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testWhistleBlowerReport.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testWhistleBlowerReport.getZone()).isEqualTo(UPDATED_ZONE);
        assertThat(testWhistleBlowerReport.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void patchNonExistingWhistleBlowerReport() throws Exception {
        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();
        whistleBlowerReport.setId(UUID.randomUUID().toString());

        // Create the WhistleBlowerReport
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWhistleBlowerReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, whistleBlowerReportDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchWhistleBlowerReport() throws Exception {
        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();
        whistleBlowerReport.setId(UUID.randomUUID().toString());

        // Create the WhistleBlowerReport
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWhistleBlowerReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamWhistleBlowerReport() throws Exception {
        int databaseSizeBeforeUpdate = whistleBlowerReportRepository.findAll().size();
        whistleBlowerReport.setId(UUID.randomUUID().toString());

        // Create the WhistleBlowerReport
        WhistleBlowerReportDTO whistleBlowerReportDTO = whistleBlowerReportMapper.toDto(whistleBlowerReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWhistleBlowerReportMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(whistleBlowerReportDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the WhistleBlowerReport in the database
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteWhistleBlowerReport() throws Exception {
        // Initialize the database
        whistleBlowerReportRepository.save(whistleBlowerReport);

        int databaseSizeBeforeDelete = whistleBlowerReportRepository.findAll().size();

        // Delete the whistleBlowerReport
        restWhistleBlowerReportMockMvc
            .perform(delete(ENTITY_API_URL_ID, whistleBlowerReport.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WhistleBlowerReport> whistleBlowerReportList = whistleBlowerReportRepository.findAll();
        assertThat(whistleBlowerReportList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
