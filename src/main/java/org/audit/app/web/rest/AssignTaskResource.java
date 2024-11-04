package org.audit.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.validation.Valid;

import org.audit.app.repository.AssignTaskRepository;
import org.audit.app.service.AssignTaskService;
import org.audit.app.service.dto.AssignTaskDTO;
import org.audit.app.service.NotificationService;
import org.audit.app.service.dto.WhistleBlowerReportDTO;
import org.audit.app.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.audit.app.domain.AssignTask}.
 */
@RestController
@RequestMapping("/api")
public class AssignTaskResource {

    private final Logger log = LoggerFactory.getLogger(AssignTaskResource.class);

    private static final String ENTITY_NAME = "assignTask";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssignTaskService assignTaskService;

    private final AssignTaskRepository assignTaskRepository;

    private final NotificationService notificationService;

    public AssignTaskResource(AssignTaskService assignTaskService, AssignTaskRepository assignTaskRepository,
            NotificationService notificationService) {
        this.assignTaskService = assignTaskService;
        this.assignTaskRepository = assignTaskRepository;
        this.notificationService = notificationService;
    }

    /**
     * {@code POST  /assign-tasks} : Create a new assignTask.
     *
     * @param assignTaskDTO the assignTaskDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new assignTaskDTO, or with status {@code 400 (Bad Request)}
     *         if the assignTask has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/assign-tasks")
    public ResponseEntity<AssignTaskDTO> createAssignTask(@Valid @RequestBody AssignTaskDTO assignTaskDTO)
            throws URISyntaxException {
        log.debug("REST request to save AssignTask : {}", assignTaskDTO);
        if (assignTaskDTO.getId() != null) {
            throw new BadRequestAlertException("A new assignTask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssignTaskDTO result = assignTaskService.save(assignTaskDTO);
       // notificationService.sendTaskAssignmentNotification(assignTaskDTO);
        return ResponseEntity
                .created(new URI("/api/assign-tasks/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                .body(result);
   }

/*  @PutMapping("/assign-tasks/{id}/assign")
public ResponseEntity<AssignTaskDTO> assignTask(
    @PathVariable String id,  // assignTask ID
    @PathVariable String whistleBlowerReportId,  // whistleBlowerReport ID
    @Valid @RequestBody AssignTaskDTO assignTaskDTO) {

    log.debug("REST request to assign AssignTask : {}, with WhistleBlowerReport ID: {}", id, whistleBlowerReportId);

    // Fetch the assign task by ID (ensure the assign task exists)
    Optional<AssignTaskDTO> existingTaskOpt = assignTaskService.findOne(id);
    if (!existingTaskOpt.isPresent()) {
        return ResponseEntity.notFound().build(); // Return 404 if assignTask not found
    }

    // Fetch the whistleblower report by ID
    Optional<WhistleBlowerReportDTO> whistleBlowerReportOpt = whistleBlowerReportService.findOne(whistleBlowerReportId);
    if (!whistleBlowerReportOpt.isPresent()) {
        return ResponseEntity.notFound().build(); // Return 404 if whistleBlowerReport not found
    }

    // Update the assign task details from the request
    AssignTaskDTO existingTask = existingTaskOpt.get();
    existingTask.setTaskAssignmentDate(assignTaskDTO.getTaskAssignmentDate());
    existingTask.setTaskStartDate(assignTaskDTO.getTaskStartDate());
    existingTask.setTaskEndDate(assignTaskDTO.getTaskEndDate());
    existingTask.setDescription(assignTaskDTO.getDescription());
    existingTask.setAttachment(assignTaskDTO.getAttachment());
    existingTask.setAttachmentContentType(assignTaskDTO.getAttachmentContentType());

    // Set the whistleblower report
    existingTask.setWhistleBlowerReport(whistleBlowerReportOpt.get());

    // Assign the task through the service logic
    AssignTaskDTO result = assignTaskService.assign(existingTask);

    return ResponseEntity.ok(result);
}
 */



/*    @PutMapping("/assign-tasks/{id}")
public ResponseEntity<AssignTaskDTO> updateAssignTask(
    @PathVariable(value = "id", required = false) final String id,
    @PathVariable(value = "whistleBlowerReportId", required = false) final String whistleBlowerReportId,
    @RequestBody AssignTaskDTO assignTaskDTO) throws URISyntaxException {

    log.debug("REST request to update AssignTask : {}, {}", id, assignTaskDTO);

    if (assignTaskDTO.getId() == null) {
        throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, assignTaskDTO.getId())) {
        throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }
    if (!assignTaskRepository.existsById(id)) {
        throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    // Optionally use whistleBlowerReportId for further logic

    AssignTaskDTO result = assignTaskService.update(assignTaskDTO);
    return ResponseEntity
        .ok()
        .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignTaskDTO.getId()))
        .body(result);
} */


