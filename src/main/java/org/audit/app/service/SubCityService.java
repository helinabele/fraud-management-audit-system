package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.SubCityDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.SubCity}.
 */
public interface SubCityService {
    /**
     * Save a subCity.
     *
     * @param subCityDTO the entity to save.
     * @return the persisted entity.
     */
    SubCityDTO save(SubCityDTO subCityDTO);

    /**
     * Updates a subCity.
     *
     * @param subCityDTO the entity to update.
     * @return the persisted entity.
     */
    SubCityDTO update(SubCityDTO subCityDTO);

    /**
     * Partially updates a subCity.
     *
     * @param subCityDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SubCityDTO> partialUpdate(SubCityDTO subCityDTO);

    /**
     * Get all the subCities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SubCityDTO> findAll(Pageable pageable);

    /**
     * Get all the subCities with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SubCityDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" subCity.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubCityDTO> findOne(String id);

    /**
     * Delete the "id" subCity.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
