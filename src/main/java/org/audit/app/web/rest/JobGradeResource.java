package org.audit.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.audit.app.repository.JobGradeRepository;
import org.audit.app.service.JobGradeService;
import org.audit.app.service.dto.JobGradeDTO;
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
 * REST controller for managing {@link org.audit.app.domain.JobGrade}.
 */
@RestController
@RequestMapping("/api")
public class JobGradeResource {

    private final Logger log = LoggerFactory.getLogger(JobGradeResource.class);

    private static final String ENTITY_NAME = "jobGrade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JobGradeService jobGradeService;

    private final JobGradeRepository jobGradeRepository;

    public JobGradeResource(JobGradeService jobGradeService, JobGradeRepository jobGradeRepository) {
        this.jobGradeService = jobGradeService;
        this.jobGradeRepository = jobGradeRepository;
    }

    /**
     * {@code POST  /job-grades} : Create a new jobGrade.
     *
     * @param jobGradeDTO the jobGradeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new jobGradeDTO, or with status {@code 400 (Bad Request)} if the jobGrade has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/job-grades")
    public ResponseEntity<JobGradeDTO> createJobGrade(@Valid @RequestBody JobGradeDTO jobGradeDTO) throws URISyntaxException {
        log.debug("REST request to save JobGrade : {}", jobGradeDTO);
        if (jobGradeDTO.getId() != null) {
            throw new BadRequestAlertException("A new jobGrade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobGradeDTO result = jobGradeService.save(jobGradeDTO);
        return ResponseEntity
            .created(new URI("/api/job-grades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /job-grades/:id} : Updates an existing jobGrade.
     *
     * @param id the id of the jobGradeDTO to save.
     * @param jobGradeDTO the jobGradeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jobGradeDTO,
     * or with status {@code 400 (Bad Request)} if the jobGradeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the jobGradeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/job-grades/{id}")
    public ResponseEntity<JobGradeDTO> updateJobGrade(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody JobGradeDTO jobGradeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update JobGrade : {}, {}", id, jobGradeDTO);
        if (jobGradeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, jobGradeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!jobGradeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        JobGradeDTO result = jobGradeService.update(jobGradeDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jobGradeDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /job-grades/:id} : Partial updates given fields of an existing jobGrade, field will ignore if it is null
     *
     * @param id the id of the jobGradeDTO to save.
     * @param jobGradeDTO the jobGradeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jobGradeDTO,
     * or with status {@code 400 (Bad Request)} if the jobGradeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the jobGradeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the jobGradeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/job-grades/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<JobGradeDTO> partialUpdateJobGrade(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody JobGradeDTO jobGradeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update JobGrade partially : {}, {}", id, jobGradeDTO);
        if (jobGradeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, jobGradeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!jobGradeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<JobGradeDTO> result = jobGradeService.partialUpdate(jobGradeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jobGradeDTO.getId())
        );
    }

    /**
     * {@code GET  /job-grades} : get all the jobGrades.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jobGrades in body.
     */
    @GetMapping("/job-grades")
    public ResponseEntity<List<JobGradeDTO>> getAllJobGrades(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of JobGrades");
        Page<JobGradeDTO> page = jobGradeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /job-grades/:id} : get the "id" jobGrade.
     *
     * @param id the id of the jobGradeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the jobGradeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/job-grades/{id}")
    public ResponseEntity<JobGradeDTO> getJobGrade(@PathVariable String id) {
        log.debug("REST request to get JobGrade : {}", id);
        Optional<JobGradeDTO> jobGradeDTO = jobGradeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(jobGradeDTO);
    }

    /**
     * {@code DELETE  /job-grades/:id} : delete the "id" jobGrade.
     *
     * @param id the id of the jobGradeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/job-grades/{id}")
    public ResponseEntity<Void> deleteJobGrade(@PathVariable String id) {
        log.debug("REST request to delete JobGrade : {}", id);
        jobGradeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
