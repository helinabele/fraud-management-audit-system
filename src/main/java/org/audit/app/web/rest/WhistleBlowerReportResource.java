package org.audit.app.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.audit.app.domain.enumeration.ReportStatus;
import org.audit.app.repository.WhistleBlowerReportRepository;
import org.audit.app.service.WhistleBlowerReportService;
import org.audit.app.service.dto.WhistleBlowerReportDTO;
import org.audit.app.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import org.audit.app.domain.WhistleBlowerReport;

/**
 * REST controller for managing {@link org.audit.app.domain.WhistleBlowerReport}.
 */
@RestController
@RequestMapping("/api")
public class WhistleBlowerReportResource {

    private final Logger log = LoggerFactory.getLogger(WhistleBlowerReportResource.class);

    private static final String ENTITY_NAME = "whistleBlowerReport";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WhistleBlowerReportService whistleBlowerReportService;

    private final WhistleBlowerReportRepository whistleBlowerReportRepository;

    public WhistleBlowerReportResource(
        WhistleBlowerReportService whistleBlowerReportService,
        WhistleBlowerReportRepository whistleBlowerReportRepository
    ) {
        this.whistleBlowerReportService = whistleBlowerReportService;
        this.whistleBlowerReportRepository = whistleBlowerReportRepository;
    }

    /**
     * {@code POST  /whistle-blower-reports} : Create a new whistleBlowerReport.
     *
     * @param whistleBlowerReportDTO the whistleBlowerReportDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new whistleBlowerReportDTO, or with status {@code 400 (Bad Request)} if the whistleBlowerReport has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/whistle-blower-reports")
    public ResponseEntity<WhistleBlowerReportDTO> createWhistleBlowerReport(@RequestBody WhistleBlowerReportDTO whistleBlowerReportDTO)
        throws URISyntaxException {
        log.debug("REST request to save WhistleBlowerReport : {}", whistleBlowerReportDTO);
        if (whistleBlowerReportDTO.getId() != null) {
            throw new BadRequestAlertException("A new whistleBlowerReport cannot already have an ID", ENTITY_NAME, "idexists");
        }

    //    String smsUrl = "http://172.30.6.15:8890/message?from=CBE&to=";
    //    String text = "Dear" + '/' + "Sir " + whistleBlowerReportDTO.getFullName() +
    //            ", we are grateful for you taking the time and effort to bring this matter to our attention and we would like to assure you that your concerns will be handled shortly. Please provide us further details if you could through email --------- "
    //            + '&' + "telephone ------------.";
    //    String restURL = "&text=" + text +
    //            "&user=FRAUD&pass=Fraudpwd@123&id&dlrreq=0";

    //    String urlSMS2 = smsUrl + whistleBlowerReportDTO.getPhone() + restURL;
    //    HttpHeaders headers = new HttpHeaders();
    //    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
    //    RestTemplate restTemplate = new RestTemplate();
    //    HttpEntity<String> request = new HttpEntity<>(urlSMS2, headers);
    //    restTemplate.postForObject(urlSMS2, request, String.class);

        WhistleBlowerReportDTO result = whistleBlowerReportService.save(whistleBlowerReportDTO);
        return ResponseEntity
            .created(new URI("/api/whistle-blower-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /whistle-blower-reports/:id} : Updates an existing whistleBlowerReport.
     *
     * @param id the id of the whistleBlowerReportDTO to save.
     * @param whistleBlowerReportDTO the whistleBlowerReportDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated whistleBlowerReportDTO,
     * or with status {@code 400 (Bad Request)} if the whistleBlowerReportDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the whistleBlowerReportDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/whistle-blower-reports/{id}")
    public ResponseEntity<WhistleBlowerReportDTO> updateWhistleBlowerReport(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody WhistleBlowerReportDTO whistleBlowerReportDTO
    ) throws URISyntaxException {
        log.debug("REST request to update WhistleBlowerReport : {}, {}", id, whistleBlowerReportDTO);
        if (whistleBlowerReportDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, whistleBlowerReportDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!whistleBlowerReportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        WhistleBlowerReportDTO result = whistleBlowerReportService.update(whistleBlowerReportDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, whistleBlowerReportDTO.getId()))
            .body(result);
    }


    @PutMapping("/whistle-blower-reports/{id}/reject")
    public ResponseEntity<String> rejectReport(@PathVariable String id) {
        // Logic to reject the report and update its status in the database
        // ...
        boolean reportRejected = (boolean) whistleBlowerReportService.rejectReport(id);
        if (reportRejected) {
            return ResponseEntity.ok().build(); // Return a success response
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("WhistleBlowerReport not found with id: " + id);
            // Return a 404 Not Found response with a message indicating that the report was not found
        }
    }
/*
 @PutMapping("/whistle-blower-reports/{id}/status")
    public ResponseEntity<WhistleBlowerReport> updateStatus(@PathVariable String id, @RequestBody ReportStatus newStatus) {
        WhistleBlowerReport updatedReport = whistleBlowerReportService.updateStatus(id, newStatus);
        return ResponseEntity.ok(updatedReport);
    }
*/


