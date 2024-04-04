package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.ReportRepositoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/***
 * Service Interface for managing {@link org.audit.app.domain.ReportRepository}
 */
public interface ReportRepositoryService {

    /**
     * save a report repository.
     *
     * @param reportRepositoryDTO the entity to save.
     * @return the persisted entity.
     */
    ReportRepositoryDTO save(ReportRepositoryDTO reportRepositoryDTO);

    /**
     * Updates a Report Repository.
     *
     * @param reportRepositoryDTO the entity to update.
     * @return the persisted entity.
     */
    ReportRepositoryDTO update(ReportRepositoryDTO reportRepositoryDTO);

    /**
     * Partially update a report repository.
     *
     * @param reportRepositoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ReportRepositoryDTO> partialUpdate(ReportRepositoryDTO reportRepositoryDTO);

    /**
     * Get all the report repository.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReportRepositoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" report repository.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReportRepositoryDTO> findOne(String id);

    /**
     * Delete the "id" report repository.
     *
     * @param id the id of entity.
     */
    void delete(String id);
}
