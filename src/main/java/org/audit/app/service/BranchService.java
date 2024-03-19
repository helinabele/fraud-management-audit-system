package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.BranchDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.Branch}.
 */
public interface BranchService {
    /**
     * Save a branch.
     *
     * @param branchDTO the entity to save.
     * @return the persisted entity.
     */
    BranchDTO save(BranchDTO branchDTO);

    /**
     * Updates a branch.
     *
     * @param branchDTO the entity to update.
     * @return the persisted entity.
     */
    BranchDTO update(BranchDTO branchDTO);

    /**
     * Partially updates a branch.
     *
     * @param branchDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BranchDTO> partialUpdate(BranchDTO branchDTO);

    /**
     * Get all the branches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BranchDTO> findAll(Pageable pageable);

    /**
     * Get all the branches with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BranchDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" branch.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BranchDTO> findOne(String id);

    /**
     * Delete the "id" branch.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