   /*  @RejectMapping("/whistle-blower-reports/{id}/reject")
    public ResponseEntity<Void> rejectWhistleBlowerReport(@PathVariable String id) {
        log.debug("REST request to reject WhistleBlowerReport : {}", id);
        whistleBlowerReportService.rejectReport(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    } */
    /**
     * {@code PATCH  /whistle-blower-reports/:id} : Partial updates given fields of an existing whistleBlowerReport, field will ignore if it is null
     *
     * @param id the id of the whistleBlowerReportDTO to save.
     * @param whistleBlowerReportDTO the whistleBlowerReportDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated whistleBlowerReportDTO,
     * or with status {@code 400 (Bad Request)} if the whistleBlowerReportDTO is not valid,
     * or with status {@code 404 (Not Found)} if the whistleBlowerReportDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the whistleBlowerReportDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/whistle-blower-reports/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WhistleBlowerReportDTO> partialUpdateWhistleBlowerReport(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody WhistleBlowerReportDTO whistleBlowerReportDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update WhistleBlowerReport partially : {}, {}", id, whistleBlowerReportDTO);
        if (whistleBlowerReportDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, whistleBlowerReportDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!whistleBlowerReportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WhistleBlowerReportDTO> result = whistleBlowerReportService.partialUpdate(whistleBlowerReportDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, whistleBlowerReportDTO.getId())
        );
    }

    /**
     * {@code GET  /whistle-blower-reports} : get all the whistleBlowerReports.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of whistleBlowerReports in body.
     */
    @GetMapping("/whistle-blower-reports")
    public ResponseEntity<List<WhistleBlowerReportDTO>> getAllWhistleBlowerReports(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of WhistleBlowerReports");
        Page<WhistleBlowerReportDTO> page;
        // if (eagerload) {
            page = whistleBlowerReportService.findAllWithEagerRelationships(pageable);
        // }
        // else {
        //     page = whistleBlowerReportService.findAll(pageable);
        // }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    /**
     * {@code GET  /whistle-blower-reports/:id} : get the "id" whistleBlowerReport.
     *
     * @param id the id of the whistleBlowerReportDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the whistleBlowerReportDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/whistle-blower-reports/{id}")
    public ResponseEntity<WhistleBlowerReportDTO> getWhistleBlowerReport(@PathVariable String id) {
        log.debug("REST request to get WhistleBlowerReport : {}", id);
        Optional<WhistleBlowerReportDTO> whistleBlowerReportDTO = whistleBlowerReportService.findOne(id);
        return ResponseUtil.wrapOrNotFound(whistleBlowerReportDTO);
    }

    /**
     * {@code DELETE  /whistle-blower-reports/:id} : delete the "id" whistleBlowerReport.
     *
     * @param id the id of the whistleBlowerReportDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/whistle-blower-reports/{id}")
    public ResponseEntity<Void> deleteWhistleBlowerReport(@PathVariable String id) {
        log.debug("REST request to delete WhistleBlowerReport : {}", id);
        whistleBlowerReportService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }



}
