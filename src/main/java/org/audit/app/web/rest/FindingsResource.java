package org.audit.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.audit.app.repository.FindingsRepository;
import org.audit.app.service.FindingsService;
import org.audit.app.service.dto.FindingsDTO;
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
 * REST controller for managing {@link org.audit.app.domain.Findings}.
 */
@RestController
@RequestMapping("/api")
public class FindingsResource {

    private final Logger log = LoggerFactory.getLogger(FindingsResource.class);

    private static final String ENTITY_NAME = "findings";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FindingsService findingsService;

    private final FindingsRepository findingsRepository;

    public FindingsResource(FindingsService findingsService, FindingsRepository findingsRepository) {
        this.findingsService = findingsService;
        this.findingsRepository = findingsRepository;
    }

    /**
     * {@code POST  /findings} : Create a new findings.
     *
     * @param findingsDTO the findingsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new findingsDTO, or with status {@code 400 (Bad Request)} if the findings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/findings")
    public ResponseEntity<FindingsDTO> createFindings(@RequestBody FindingsDTO findingsDTO) throws URISyntaxException {
        log.debug("REST request to save Findings : {}", findingsDTO);
        if (findingsDTO.getId() != null) {
            throw new BadRequestAlertException("A new findings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FindingsDTO result = findingsService.save(findingsDTO);
        return ResponseEntity
            .created(new URI("/api/findings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /findings/:id} : Updates an existing findings.
     *
     * @param id the id of the findingsDTO to save.
     * @param findingsDTO the findingsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated findingsDTO,
     * or with status {@code 400 (Bad Request)} if the findingsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the findingsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/findings/{id}")
    public ResponseEntity<FindingsDTO> updateFindings(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody FindingsDTO findingsDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Findings : {}, {}", id, findingsDTO);
        if (findingsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, findingsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!findingsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FindingsDTO result = findingsService.update(findingsDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, findingsDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /findings/:id} : Partial updates given fields of an existing findings, field will ignore if it is null
     *
     * @param id the id of the findingsDTO to save.
     * @param findingsDTO the findingsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated findingsDTO,
     * or with status {@code 400 (Bad Request)} if the findingsDTO is not valid,
     * or with status {@code 404 (Not Found)} if the findingsDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the findingsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/findings/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FindingsDTO> partialUpdateFindings(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody FindingsDTO findingsDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Findings partially : {}, {}", id, findingsDTO);
        if (findingsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, findingsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!findingsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FindingsDTO> result = findingsService.partialUpdate(findingsDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, findingsDTO.getId())
        );
    }

    /**
     * {@code GET  /findings} : get all the findings.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of findings in body.
     */
    @GetMapping("/findings")
    public ResponseEntity<List<FindingsDTO>> getAllFindings(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Findings");
        Page<FindingsDTO> page = findingsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /findings/:id} : get the "id" findings.
     *
     * @param id the id of the findingsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the findingsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/findings/{id}")
    public ResponseEntity<FindingsDTO> getFindings(@PathVariable String id) {
        log.debug("REST request to get Findings : {}", id);
        Optional<FindingsDTO> findingsDTO = findingsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(findingsDTO);
    }

    /**
     * {@code DELETE  /findings/:id} : delete the "id" findings.
     *
     * @param id the id of the findingsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/findings/{id}")
    public ResponseEntity<Void> deleteFindings(@PathVariable String id) {
        log.debug("REST request to delete Findings : {}", id);
        findingsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

   /*  @PostMapping("/findings/{id}/attachments")
    public ResponseEntity<FindingsDTO> addAttachment(@PathVariable String id, @RequestBody byte[] attachment) {
        FindingsDTO result = findingsService.addAttachment(id, attachment);
        return ResponseEntity.ok().body(result);
    } */
    
}
