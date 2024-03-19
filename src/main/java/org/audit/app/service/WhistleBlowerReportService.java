package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.WhistleBlowerReportDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.WhistleBlowerReport}.
 */
public interface WhistleBlowerReportService {
    /**
     * Save a whistleBlowerReport.
     *
     * @param whistleBlowerReportDTO the entity to save.
     * @return the persisted entity.
     */
    WhistleBlowerReportDTO save(WhistleBlowerReportDTO whistleBlowerReportDTO);

    /**
     * Updates a whistleBlowerReport.
     *
     * @param whistleBlowerReportDTO the entity to update.
     * @return the persisted entity.
     */
    WhistleBlowerReportDTO update(WhistleBlowerReportDTO whistleBlowerReportDTO);

    /**
     * Partially updates a whistleBlowerReport.
     *
     * @param whistleBlowerReportDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WhistleBlowerReportDTO> partialUpdate(WhistleBlowerReportDTO whistleBlowerReportDTO);

    /**
     * Get all the whistleBlowerReports.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WhistleBlowerReportDTO> findAll(Pageable pageable);

    /**
     * Get all the whistleBlowerReports with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WhistleBlowerReportDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" whistleBlowerReport.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WhistleBlowerReportDTO> findOne(String id);

    /**
     * Delete the "id" whistleBlowerReport.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