 /**
     * {@code PUT  /assign-tasks/:id} : Updates an existing assignTask.
     *
     * @param id            the id of the assignTaskDTO to save.
     * @param assignTaskDTO the assignTaskDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated assignTaskDTO,
     *         or with status {@code 400 (Bad Request)} if the assignTaskDTO is not
     *         valid,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         assignTaskDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/assign-tasks/{id}")
    public ResponseEntity<AssignTaskDTO> updateAssignTask(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody AssignTaskDTO assignTaskDTO) throws URISyntaxException {
        log.debug("REST request to update AssignTask : {}, {}", id, assignTaskDTO);
        if (assignTaskDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignTaskDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignTaskRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AssignTaskDTO result = assignTaskService.update(assignTaskDTO);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignTaskDTO.getId()))
                .body(result);
    }

    /**
     * {@code PATCH  /assign-tasks/:id} : Partial updates given fields of an
     * existing assignTask, field will ignore if it is null
     *
     * @param id            the id of the assignTaskDTO to save.
     * @param assignTaskDTO the assignTaskDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated assignTaskDTO,
     *         or with status {@code 400 (Bad Request)} if the assignTaskDTO is not
     *         valid,
     *         or with status {@code 404 (Not Found)} if the assignTaskDTO is not
     *         found,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         assignTaskDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/assign-tasks/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AssignTaskDTO> partialUpdateAssignTask(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody AssignTaskDTO assignTaskDTO) throws URISyntaxException {
        log.debug("REST request to partial update AssignTask partially : {}, {}", id, assignTaskDTO);
        if (assignTaskDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignTaskDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignTaskRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AssignTaskDTO> result = assignTaskService.partialUpdate(assignTaskDTO);

        return ResponseUtil.wrapOrNotFound(
                result,
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignTaskDTO.getId()));
    }

    /**
     * {@code GET  /assign-tasks} : get all the assignTasks.
     *
     * @param pageable  the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of assignTasks in body.
     */
    @GetMapping("/assign-tasks")
    public ResponseEntity<List<AssignTaskDTO>> getAllAssignTasks(
            @org.springdoc.api.annotations.ParameterObject Pageable pageable,
            @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of AssignTasks");
        Page<AssignTaskDTO> page;
        if (eagerload) {
            page = assignTaskService.findAllWithEagerRelationships(pageable);
        } else {
            page = assignTaskService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /assign-tasks/:id} : get the "id" assignTask.
     *
     * @param id the id of the assignTaskDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the assignTaskDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/assign-tasks/{id}")
    public ResponseEntity<AssignTaskDTO> getAssignTask(@PathVariable String id) {
        log.debug("REST request to get AssignTask : {}", id);
        Optional<AssignTaskDTO> assignTaskDTO = assignTaskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(assignTaskDTO);
    }

    /**
     * {@code DELETE  /assign-tasks/:id} : delete the "id" assignTask.
     *
     * @param id the id of the assignTaskDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/assign-tasks/{id}")
    public ResponseEntity<Void> deleteAssignTask(@PathVariable String id) {
        log.debug("REST request to delete AssignTask : {}", id);
        assignTaskService.delete(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
