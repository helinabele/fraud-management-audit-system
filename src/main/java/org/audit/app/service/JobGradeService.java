package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.JobGradeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.JobGrade}.
 */
public interface JobGradeService {
    /**
     * Save a jobGrade.
     *
     * @param jobGradeDTO the entity to save.
     * @return the persisted entity.
     */
    JobGradeDTO save(JobGradeDTO jobGradeDTO);

    /**
     * Updates a jobGrade.
     *
     * @param jobGradeDTO the entity to update.
     * @return the persisted entity.
     */
    JobGradeDTO update(JobGradeDTO jobGradeDTO);

    /**
     * Partially updates a jobGrade.
     *
     * @param jobGradeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<JobGradeDTO> partialUpdate(JobGradeDTO jobGradeDTO);

    /**
     * Get all the jobGrades.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<JobGradeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" jobGrade.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<JobGradeDTO> findOne(String id);

    /**
     * Delete the "id" jobGrade.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
