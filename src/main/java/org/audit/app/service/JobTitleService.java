package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.JobTitleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.JobTitle}.
 */
public interface JobTitleService {
    /**
     * Save a jobTitle.
     *
     * @param jobTitleDTO the entity to save.
     * @return the persisted entity.
     */
    JobTitleDTO save(JobTitleDTO jobTitleDTO);

    /**
     * Updates a jobTitle.
     *
     * @param jobTitleDTO the entity to update.
     * @return the persisted entity.
     */
    JobTitleDTO update(JobTitleDTO jobTitleDTO);

    /**
     * Partially updates a jobTitle.
     *
     * @param jobTitleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<JobTitleDTO> partialUpdate(JobTitleDTO jobTitleDTO);

    /**
     * Get all the jobTitles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<JobTitleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" jobTitle.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<JobTitleDTO> findOne(String id);

    /**
     * Delete the "id" jobTitle.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
