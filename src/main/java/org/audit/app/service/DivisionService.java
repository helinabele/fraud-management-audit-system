package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.DivisionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.Division}.
 */
public interface DivisionService {
    /**
     * Save a division.
     *
     * @param divisionDTO the entity to save.
     * @return the persisted entity.
     */
    DivisionDTO save(DivisionDTO divisionDTO);

    /**
     * Updates a division.
     *
     * @param divisionDTO the entity to update.
     * @return the persisted entity.
     */
    DivisionDTO update(DivisionDTO divisionDTO);

    /**
     * Partially updates a division.
     *
     * @param divisionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DivisionDTO> partialUpdate(DivisionDTO divisionDTO);

    /**
     * Get all the divisions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DivisionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" division.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DivisionDTO> findOne(String id);

    /**
     * Delete the "id" division.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
