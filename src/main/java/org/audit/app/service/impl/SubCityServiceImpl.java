package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.SubCity;
import org.audit.app.repository.SubCityRepository;
import org.audit.app.service.SubCityService;
import org.audit.app.service.dto.SubCityDTO;
import org.audit.app.service.mapper.SubCityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link SubCity}.
 */
@Service
public class SubCityServiceImpl implements SubCityService {

    private final Logger log = LoggerFactory.getLogger(SubCityServiceImpl.class);

    private final SubCityRepository subCityRepository;

    private final SubCityMapper subCityMapper;

    public SubCityServiceImpl(SubCityRepository subCityRepository, SubCityMapper subCityMapper) {
        this.subCityRepository = subCityRepository;
        this.subCityMapper = subCityMapper;
    }

    @Override
    public SubCityDTO save(SubCityDTO subCityDTO) {
        log.debug("Request to save SubCity : {}", subCityDTO);
        SubCity subCity = subCityMapper.toEntity(subCityDTO);
        subCity = subCityRepository.save(subCity);
        return subCityMapper.toDto(subCity);
    }

    @Override
    public SubCityDTO update(SubCityDTO subCityDTO) {
        log.debug("Request to update SubCity : {}", subCityDTO);
        SubCity subCity = subCityMapper.toEntity(subCityDTO);
        subCity = subCityRepository.save(subCity);
        return subCityMapper.toDto(subCity);
    }

    @Override
    public Optional<SubCityDTO> partialUpdate(SubCityDTO subCityDTO) {
        log.debug("Request to partially update SubCity : {}", subCityDTO);

        return subCityRepository
            .findById(subCityDTO.getId())
            .map(existingSubCity -> {
                subCityMapper.partialUpdate(existingSubCity, subCityDTO);

                return existingSubCity;
            })
            .map(subCityRepository::save)
            .map(subCityMapper::toDto);
    }

    @Override
    public Page<SubCityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubCities");
        return subCityRepository.findAll(pageable).map(subCityMapper::toDto);
    }

    public Page<SubCityDTO> findAllWithEagerRelationships(Pageable pageable) {
        return subCityRepository.findAllWithEagerRelationships(pageable).map(subCityMapper::toDto);
    }

    @Override
    public Optional<SubCityDTO> findOne(String id) {
        log.debug("Request to get SubCity : {}", id);
        return subCityRepository.findOneWithEagerRelationships(id).map(subCityMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete SubCity : {}", id);
        subCityRepository.deleteById(id);
    }
}
