package org.audit.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.audit.app.IntegrationTest;
import org.audit.app.domain.FraudInvestigationReport;
import org.audit.app.repository.FraudInvestigationReportRepository;
import org.audit.app.service.FraudInvestigationReportService;
import org.audit.app.service.dto.FraudInvestigationReportDTO;
import org.audit.app.service.mapper.FraudInvestigationReportMapper;
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
 * Integration tests for the {@link FraudInvestigationReportResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class FraudInvestigationReportResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_EXECUTIVE_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_EXECUTIVE_SUMMARY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_INTRODUCTION_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_INTRODUCTION_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_INTRODUCTION_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_INTRODUCTION = "AAAAAAAAAA";
    private static final String UPDATED_INTRODUCTION = "BBBBBBBBBB";

    private static final String DEFAULT_OBJECTIVE = "AAAAAAAAAA";
    private static final String UPDATED_OBJECTIVE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_OBJECTIVE_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_OBJECTIVE_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_OBJECTIVE_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_OBJECTIVE_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_SCOPE = "AAAAAAAAAA";
    private static final String UPDATED_SCOPE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_SCOPE_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_SCOPE_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_SCOPE_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_SCOPE_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_LIMITATION = "AAAAAAAAAA";
    private static final String UPDATED_LIMITATION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LIMITATION_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LIMITATION_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LIMITATION_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LIMITATION_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_METHODOLOGY = "AAAAAAAAAA";
    private static final String UPDATED_METHODOLOGY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_METHODOLOGY_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_METHODOLOGY_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_METHODOLOGY_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_FINDING_AND_ANALYSIS = "AAAAAAAAAA";
    private static final String UPDATED_FINDING_AND_ANALYSIS = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FINDING_AND_ANALYSIS_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FINDING_AND_ANALYSIS_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CONCLUSION = "AAAAAAAAAA";
    private static final String UPDATED_CONCLUSION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_CONCLUSION_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONCLUSION_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CONCLUSION_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_RECOMMENDATION = "AAAAAAAAAA";
    private static final String UPDATED_RECOMMENDATION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_RECOMMENDATION_ANNEX = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_RECOMMENDATION_ANNEX = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_RECOMMENDATION_ANNEX_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_SIGNATURE = "AAAAAAAAAA";
    private static final String UPDATED_SIGNATURE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_REFERENCES = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_REFERENCES = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_REFERENCES_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_REFERENCES_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_PUBLICATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PUBLICATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/fraud-investigation-reports";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private FraudInvestigationReportRepository fraudInvestigationReportRepository;

    @Mock
    private FraudInvestigationReportRepository fraudInvestigationReportRepositoryMock;

    @Autowired
    private FraudInvestigationReportMapper fraudInvestigationReportMapper;

    @Mock
    private FraudInvestigationReportService fraudInvestigationReportServiceMock;

    @Autowired
    private MockMvc restFraudInvestigationReportMockMvc;

    private FraudInvestigationReport fraudInvestigationReport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FraudInvestigationReport createEntity() {
        FraudInvestigationReport fraudInvestigationReport = new FraudInvestigationReport()
            .title(DEFAULT_TITLE)
            .executiveSummary(DEFAULT_EXECUTIVE_SUMMARY)
            .introductionAnnex(DEFAULT_INTRODUCTION_ANNEX)
            .introductionAnnexContentType(DEFAULT_INTRODUCTION_ANNEX_CONTENT_TYPE)
            .introduction(DEFAULT_INTRODUCTION)
            .objective(DEFAULT_OBJECTIVE)
            .objectiveAnnex(DEFAULT_OBJECTIVE_ANNEX)
            .objectiveAnnexContentType(DEFAULT_OBJECTIVE_ANNEX_CONTENT_TYPE)
            .scope(DEFAULT_SCOPE)
            .scopeAnnex(DEFAULT_SCOPE_ANNEX)
            .scopeAnnexContentType(DEFAULT_SCOPE_ANNEX_CONTENT_TYPE)
            .limitation(DEFAULT_LIMITATION)
            .limitationAnnex(DEFAULT_LIMITATION_ANNEX)
            .limitationAnnexContentType(DEFAULT_LIMITATION_ANNEX_CONTENT_TYPE)
            .methodology(DEFAULT_METHODOLOGY)
            .methodologyAnnex(DEFAULT_METHODOLOGY_ANNEX)
            .methodologyAnnexContentType(DEFAULT_METHODOLOGY_ANNEX_CONTENT_TYPE)
            .findingAndAnalysis(DEFAULT_FINDING_AND_ANALYSIS)
            .findingAndAnalysisAnnex(DEFAULT_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE)
            .conclusion(DEFAULT_CONCLUSION)
            .conclusionAnnex(DEFAULT_CONCLUSION_ANNEX)
            .conclusionAnnexContentType(DEFAULT_CONCLUSION_ANNEX_CONTENT_TYPE)
            .recommendation(DEFAULT_RECOMMENDATION)
            .recommendationAnnex(DEFAULT_RECOMMENDATION_ANNEX)
            .recommendationAnnexContentType(DEFAULT_RECOMMENDATION_ANNEX_CONTENT_TYPE)
            .signature(DEFAULT_SIGNATURE)
            .references(DEFAULT_REFERENCES)
            .referencesContentType(DEFAULT_REFERENCES_CONTENT_TYPE)
            .publicationDate(DEFAULT_PUBLICATION_DATE)
            .author(DEFAULT_AUTHOR);
        return fraudInvestigationReport;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FraudInvestigationReport createUpdatedEntity() {
        FraudInvestigationReport fraudInvestigationReport = new FraudInvestigationReport()
            .title(UPDATED_TITLE)
            .executiveSummary(UPDATED_EXECUTIVE_SUMMARY)
            .introductionAnnex(UPDATED_INTRODUCTION_ANNEX)
            .introductionAnnexContentType(UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE)
            .introduction(UPDATED_INTRODUCTION)
            .objective(UPDATED_OBJECTIVE)
            .objectiveAnnex(UPDATED_OBJECTIVE_ANNEX)
            .objectiveAnnexContentType(UPDATED_OBJECTIVE_ANNEX_CONTENT_TYPE)
            .scope(UPDATED_SCOPE)
            .scopeAnnex(UPDATED_SCOPE_ANNEX)
            .scopeAnnexContentType(UPDATED_SCOPE_ANNEX_CONTENT_TYPE)
            .limitation(UPDATED_LIMITATION)
            .limitationAnnex(UPDATED_LIMITATION_ANNEX)
            .limitationAnnexContentType(UPDATED_LIMITATION_ANNEX_CONTENT_TYPE)
            .methodology(UPDATED_METHODOLOGY)
            .methodologyAnnex(UPDATED_METHODOLOGY_ANNEX)
            .methodologyAnnexContentType(UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE)
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            .findingAndAnalysisAnnex(UPDATED_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE)
            .conclusion(UPDATED_CONCLUSION)
            .conclusionAnnex(UPDATED_CONCLUSION_ANNEX)
            .conclusionAnnexContentType(UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE)
            .recommendation(UPDATED_RECOMMENDATION)
            .recommendationAnnex(UPDATED_RECOMMENDATION_ANNEX)
            .recommendationAnnexContentType(UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE)
            .signature(UPDATED_SIGNATURE)
            .references(UPDATED_REFERENCES)
            .referencesContentType(UPDATED_REFERENCES_CONTENT_TYPE)
            .publicationDate(UPDATED_PUBLICATION_DATE)
            .author(UPDATED_AUTHOR);
        return fraudInvestigationReport;
    }

    @BeforeEach
    public void initTest() {
        fraudInvestigationReportRepository.deleteAll();
        fraudInvestigationReport = createEntity();
    }

    @Test
    void createFraudInvestigationReport() throws Exception {
        int databaseSizeBeforeCreate = fraudInvestigationReportRepository.findAll().size();
        // Create the FraudInvestigationReport
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);
        restFraudInvestigationReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isCreated());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeCreate + 1);
        FraudInvestigationReport testFraudInvestigationReport = fraudInvestigationReportList.get(fraudInvestigationReportList.size() - 1);
        assertThat(testFraudInvestigationReport.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testFraudInvestigationReport.getExecutiveSummary()).isEqualTo(DEFAULT_EXECUTIVE_SUMMARY);
        assertThat(testFraudInvestigationReport.getIntroductionAnnex()).isEqualTo(DEFAULT_INTRODUCTION_ANNEX);
        assertThat(testFraudInvestigationReport.getIntroductionAnnexContentType()).isEqualTo(DEFAULT_INTRODUCTION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getIntroduction()).isEqualTo(DEFAULT_INTRODUCTION);
        assertThat(testFraudInvestigationReport.getObjective()).isEqualTo(DEFAULT_OBJECTIVE);
        assertThat(testFraudInvestigationReport.getObjectiveAnnex()).isEqualTo(DEFAULT_OBJECTIVE_ANNEX);
        assertThat(testFraudInvestigationReport.getObjectiveAnnexContentType()).isEqualTo(DEFAULT_OBJECTIVE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getScope()).isEqualTo(DEFAULT_SCOPE);
        assertThat(testFraudInvestigationReport.getScopeAnnex()).isEqualTo(DEFAULT_SCOPE_ANNEX);
        assertThat(testFraudInvestigationReport.getScopeAnnexContentType()).isEqualTo(DEFAULT_SCOPE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getLimitation()).isEqualTo(DEFAULT_LIMITATION);
        assertThat(testFraudInvestigationReport.getLimitationAnnex()).isEqualTo(DEFAULT_LIMITATION_ANNEX);
        assertThat(testFraudInvestigationReport.getLimitationAnnexContentType()).isEqualTo(DEFAULT_LIMITATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getMethodology()).isEqualTo(DEFAULT_METHODOLOGY);
        assertThat(testFraudInvestigationReport.getMethodologyAnnex()).isEqualTo(DEFAULT_METHODOLOGY_ANNEX);
        assertThat(testFraudInvestigationReport.getMethodologyAnnexContentType()).isEqualTo(DEFAULT_METHODOLOGY_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysis()).isEqualTo(DEFAULT_FINDING_AND_ANALYSIS);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnex()).isEqualTo(DEFAULT_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnexContentType())
            .isEqualTo(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getConclusion()).isEqualTo(DEFAULT_CONCLUSION);
        assertThat(testFraudInvestigationReport.getConclusionAnnex()).isEqualTo(DEFAULT_CONCLUSION_ANNEX);
        assertThat(testFraudInvestigationReport.getConclusionAnnexContentType()).isEqualTo(DEFAULT_CONCLUSION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getRecommendation()).isEqualTo(DEFAULT_RECOMMENDATION);
        assertThat(testFraudInvestigationReport.getRecommendationAnnex()).isEqualTo(DEFAULT_RECOMMENDATION_ANNEX);
        assertThat(testFraudInvestigationReport.getRecommendationAnnexContentType()).isEqualTo(DEFAULT_RECOMMENDATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getSignature()).isEqualTo(DEFAULT_SIGNATURE);
        assertThat(testFraudInvestigationReport.getReferences()).isEqualTo(DEFAULT_REFERENCES);
        assertThat(testFraudInvestigationReport.getReferencesContentType()).isEqualTo(DEFAULT_REFERENCES_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getPublicationDate()).isEqualTo(DEFAULT_PUBLICATION_DATE);
        assertThat(testFraudInvestigationReport.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
    }

    @Test
    void createFraudInvestigationReportWithExistingId() throws Exception {
        // Create the FraudInvestigationReport with an existing ID
        fraudInvestigationReport.setId("existing_id");
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        int databaseSizeBeforeCreate = fraudInvestigationReportRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFraudInvestigationReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = fraudInvestigationReportRepository.findAll().size();
        // set the field null
        fraudInvestigationReport.setTitle(null);

        // Create the FraudInvestigationReport, which fails.
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        restFraudInvestigationReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkIntroductionIsRequired() throws Exception {
        int databaseSizeBeforeTest = fraudInvestigationReportRepository.findAll().size();
        // set the field null
        fraudInvestigationReport.setIntroduction(null);

        // Create the FraudInvestigationReport, which fails.
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        restFraudInvestigationReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkObjectiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = fraudInvestigationReportRepository.findAll().size();
        // set the field null
        fraudInvestigationReport.setObjective(null);

        // Create the FraudInvestigationReport, which fails.
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        restFraudInvestigationReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkMethodologyIsRequired() throws Exception {
        int databaseSizeBeforeTest = fraudInvestigationReportRepository.findAll().size();
        // set the field null
        fraudInvestigationReport.setMethodology(null);

        // Create the FraudInvestigationReport, which fails.
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        restFraudInvestigationReportMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllFraudInvestigationReports() throws Exception {
        // Initialize the database
        fraudInvestigationReportRepository.save(fraudInvestigationReport);

        // Get all the fraudInvestigationReportList
        restFraudInvestigationReportMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fraudInvestigationReport.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].executiveSummary").value(hasItem(DEFAULT_EXECUTIVE_SUMMARY)))
            .andExpect(jsonPath("$.[*].introductionAnnexContentType").value(hasItem(DEFAULT_INTRODUCTION_ANNEX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].introductionAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_INTRODUCTION_ANNEX))))
            .andExpect(jsonPath("$.[*].introduction").value(hasItem(DEFAULT_INTRODUCTION)))
            .andExpect(jsonPath("$.[*].objective").value(hasItem(DEFAULT_OBJECTIVE)))
            .andExpect(jsonPath("$.[*].objectiveAnnexContentType").value(hasItem(DEFAULT_OBJECTIVE_ANNEX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].objectiveAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_OBJECTIVE_ANNEX))))
            .andExpect(jsonPath("$.[*].scope").value(hasItem(DEFAULT_SCOPE)))
            .andExpect(jsonPath("$.[*].scopeAnnexContentType").value(hasItem(DEFAULT_SCOPE_ANNEX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].scopeAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_SCOPE_ANNEX))))
            .andExpect(jsonPath("$.[*].limitation").value(hasItem(DEFAULT_LIMITATION)))
            .andExpect(jsonPath("$.[*].limitationAnnexContentType").value(hasItem(DEFAULT_LIMITATION_ANNEX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].limitationAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_LIMITATION_ANNEX))))
            .andExpect(jsonPath("$.[*].methodology").value(hasItem(DEFAULT_METHODOLOGY)))
            .andExpect(jsonPath("$.[*].methodologyAnnexContentType").value(hasItem(DEFAULT_METHODOLOGY_ANNEX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].methodologyAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_METHODOLOGY_ANNEX))))
            .andExpect(jsonPath("$.[*].findingAndAnalysis").value(hasItem(DEFAULT_FINDING_AND_ANALYSIS)))
            .andExpect(jsonPath("$.[*].findingAndAnalysisAnnexContentType").value(hasItem(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE)))
            .andExpect(
                jsonPath("$.[*].findingAndAnalysisAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_FINDING_AND_ANALYSIS_ANNEX)))
            )
            .andExpect(jsonPath("$.[*].conclusion").value(hasItem(DEFAULT_CONCLUSION)))
            .andExpect(jsonPath("$.[*].conclusionAnnexContentType").value(hasItem(DEFAULT_CONCLUSION_ANNEX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].conclusionAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONCLUSION_ANNEX))))
            .andExpect(jsonPath("$.[*].recommendation").value(hasItem(DEFAULT_RECOMMENDATION)))
            .andExpect(jsonPath("$.[*].recommendationAnnexContentType").value(hasItem(DEFAULT_RECOMMENDATION_ANNEX_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].recommendationAnnex").value(hasItem(Base64Utils.encodeToString(DEFAULT_RECOMMENDATION_ANNEX))))
            .andExpect(jsonPath("$.[*].signature").value(hasItem(DEFAULT_SIGNATURE)))
            .andExpect(jsonPath("$.[*].referencesContentType").value(hasItem(DEFAULT_REFERENCES_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].references").value(hasItem(Base64Utils.encodeToString(DEFAULT_REFERENCES))))
            .andExpect(jsonPath("$.[*].publicationDate").value(hasItem(DEFAULT_PUBLICATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFraudInvestigationReportsWithEagerRelationshipsIsEnabled() throws Exception {
        when(fraudInvestigationReportServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFraudInvestigationReportMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(fraudInvestigationReportServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFraudInvestigationReportsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(fraudInvestigationReportServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFraudInvestigationReportMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(fraudInvestigationReportRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getFraudInvestigationReport() throws Exception {
        // Initialize the database
        fraudInvestigationReportRepository.save(fraudInvestigationReport);

        // Get the fraudInvestigationReport
        restFraudInvestigationReportMockMvc
            .perform(get(ENTITY_API_URL_ID, fraudInvestigationReport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fraudInvestigationReport.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.executiveSummary").value(DEFAULT_EXECUTIVE_SUMMARY))
            .andExpect(jsonPath("$.introductionAnnexContentType").value(DEFAULT_INTRODUCTION_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.introductionAnnex").value(Base64Utils.encodeToString(DEFAULT_INTRODUCTION_ANNEX)))
            .andExpect(jsonPath("$.introduction").value(DEFAULT_INTRODUCTION))
            .andExpect(jsonPath("$.objective").value(DEFAULT_OBJECTIVE))
            .andExpect(jsonPath("$.objectiveAnnexContentType").value(DEFAULT_OBJECTIVE_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.objectiveAnnex").value(Base64Utils.encodeToString(DEFAULT_OBJECTIVE_ANNEX)))
            .andExpect(jsonPath("$.scope").value(DEFAULT_SCOPE))
            .andExpect(jsonPath("$.scopeAnnexContentType").value(DEFAULT_SCOPE_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.scopeAnnex").value(Base64Utils.encodeToString(DEFAULT_SCOPE_ANNEX)))
            .andExpect(jsonPath("$.limitation").value(DEFAULT_LIMITATION))
            .andExpect(jsonPath("$.limitationAnnexContentType").value(DEFAULT_LIMITATION_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.limitationAnnex").value(Base64Utils.encodeToString(DEFAULT_LIMITATION_ANNEX)))
            .andExpect(jsonPath("$.methodology").value(DEFAULT_METHODOLOGY))
            .andExpect(jsonPath("$.methodologyAnnexContentType").value(DEFAULT_METHODOLOGY_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.methodologyAnnex").value(Base64Utils.encodeToString(DEFAULT_METHODOLOGY_ANNEX)))
            .andExpect(jsonPath("$.findingAndAnalysis").value(DEFAULT_FINDING_AND_ANALYSIS))
            .andExpect(jsonPath("$.findingAndAnalysisAnnexContentType").value(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.findingAndAnalysisAnnex").value(Base64Utils.encodeToString(DEFAULT_FINDING_AND_ANALYSIS_ANNEX)))
            .andExpect(jsonPath("$.conclusion").value(DEFAULT_CONCLUSION))
            .andExpect(jsonPath("$.conclusionAnnexContentType").value(DEFAULT_CONCLUSION_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.conclusionAnnex").value(Base64Utils.encodeToString(DEFAULT_CONCLUSION_ANNEX)))
            .andExpect(jsonPath("$.recommendation").value(DEFAULT_RECOMMENDATION))
            .andExpect(jsonPath("$.recommendationAnnexContentType").value(DEFAULT_RECOMMENDATION_ANNEX_CONTENT_TYPE))
            .andExpect(jsonPath("$.recommendationAnnex").value(Base64Utils.encodeToString(DEFAULT_RECOMMENDATION_ANNEX)))
            .andExpect(jsonPath("$.signature").value(DEFAULT_SIGNATURE))
            .andExpect(jsonPath("$.referencesContentType").value(DEFAULT_REFERENCES_CONTENT_TYPE))
            .andExpect(jsonPath("$.references").value(Base64Utils.encodeToString(DEFAULT_REFERENCES)))
            .andExpect(jsonPath("$.publicationDate").value(DEFAULT_PUBLICATION_DATE.toString()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR));
    }

    @Test
    void getNonExistingFraudInvestigationReport() throws Exception {
        // Get the fraudInvestigationReport
        restFraudInvestigationReportMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingFraudInvestigationReport() throws Exception {
        // Initialize the database
        fraudInvestigationReportRepository.save(fraudInvestigationReport);

        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();

        // Update the fraudInvestigationReport
        FraudInvestigationReport updatedFraudInvestigationReport = fraudInvestigationReportRepository
            .findById(fraudInvestigationReport.getId())
            .get();
        updatedFraudInvestigationReport
            .title(UPDATED_TITLE)
            .executiveSummary(UPDATED_EXECUTIVE_SUMMARY)
            .introductionAnnex(UPDATED_INTRODUCTION_ANNEX)
            .introductionAnnexContentType(UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE)
            .introduction(UPDATED_INTRODUCTION)
            .objective(UPDATED_OBJECTIVE)
            .objectiveAnnex(UPDATED_OBJECTIVE_ANNEX)
            .objectiveAnnexContentType(UPDATED_OBJECTIVE_ANNEX_CONTENT_TYPE)
            .scope(UPDATED_SCOPE)
            .scopeAnnex(UPDATED_SCOPE_ANNEX)
            .scopeAnnexContentType(UPDATED_SCOPE_ANNEX_CONTENT_TYPE)
            .limitation(UPDATED_LIMITATION)
            .limitationAnnex(UPDATED_LIMITATION_ANNEX)
            .limitationAnnexContentType(UPDATED_LIMITATION_ANNEX_CONTENT_TYPE)
            .methodology(UPDATED_METHODOLOGY)
            .methodologyAnnex(UPDATED_METHODOLOGY_ANNEX)
            .methodologyAnnexContentType(UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE)
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            .findingAndAnalysisAnnex(UPDATED_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE)
            .conclusion(UPDATED_CONCLUSION)
            .conclusionAnnex(UPDATED_CONCLUSION_ANNEX)
            .conclusionAnnexContentType(UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE)
            .recommendation(UPDATED_RECOMMENDATION)
            .recommendationAnnex(UPDATED_RECOMMENDATION_ANNEX)
            .recommendationAnnexContentType(UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE)
            .signature(UPDATED_SIGNATURE)
            .references(UPDATED_REFERENCES)
            .referencesContentType(UPDATED_REFERENCES_CONTENT_TYPE)
            .publicationDate(UPDATED_PUBLICATION_DATE)
            .author(UPDATED_AUTHOR);
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(updatedFraudInvestigationReport);

        restFraudInvestigationReportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, fraudInvestigationReportDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isOk());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
        FraudInvestigationReport testFraudInvestigationReport = fraudInvestigationReportList.get(fraudInvestigationReportList.size() - 1);
        assertThat(testFraudInvestigationReport.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testFraudInvestigationReport.getExecutiveSummary()).isEqualTo(UPDATED_EXECUTIVE_SUMMARY);
        assertThat(testFraudInvestigationReport.getIntroductionAnnex()).isEqualTo(UPDATED_INTRODUCTION_ANNEX);
        assertThat(testFraudInvestigationReport.getIntroductionAnnexContentType()).isEqualTo(UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getIntroduction()).isEqualTo(UPDATED_INTRODUCTION);
        assertThat(testFraudInvestigationReport.getObjective()).isEqualTo(UPDATED_OBJECTIVE);
        assertThat(testFraudInvestigationReport.getObjectiveAnnex()).isEqualTo(UPDATED_OBJECTIVE_ANNEX);
        assertThat(testFraudInvestigationReport.getObjectiveAnnexContentType()).isEqualTo(UPDATED_OBJECTIVE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getScope()).isEqualTo(UPDATED_SCOPE);
        assertThat(testFraudInvestigationReport.getScopeAnnex()).isEqualTo(UPDATED_SCOPE_ANNEX);
        assertThat(testFraudInvestigationReport.getScopeAnnexContentType()).isEqualTo(UPDATED_SCOPE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getLimitation()).isEqualTo(UPDATED_LIMITATION);
        assertThat(testFraudInvestigationReport.getLimitationAnnex()).isEqualTo(UPDATED_LIMITATION_ANNEX);
        assertThat(testFraudInvestigationReport.getLimitationAnnexContentType()).isEqualTo(UPDATED_LIMITATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getMethodology()).isEqualTo(UPDATED_METHODOLOGY);
        assertThat(testFraudInvestigationReport.getMethodologyAnnex()).isEqualTo(UPDATED_METHODOLOGY_ANNEX);
        assertThat(testFraudInvestigationReport.getMethodologyAnnexContentType()).isEqualTo(UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysis()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnex()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnexContentType())
            .isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getConclusion()).isEqualTo(UPDATED_CONCLUSION);
        assertThat(testFraudInvestigationReport.getConclusionAnnex()).isEqualTo(UPDATED_CONCLUSION_ANNEX);
        assertThat(testFraudInvestigationReport.getConclusionAnnexContentType()).isEqualTo(UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getRecommendation()).isEqualTo(UPDATED_RECOMMENDATION);
        assertThat(testFraudInvestigationReport.getRecommendationAnnex()).isEqualTo(UPDATED_RECOMMENDATION_ANNEX);
        assertThat(testFraudInvestigationReport.getRecommendationAnnexContentType()).isEqualTo(UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getSignature()).isEqualTo(UPDATED_SIGNATURE);
        assertThat(testFraudInvestigationReport.getReferences()).isEqualTo(UPDATED_REFERENCES);
        assertThat(testFraudInvestigationReport.getReferencesContentType()).isEqualTo(UPDATED_REFERENCES_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getPublicationDate()).isEqualTo(UPDATED_PUBLICATION_DATE);
        assertThat(testFraudInvestigationReport.getAuthor()).isEqualTo(UPDATED_AUTHOR);
    }

    @Test
    void putNonExistingFraudInvestigationReport() throws Exception {
        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();
        fraudInvestigationReport.setId(UUID.randomUUID().toString());

        // Create the FraudInvestigationReport
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFraudInvestigationReportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, fraudInvestigationReportDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchFraudInvestigationReport() throws Exception {
        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();
        fraudInvestigationReport.setId(UUID.randomUUID().toString());

        // Create the FraudInvestigationReport
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFraudInvestigationReportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamFraudInvestigationReport() throws Exception {
        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();
        fraudInvestigationReport.setId(UUID.randomUUID().toString());

        // Create the FraudInvestigationReport
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFraudInvestigationReportMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateFraudInvestigationReportWithPatch() throws Exception {
        // Initialize the database
        fraudInvestigationReportRepository.save(fraudInvestigationReport);

        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();

        // Update the fraudInvestigationReport using partial update
        FraudInvestigationReport partialUpdatedFraudInvestigationReport = new FraudInvestigationReport();
        partialUpdatedFraudInvestigationReport.setId(fraudInvestigationReport.getId());

        partialUpdatedFraudInvestigationReport
            .introductionAnnex(UPDATED_INTRODUCTION_ANNEX)
            .introductionAnnexContentType(UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE)
            .scopeAnnex(UPDATED_SCOPE_ANNEX)
            .scopeAnnexContentType(UPDATED_SCOPE_ANNEX_CONTENT_TYPE)
            .limitation(UPDATED_LIMITATION)
            .methodology(UPDATED_METHODOLOGY)
            .methodologyAnnex(UPDATED_METHODOLOGY_ANNEX)
            .methodologyAnnexContentType(UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE)
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            .conclusionAnnex(UPDATED_CONCLUSION_ANNEX)
            .conclusionAnnexContentType(UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE)
            .recommendationAnnex(UPDATED_RECOMMENDATION_ANNEX)
            .recommendationAnnexContentType(UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE)
            .references(UPDATED_REFERENCES)
            .referencesContentType(UPDATED_REFERENCES_CONTENT_TYPE)
            .publicationDate(UPDATED_PUBLICATION_DATE)
            .author(UPDATED_AUTHOR);

        restFraudInvestigationReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFraudInvestigationReport.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFraudInvestigationReport))
            )
            .andExpect(status().isOk());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
        FraudInvestigationReport testFraudInvestigationReport = fraudInvestigationReportList.get(fraudInvestigationReportList.size() - 1);
        assertThat(testFraudInvestigationReport.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testFraudInvestigationReport.getExecutiveSummary()).isEqualTo(DEFAULT_EXECUTIVE_SUMMARY);
        assertThat(testFraudInvestigationReport.getIntroductionAnnex()).isEqualTo(UPDATED_INTRODUCTION_ANNEX);
        assertThat(testFraudInvestigationReport.getIntroductionAnnexContentType()).isEqualTo(UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getIntroduction()).isEqualTo(DEFAULT_INTRODUCTION);
        assertThat(testFraudInvestigationReport.getObjective()).isEqualTo(DEFAULT_OBJECTIVE);
        assertThat(testFraudInvestigationReport.getObjectiveAnnex()).isEqualTo(DEFAULT_OBJECTIVE_ANNEX);
        assertThat(testFraudInvestigationReport.getObjectiveAnnexContentType()).isEqualTo(DEFAULT_OBJECTIVE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getScope()).isEqualTo(DEFAULT_SCOPE);
        assertThat(testFraudInvestigationReport.getScopeAnnex()).isEqualTo(UPDATED_SCOPE_ANNEX);
        assertThat(testFraudInvestigationReport.getScopeAnnexContentType()).isEqualTo(UPDATED_SCOPE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getLimitation()).isEqualTo(UPDATED_LIMITATION);
        assertThat(testFraudInvestigationReport.getLimitationAnnex()).isEqualTo(DEFAULT_LIMITATION_ANNEX);
        assertThat(testFraudInvestigationReport.getLimitationAnnexContentType()).isEqualTo(DEFAULT_LIMITATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getMethodology()).isEqualTo(UPDATED_METHODOLOGY);
        assertThat(testFraudInvestigationReport.getMethodologyAnnex()).isEqualTo(UPDATED_METHODOLOGY_ANNEX);
        assertThat(testFraudInvestigationReport.getMethodologyAnnexContentType()).isEqualTo(UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysis()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnex()).isEqualTo(DEFAULT_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnexContentType())
            .isEqualTo(DEFAULT_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getConclusion()).isEqualTo(DEFAULT_CONCLUSION);
        assertThat(testFraudInvestigationReport.getConclusionAnnex()).isEqualTo(UPDATED_CONCLUSION_ANNEX);
        assertThat(testFraudInvestigationReport.getConclusionAnnexContentType()).isEqualTo(UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getRecommendation()).isEqualTo(DEFAULT_RECOMMENDATION);
        assertThat(testFraudInvestigationReport.getRecommendationAnnex()).isEqualTo(UPDATED_RECOMMENDATION_ANNEX);
        assertThat(testFraudInvestigationReport.getRecommendationAnnexContentType()).isEqualTo(UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getSignature()).isEqualTo(DEFAULT_SIGNATURE);
        assertThat(testFraudInvestigationReport.getReferences()).isEqualTo(UPDATED_REFERENCES);
        assertThat(testFraudInvestigationReport.getReferencesContentType()).isEqualTo(UPDATED_REFERENCES_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getPublicationDate()).isEqualTo(UPDATED_PUBLICATION_DATE);
        assertThat(testFraudInvestigationReport.getAuthor()).isEqualTo(UPDATED_AUTHOR);
    }

    @Test
    void fullUpdateFraudInvestigationReportWithPatch() throws Exception {
        // Initialize the database
        fraudInvestigationReportRepository.save(fraudInvestigationReport);

        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();

        // Update the fraudInvestigationReport using partial update
        FraudInvestigationReport partialUpdatedFraudInvestigationReport = new FraudInvestigationReport();
        partialUpdatedFraudInvestigationReport.setId(fraudInvestigationReport.getId());

        partialUpdatedFraudInvestigationReport
            .title(UPDATED_TITLE)
            .executiveSummary(UPDATED_EXECUTIVE_SUMMARY)
            .introductionAnnex(UPDATED_INTRODUCTION_ANNEX)
            .introductionAnnexContentType(UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE)
            .introduction(UPDATED_INTRODUCTION)
            .objective(UPDATED_OBJECTIVE)
            .objectiveAnnex(UPDATED_OBJECTIVE_ANNEX)
            .objectiveAnnexContentType(UPDATED_OBJECTIVE_ANNEX_CONTENT_TYPE)
            .scope(UPDATED_SCOPE)
            .scopeAnnex(UPDATED_SCOPE_ANNEX)
            .scopeAnnexContentType(UPDATED_SCOPE_ANNEX_CONTENT_TYPE)
            .limitation(UPDATED_LIMITATION)
            .limitationAnnex(UPDATED_LIMITATION_ANNEX)
            .limitationAnnexContentType(UPDATED_LIMITATION_ANNEX_CONTENT_TYPE)
            .methodology(UPDATED_METHODOLOGY)
            .methodologyAnnex(UPDATED_METHODOLOGY_ANNEX)
            .methodologyAnnexContentType(UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE)
            .findingAndAnalysis(UPDATED_FINDING_AND_ANALYSIS)
            .findingAndAnalysisAnnex(UPDATED_FINDING_AND_ANALYSIS_ANNEX)
            .findingAndAnalysisAnnexContentType(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE)
            .conclusion(UPDATED_CONCLUSION)
            .conclusionAnnex(UPDATED_CONCLUSION_ANNEX)
            .conclusionAnnexContentType(UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE)
            .recommendation(UPDATED_RECOMMENDATION)
            .recommendationAnnex(UPDATED_RECOMMENDATION_ANNEX)
            .recommendationAnnexContentType(UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE)
            .signature(UPDATED_SIGNATURE)
            .references(UPDATED_REFERENCES)
            .referencesContentType(UPDATED_REFERENCES_CONTENT_TYPE)
            .publicationDate(UPDATED_PUBLICATION_DATE)
            .author(UPDATED_AUTHOR);

        restFraudInvestigationReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFraudInvestigationReport.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFraudInvestigationReport))
            )
            .andExpect(status().isOk());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
        FraudInvestigationReport testFraudInvestigationReport = fraudInvestigationReportList.get(fraudInvestigationReportList.size() - 1);
        assertThat(testFraudInvestigationReport.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testFraudInvestigationReport.getExecutiveSummary()).isEqualTo(UPDATED_EXECUTIVE_SUMMARY);
        assertThat(testFraudInvestigationReport.getIntroductionAnnex()).isEqualTo(UPDATED_INTRODUCTION_ANNEX);
        assertThat(testFraudInvestigationReport.getIntroductionAnnexContentType()).isEqualTo(UPDATED_INTRODUCTION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getIntroduction()).isEqualTo(UPDATED_INTRODUCTION);
        assertThat(testFraudInvestigationReport.getObjective()).isEqualTo(UPDATED_OBJECTIVE);
        assertThat(testFraudInvestigationReport.getObjectiveAnnex()).isEqualTo(UPDATED_OBJECTIVE_ANNEX);
        assertThat(testFraudInvestigationReport.getObjectiveAnnexContentType()).isEqualTo(UPDATED_OBJECTIVE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getScope()).isEqualTo(UPDATED_SCOPE);
        assertThat(testFraudInvestigationReport.getScopeAnnex()).isEqualTo(UPDATED_SCOPE_ANNEX);
        assertThat(testFraudInvestigationReport.getScopeAnnexContentType()).isEqualTo(UPDATED_SCOPE_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getLimitation()).isEqualTo(UPDATED_LIMITATION);
        assertThat(testFraudInvestigationReport.getLimitationAnnex()).isEqualTo(UPDATED_LIMITATION_ANNEX);
        assertThat(testFraudInvestigationReport.getLimitationAnnexContentType()).isEqualTo(UPDATED_LIMITATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getMethodology()).isEqualTo(UPDATED_METHODOLOGY);
        assertThat(testFraudInvestigationReport.getMethodologyAnnex()).isEqualTo(UPDATED_METHODOLOGY_ANNEX);
        assertThat(testFraudInvestigationReport.getMethodologyAnnexContentType()).isEqualTo(UPDATED_METHODOLOGY_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysis()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnex()).isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX);
        assertThat(testFraudInvestigationReport.getFindingAndAnalysisAnnexContentType())
            .isEqualTo(UPDATED_FINDING_AND_ANALYSIS_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getConclusion()).isEqualTo(UPDATED_CONCLUSION);
        assertThat(testFraudInvestigationReport.getConclusionAnnex()).isEqualTo(UPDATED_CONCLUSION_ANNEX);
        assertThat(testFraudInvestigationReport.getConclusionAnnexContentType()).isEqualTo(UPDATED_CONCLUSION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getRecommendation()).isEqualTo(UPDATED_RECOMMENDATION);
        assertThat(testFraudInvestigationReport.getRecommendationAnnex()).isEqualTo(UPDATED_RECOMMENDATION_ANNEX);
        assertThat(testFraudInvestigationReport.getRecommendationAnnexContentType()).isEqualTo(UPDATED_RECOMMENDATION_ANNEX_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getSignature()).isEqualTo(UPDATED_SIGNATURE);
        assertThat(testFraudInvestigationReport.getReferences()).isEqualTo(UPDATED_REFERENCES);
        assertThat(testFraudInvestigationReport.getReferencesContentType()).isEqualTo(UPDATED_REFERENCES_CONTENT_TYPE);
        assertThat(testFraudInvestigationReport.getPublicationDate()).isEqualTo(UPDATED_PUBLICATION_DATE);
        assertThat(testFraudInvestigationReport.getAuthor()).isEqualTo(UPDATED_AUTHOR);
    }

    @Test
    void patchNonExistingFraudInvestigationReport() throws Exception {
        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();
        fraudInvestigationReport.setId(UUID.randomUUID().toString());

        // Create the FraudInvestigationReport
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFraudInvestigationReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, fraudInvestigationReportDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchFraudInvestigationReport() throws Exception {
        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();
        fraudInvestigationReport.setId(UUID.randomUUID().toString());

        // Create the FraudInvestigationReport
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFraudInvestigationReportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamFraudInvestigationReport() throws Exception {
        int databaseSizeBeforeUpdate = fraudInvestigationReportRepository.findAll().size();
        fraudInvestigationReport.setId(UUID.randomUUID().toString());

        // Create the FraudInvestigationReport
        FraudInvestigationReportDTO fraudInvestigationReportDTO = fraudInvestigationReportMapper.toDto(fraudInvestigationReport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFraudInvestigationReportMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fraudInvestigationReportDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the FraudInvestigationReport in the database
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteFraudInvestigationReport() throws Exception {
        // Initialize the database
        fraudInvestigationReportRepository.save(fraudInvestigationReport);

        int databaseSizeBeforeDelete = fraudInvestigationReportRepository.findAll().size();

        // Delete the fraudInvestigationReport
        restFraudInvestigationReportMockMvc
            .perform(delete(ENTITY_API_URL_ID, fraudInvestigationReport.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FraudInvestigationReport> fraudInvestigationReportList = fraudInvestigationReportRepository.findAll();
        assertThat(fraudInvestigationReportList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
