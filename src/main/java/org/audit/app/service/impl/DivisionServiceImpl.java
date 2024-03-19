package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.Division;
import org.audit.app.repository.DivisionRepository;
import org.audit.app.service.DivisionService;
import org.audit.app.service.dto.DivisionDTO;
import org.audit.app.service.mapper.DivisionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Division}.
 */
@Service
public class DivisionServiceImpl implements DivisionService {

    private final Logger log = LoggerFactory.getLogger(DivisionServiceImpl.class);

    private final DivisionRepository divisionRepository;

    private final DivisionMapper divisionMapper;

    public DivisionServiceImpl(DivisionRepository divisionRepository, DivisionMapper divisionMapper) {
        this.divisionRepository = divisionRepository;
        this.divisionMapper = divisionMapper;
    }

    @Override
    public DivisionDTO save(DivisionDTO divisionDTO) {
        log.debug("Request to save Division : {}", divisionDTO);
        Division division = divisionMapper.toEntity(divisionDTO);
        division = divisionRepository.save(division);
        return divisionMapper.toDto(division);
    }

    @Override
    public DivisionDTO update(DivisionDTO divisionDTO) {
        log.debug("Request to update Division : {}", divisionDTO);
        Division division = divisionMapper.toEntity(divisionDTO);
        division = divisionRepository.save(division);
        return divisionMapper.toDto(division);
    }

    @Override
    public Optional<DivisionDTO> partialUpdate(DivisionDTO divisionDTO) {
        log.debug("Request to partially update Division : {}", divisionDTO);

        return divisionRepository
            .findById(divisionDTO.getId())
            .map(existingDivision -> {
                divisionMapper.partialUpdate(existingDivision, divisionDTO);

                return existingDivision;
            })
            .map(divisionRepository::save)
            .map(divisionMapper::toDto);
    }

    @Override
    public Page<DivisionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Divisions");
        return divisionRepository.findAll(pageable).map(divisionMapper::toDto);
    }

    @Override
    public Optional<DivisionDTO> findOne(String id) {
        log.debug("Request to get Division : {}", id);
        return divisionRepository.findById(id).map(divisionMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Division : {}", id);
        divisionRepository.deleteById(id);
    }
}
