package org.audit.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.audit.app.repository.SignatureRepository;
import org.audit.app.service.SignatureService;
import org.audit.app.service.dto.SignatureDTO;
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
 * REST controller for managing {@link org.audit.app.domain.Signature}.
 */
@RestController
@RequestMapping("/api")
public class SignatureResource {
    private final Logger log = LoggerFactory.getLogger(SignatureResource.class);

    private static final String ENTITY_NAME = "signature";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SignatureService signatureService;

    private final SignatureRepository signatureRepository;


    public SignatureResource(SignatureService signatureService, SignatureRepository signatureRepository) {
        this.signatureService = signatureService;
        this.signatureRepository = signatureRepository;
    }


    /**
     * {@code POST /signature} : create a new signature.
     *
     * @param signatureDTO the signatureDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (created)} and
     *         with the body of the new signatureDTO, or with status
     *         {@code 400 (Bad Request)} if the signature has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/signature")
    public ResponseEntity<SignatureDTO> createSignature(
            @RequestBody SignatureDTO signatureDTO) throws URISyntaxException {
        log.debug("REST request to save Signature : {}", signatureDTO);
        if (signatureDTO.getId() != null) {
            throw new BadRequestAlertException("A new signature cannot already have an ID", ENTITY_NAME,
                    "idexists");
        }
        SignatureDTO result = signatureService.save(signatureDTO);
        return ResponseEntity
                .created(new URI("/api/signature" + result.getId()))
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, result.getId()))
                .body(result);
    }


    /**
     * {@code PUT /signature/:id} : Updates an existing signature.
     *
     * @param id                  the id of the signatureDTO to save.
     * @param signatureDTO the signatureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated signatureDTO,
     *         or with status {@code 400 (Bad Request)} if the signatureDTO
     *         is not valid,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         signatureDTO couldn't be updated)
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/signature/{id}")
    public ResponseEntity<SignatureDTO> updateSignature(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody SignatureDTO signatureDTO) throws URISyntaxException {
        log.debug("REST request to update Signature : {}, {}", id, signatureDTO);
        ;
        if (signatureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idNull");
        }
        if (!Objects.equals(id, signatureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }
        if (!signatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SignatureDTO result = signatureService.update(signatureDTO);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
                        signatureDTO.getId()))
                .body(result);
    }

    /**
     * {@code PATCH /signature/:id} : Partial updates given fields of an
     * existing signature, field will be ignore if it is null
     *
     * @param id                  the id of the signatureDTO to save.
     * @param signatureDTO the signatureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated signatureDTO,
     *         or with status {@code 400 (Bad Request)} if the signatureDTO
     *         is not valid,
     *         or with status {@code 404 (Not Found)} if the signatureDTO is
     *         not found,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         signatureDTO couldn't be updated.
     * @throws URISyntaxException if the location URI syntax is incorrect.
     */
    @PatchMapping(value = "/signature/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SignatureDTO> partialUpdateSignature(
            @PathVariable(value = "id", required = false) final String id,
            @RequestBody SignatureDTO signatureDTO) throws URISyntaxException {
        log.debug("REST request to partial update Signature partially : {}, {}", id, signatureDTO);
        if (signatureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, signatureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }
        if (!signatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SignatureDTO> result = signatureService.partialUpdate(signatureDTO);
        return ResponseUtil.wrapOrNotFound(
                result,
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, signatureDTO.getId()));
    }

    /**
     * {@code GET /signature} get all signatures.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status
     *         {@code 200 (OK) and the list of signature in body.
     */
    @GetMapping("/signature")
    public ResponseEntity<List<SignatureDTO>> getAllSignature(
            @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of signature");
        Page<SignatureDTO> page = signatureService.findAll(pageable);
        HttpHeaders headers = PaginationUtil
                .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET /signature/:id} : get the "id" signature.
     *
     * @param id the id of the signatureDTO to retrieve.
     * @return the {@link ResponseEntity} with status
     *         {@code 200 (OK) and with bosy the signatureDTO, or with staus
     *         {@code 404 (Not Found)}.
     */
    @GetMapping("/signature/{id}")
    public ResponseEntity<SignatureDTO> getSignature(@PathVariable String id) {
        log.debug("REST request to get Signature : {}", id);
        Optional<SignatureDTO> signatureDTO = signatureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(signatureDTO);
    }

    /**
     * {@code DELETE /signature/:id} : delete the "id" signature.
     *
     * @param id the id of the signatureDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/signature/{id}")
    public ResponseEntity<Void> deleteSignature(@PathVariable String id) {
        log.debug("REST request to delete Signature : {}", id);
        signatureService.delete(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
