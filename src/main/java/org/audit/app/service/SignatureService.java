package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.SignatureDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/***
 * Service Interface for managing {@link org.audit.app.domain.Signature}
 */
public interface SignatureService {

    /**
     * save a signature.
     *
     * @param signatureDTO the entity to save.
     * @return the persisted entity.
     */
    SignatureDTO save(SignatureDTO signatureDTO);

    /**
     * Updates a signature.
     *
     * @param signatureDTO the entity to update.
     * @return the persisted entity.
     */
    SignatureDTO update(SignatureDTO signatureDTO);

    /**
     * Partially update a signature.
     *
     * @param signatureDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SignatureDTO> partialUpdate(SignatureDTO signatureDTO);

    /**
     * Get all the signature.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SignatureDTO> findAll(Pageable pageable);

    /**
     * Get the "id" signature.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SignatureDTO> findOne(String id);

    /**
     * Delete the "id" signature.
     *
     * @param id the id of entity.
     */
    void delete(String id);
}
