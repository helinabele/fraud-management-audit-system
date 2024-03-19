package org.audit.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.audit.app.repository.SubCityRepository;
import org.audit.app.service.SubCityService;
import org.audit.app.service.dto.SubCityDTO;
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
 * REST controller for managing {@link org.audit.app.domain.SubCity}.
 */
@RestController
@RequestMapping("/api")
public class SubCityResource {

    private final Logger log = LoggerFactory.getLogger(SubCityResource.class);

    private static final String ENTITY_NAME = "subCity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubCityService subCityService;

    private final SubCityRepository subCityRepository;

    public SubCityResource(SubCityService subCityService, SubCityRepository subCityRepository) {
        this.subCityService = subCityService;
        this.subCityRepository = subCityRepository;
    }

    /**
     * {@code POST  /sub-cities} : Create a new subCity.
     *
     * @param subCityDTO the subCityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subCityDTO, or with status {@code 400 (Bad Request)} if the subCity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sub-cities")
    public ResponseEntity<SubCityDTO> createSubCity(@Valid @RequestBody SubCityDTO subCityDTO) throws URISyntaxException {
        log.debug("REST request to save SubCity : {}", subCityDTO);
        if (subCityDTO.getId() != null) {
            throw new BadRequestAlertException("A new subCity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubCityDTO result = subCityService.save(subCityDTO);
        return ResponseEntity
            .created(new URI("/api/sub-cities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /sub-cities/:id} : Updates an existing subCity.
     *
     * @param id the id of the subCityDTO to save.
     * @param subCityDTO the subCityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subCityDTO,
     * or with status {@code 400 (Bad Request)} if the subCityDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subCityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sub-cities/{id}")
    public ResponseEntity<SubCityDTO> updateSubCity(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody SubCityDTO subCityDTO
    ) throws URISyntaxException {
        log.debug("REST request to update SubCity : {}, {}", id, subCityDTO);
        if (subCityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subCityDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subCityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SubCityDTO result = subCityService.update(subCityDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subCityDTO.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /sub-cities/:id} : Partial updates given fields of an existing subCity, field will ignore if it is null
     *
     * @param id the id of the subCityDTO to save.
     * @param subCityDTO the subCityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subCityDTO,
     * or with status {@code 400 (Bad Request)} if the subCityDTO is not valid,
     * or with status {@code 404 (Not Found)} if the subCityDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the subCityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/sub-cities/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SubCityDTO> partialUpdateSubCity(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody SubCityDTO subCityDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update SubCity partially : {}, {}", id, subCityDTO);
        if (subCityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subCityDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subCityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SubCityDTO> result = subCityService.partialUpdate(subCityDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subCityDTO.getId())
        );
    }

    /**
     * {@code GET  /sub-cities} : get all the subCities.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subCities in body.
     */
    @GetMapping("/sub-cities")
    public ResponseEntity<List<SubCityDTO>> getAllSubCities(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of SubCities");
        Page<SubCityDTO> page;
        if (eagerload) {
            page = subCityService.findAllWithEagerRelationships(pageable);
        } else {
            page = subCityService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sub-cities/:id} : get the "id" subCity.
     *
     * @param id the id of the subCityDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subCityDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sub-cities/{id}")
    public ResponseEntity<SubCityDTO> getSubCity(@PathVariable String id) {
        log.debug("REST request to get SubCity : {}", id);
        Optional<SubCityDTO> subCityDTO = subCityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subCityDTO);
    }

    /**
     * {@code DELETE  /sub-cities/:id} : delete the "id" subCity.
     *
     * @param id the id of the subCityDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sub-cities/{id}")
    public ResponseEntity<Void> deleteSubCity(@PathVariable String id) {
        log.debug("REST request to delete SubCity : {}", id);
        subCityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
