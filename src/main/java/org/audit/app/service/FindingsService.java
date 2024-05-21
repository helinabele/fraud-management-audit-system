package org.audit.app.service;

import java.util.Optional;
import org.audit.app.service.dto.FindingsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link org.audit.app.domain.Findings}.
 */
public interface FindingsService {
    /**
     * Save a findings.
     *
     * @param findingsDTO the entity to save.
     * @return the persisted entity.
     */
    FindingsDTO save(FindingsDTO findingsDTO);

    /**
     * Updates a findings.
     *
     * @param findingsDTO the entity to update.
     * @return the persisted entity.
     */
    FindingsDTO update(FindingsDTO findingsDTO);

    /**
     * Partially updates a findings.
     *
     * @param findingsDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FindingsDTO> partialUpdate(FindingsDTO findingsDTO);

    /**
     * Get all the findings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FindingsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" findings.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FindingsDTO> findOne(String id);

    /**
     * Delete the "id" findings.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    // public FindingsDTO addAttachment(String id, byte[] attachment) {
    //     Findings findings = findingsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Findings not found"));
    //     findings.addFindingAndAnalysisAnnex(attachment);
    //     findings = findingsRepository.save(findings);
    //     return findingsMapper.toDto(findings);
    // }
}
