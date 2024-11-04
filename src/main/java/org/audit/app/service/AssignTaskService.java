package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.AssignTaskDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.AssignTask}.
 */
public interface AssignTaskService {
    /**
     * Save a assignTask.
     *
     * @param assignTaskDTO the entity to save.
     * @return the persisted entity.
     */
    AssignTaskDTO save(AssignTaskDTO assignTaskDTO);

    /**
     * Updates a assignTask.
     *
     * @param assignTaskDTO the entity to update.
     * @return the persisted entity.
     */
    AssignTaskDTO update(AssignTaskDTO assignTaskDTO);

//    AssignTaskDTO assign(AssignTaskDTO assignTaskDTO);

    /**
     * Partially updates a assignTask.
     *
     * @param assignTaskDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AssignTaskDTO> partialUpdate(AssignTaskDTO assignTaskDTO);

    /**
     * Get all the assignTasks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AssignTaskDTO> findAll(Pageable pageable);

    /**
     * Get all the assignTasks with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AssignTaskDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" assignTask.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AssignTaskDTO> findOne(String id);

    /**
     * Delete the "id" assignTask.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
