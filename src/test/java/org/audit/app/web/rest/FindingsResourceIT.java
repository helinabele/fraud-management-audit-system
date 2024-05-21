package org.audit.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.UUID;
import org.audit.app.IntegrationTest;
import org.audit.app.domain.Findings;
import org.audit.app.repository.FindingsRepository;
import org.audit.app.service.dto.FindingsDTO;
import org.audit.app.service.mapper.FindingsMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link FindingsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FindingsResourceIT {

    private static final String DEFAULT_FINDING_AND_ANALYSIS = "AAAAAAAAAA";
    private static final String UPDATED_FINDING_AND_ANALYSIS = "BBBBBBBBBB";

    // private static final byte[] DEFAULT_FINDING_AND_ANALYSIS_ANNEX = TestUtil.createByteArray(1, "0");
    // private static final byte[] UPDATED_FINDING_AND_ANALYSIS_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/findings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private FindingsRepository findingsRepository;

    @Autowired
    private FindingsMapper findingsMapper;

    @Autowired
    private MockMvc restFindingsMockMvc;

    private Findings findings;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Findings createEntity() {
        Findings findings = new Findings()
            .findingAndAnalysis(DEFAULT_FINDING_AND_ANALYSIS)
            // .findingAndAnalysisAnnex(DEFAULT_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
        return findings;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Findings createUpdatedEntity() {
        Findings findings = new Findings()
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            // .findingAndAnalysisAnnex(UPDATED_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
        return findings;
    }

    @BeforeEach
    public void initTest() {
        findingsRepository.deleteAll();
        findings = createEntity();
    }

    @Test
    void createFindings() throws Exception {
        int databaseSizeBeforeCreate = findingsRepository.findAll().size();
        // Create the Findings
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);
        restFindingsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(findingsDTO)))
            .andExpect(status().isCreated());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeCreate + 1);
        Findings testFindings = findingsList.get(findingsList.size() - 1);
        assertThat(testFindings.getFindingAndAnalysis()).isEqualTo(DEFAULT_FINDING_AND_ANALYSIS);
        // assertThat(testFindings.getFindingAndAnalysisAnnex()).isEqualTo(DEFAULT_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFindings.getFindingAndAnalysisAnnexContentType()).isEqualTo(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
    }

    @Test
    void createFindingsWithExistingId() throws Exception {
        // Create the Findings with an existing ID
        findings.setId("existing_id");
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);

        int databaseSizeBeforeCreate = findingsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFindingsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(findingsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllFindings() throws Exception {
        // Initialize the database
        findingsRepository.save(findings);

        // Get all the findingsList
        restFindingsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(findings.getId())))
            .andExpect(jsonPath("$.[*].findingAndAnalysis").value(hasItem(DEFAULT_FINDING_AND_ANALYSIS)))
            .andExpect(jsonPath("$.[*].findingAndAnalysisAnnexContentType").value(hasItem(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE)));
            // .andExpect(
            //     jsonPath("$.[*].findingAndAnalysisAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_FINDING_AND_ANALYSIS_ANNEX)))
            // );
    }

    @Test
    void getFindings() throws Exception {
        // Initialize the database
        findingsRepository.save(findings);

        // Get the findings
        restFindingsMockMvc
            .perform(get(ENTITY_API_URL_ID, findings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(findings.getId()))
            .andExpect(jsonPath("$.findingAndAnalysis").value(DEFAULT_FINDING_AND_ANALYSIS))
            .andExpect(jsonPath("$.findingAndAnalysisAnnexContentType").value(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE));
            // .andExpect(jsonPath("$.findingAndAnalysisAnnex").value(Base64Utils.encodeToString(DEFAULT_FINDING_AND_ANALYSIS_ANNEX)));
    }

    @Test
    void getNonExistingFindings() throws Exception {
        // Get the findings
        restFindingsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingFindings() throws Exception {
        // Initialize the database
        findingsRepository.save(findings);

        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();

        // Update the findings
        Findings updatedFindings = findingsRepository.findById(findings.getId()).get();
        updatedFindings
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            // .findingAndAnalysisAnnex(UPDATED_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
        FindingsDTO findingsDTO = findingsMapper.toDto(updatedFindings);

        restFindingsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, findingsDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(findingsDTO))
            )
            .andExpect(status().isOk());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
        Findings testFindings = findingsList.get(findingsList.size() - 1);
        assertThat(testFindings.getFindingAndAnalysis()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS);
        // assertThat(testFindings.getFindingAndAnalysisAnnex()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFindings.getFindingAndAnalysisAnnexContentType()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
    }

    @Test
    void putNonExistingFindings() throws Exception {
        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();
        findings.setId(UUID.randomUUID().toString());

        // Create the Findings
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFindingsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, findingsDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(findingsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchFindings() throws Exception {
        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();
        findings.setId(UUID.randomUUID().toString());

        // Create the Findings
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFindingsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(findingsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamFindings() throws Exception {
        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();
        findings.setId(UUID.randomUUID().toString());

        // Create the Findings
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFindingsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(findingsDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateFindingsWithPatch() throws Exception {
        // Initialize the database
        findingsRepository.save(findings);

        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();

        // Update the findings using partial update
        Findings partialUpdatedFindings = new Findings();
        partialUpdatedFindings.setId(findings.getId());

        partialUpdatedFindings
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            // .findingAndAnalysisAnnex(UPDATED_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);

        restFindingsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFindings.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFindings))
            )
            .andExpect(status().isOk());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
        Findings testFindings = findingsList.get(findingsList.size() - 1);
        assertThat(testFindings.getFindingAndAnalysis()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS);
        // assertThat(testFindings.getFindingAndAnalysisAnnex()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFindings.getFindingAndAnalysisAnnexContentType()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
    }

    @Test
    void fullUpdateFindingsWithPatch() throws Exception {
        // Initialize the database
        findingsRepository.save(findings);

        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();

        // Update the findings using partial update
        Findings partialUpdatedFindings = new Findings();
        partialUpdatedFindings.setId(findings.getId());

        partialUpdatedFindings
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            // .findingAndAnalysisAnnex(UPDATED_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);

        restFindingsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFindings.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFindings))
            )
            .andExpect(status().isOk());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
        Findings testFindings = findingsList.get(findingsList.size() - 1);
        assertThat(testFindings.getFindingAndAnalysis()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS);
        // assertThat(testFindings.getFindingAndAnalysisAnnex()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFindings.getFindingAndAnalysisAnnexContentType()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
    }

    @Test
    void patchNonExistingFindings() throws Exception {
        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();
        findings.setId(UUID.randomUUID().toString());

        // Create the Findings
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFindingsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, findingsDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(findingsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchFindings() throws Exception {
        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();
        findings.setId(UUID.randomUUID().toString());

        // Create the Findings
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFindingsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(findingsDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamFindings() throws Exception {
        int databaseSizeBeforeUpdate = findingsRepository.findAll().size();
        findings.setId(UUID.randomUUID().toString());

        // Create the Findings
        FindingsDTO findingsDTO = findingsMapper.toDto(findings);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFindingsMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(findingsDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Findings in the database
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteFindings() throws Exception {
        // Initialize the database
        findingsRepository.save(findings);

        int databaseSizeBeforeDelete = findingsRepository.findAll().size();

        // Delete the findings
        restFindingsMockMvc
            .perform(delete(ENTITY_API_URL_ID, findings.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Findings> findingsList = findingsRepository.findAll();
        assertThat(findingsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
