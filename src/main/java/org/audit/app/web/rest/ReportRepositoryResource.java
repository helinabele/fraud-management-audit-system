package org.audit.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.audit.app.repository.ReportRepositoryRepository;
import org.audit.app.service.ReportRepositoryService;
import org.audit.app.service.dto.ReportRepositoryDTO;
import org.audit.app.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
/**
 * REST controller for managing {@link org.audit.app.domain.ReportRepository}.
 */
@RestController
@RequestMapping("/api")
public class ReportRepositoryResource {
    private final Logger log = LoggerFactory.getLogger(ReportRepositoryResource.class);

    private static final String ENTITY_NAME = "reportRepository";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReportRepositoryService reportRepositoryService;

    private final ReportRepositoryRepository reportRepositoryRepository;


    public ReportRepositoryResource(ReportRepositoryService reportRepositoryService, ReportRepositoryRepository reportRepositoryRepository) {
        this.reportRepositoryService = reportRepositoryService;
        this.reportRepositoryRepository = reportRepositoryRepository;
    }


    /**
     * {@code POST /report-repository} : create a new reportRepository.
     *
     * @param reportRepositoryDTO the reportRepositoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (created)} and
     *         with the body of the new reportRepositoryDTO, or with status
     *         {@code 400 (Bad Request)} if the reportRepository has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/report-repository")
    public ResponseEntity<ReportRepositoryDTO> createReportRepository(
            @RequestBody ReportRepositoryDTO reportRepositoryDTO) throws URISyntaxException {
        log.debug("REST request to save Report Repository : {}", reportRepositoryDTO);
        if (reportRepositoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new reportRepository cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        ReportRepositoryDTO result = reportRepositoryService.save(reportRepositoryDTO);
        return ResponseEntity
                .created(new URI("/api/report-repository" + result.getId()))
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, result.getId()))
                .body(result);
    }


    /**
     * {@code PUT /report-repository/:id} : Updates an existing reportRepository.
     *
     * @param id                  the id of the reportRepositoryDTO to save.
     * @param reportRepositoryDTO the reportRepositoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated reportRepositoryDTO,
     *         or with status {@code 400 (Bad Request)} if the reportRepositoryDTO
     *         is not valid,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         reportRepositoryDTO couldn't be updated)
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/report-repository/{id}")
    public ResponseEntity<ReportRepositoryDTO> updateReportRepository(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody ReportRepositoryDTO reportRepositoryDTO) throws URISyntaxException {
        log.debug("REST request to update Report Repository : {}, {}", id, reportRepositoryDTO);
        ;
        if (reportRepositoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idNull");
        }
        if (!Objects.equals(id, reportRepositoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }
        if (!reportRepositoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ReportRepositoryDTO result = reportRepositoryService.update(reportRepositoryDTO);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
                        reportRepositoryDTO.getId()))
                .body(result);
    }

    /**
     * {@code PATCH /report-repository/:id} : Partial updates given fields of an
     * existing reportRepository, field will be ignore if it is null
     *
     * @param id                  the id of the reportRepositoryDTO to save.
     * @param reportRepositoryDTO the reportRepositoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated reportRepositoryDTO,
     *         or with status {@code 400 (Bad Request)} if the reportRepositoryDTO
     *         is not valid,
     *         or with status {@code 404 (Not Found)} if the reportRepositoryDTO is
     *         not found,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         reportRepositoryDTO couldn't be updated.
     * @throws URISyntaxException if the location URI syntax is incorrect.
     */
    @PatchMapping(value = "/report-repository/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ReportRepositoryDTO> partialUpdateReportRepository(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody ReportRepositoryDTO reportRepositoryDTO) throws URISyntaxException {
        log.debug("REST request to partial update Report Repository partially : {}, {}", id, reportRepositoryDTO);
        if (reportRepositoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reportRepositoryDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }
        if (!reportRepositoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ReportRepositoryDTO> result = reportRepositoryService.partialUpdate(reportRepositoryDTO);
        return ResponseUtil.wrapOrNotFound(
                result,
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reportRepositoryDTO.getId()));
    }

    /**
     * {@code GET /report-repository} get all reportRepositories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status
     *         {@code 200 (OK) and the list of reportRepository in body.
     */
    @GetMapping("/report-repository")
    public ResponseEntity<List<ReportRepositoryDTO>> getAllReportRepository(
            @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of reportRepository");
        Page<ReportRepositoryDTO> page = reportRepositoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET /report-repository/:id} : get the "id" reportRepository.
     *
     * @param id the id of the reportRepositoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status
     *         {@code 200 (OK) and with bosy the reportRepositoryDTO, or with staus
     *         {@code 404 (Not Found)}.
     */
    @GetMapping("/report-repository/{id}")
    public ResponseEntity<ReportRepositoryDTO> getReportRepository(@PathVariable String id) {
        log.debug("REST request to get Report Repository : {}", id);
        Optional<ReportRepositoryDTO> reportRepositoryDTO = reportRepositoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reportRepositoryDTO);
    }

    /**
     * {@code DELETE /report-repository/:id} : delete the "id" reportRepository.
     *
     * @param id the id of the reportRepositoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/report-repository/{id}")
    public ResponseEntity<Void> deleteReportRepository(@PathVariable String id) {
        log.debug("REST request to delete ReportRepository : {}", id);
        reportRepositoryService.delete(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
