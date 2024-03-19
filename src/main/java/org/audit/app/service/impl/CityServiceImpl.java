package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.City;
import org.audit.app.repository.CityRepository;
import org.audit.app.service.CityService;
import org.audit.app.service.dto.CityDTO;
import org.audit.app.service.mapper.CityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link City}.
 */
@Service
public class CityServiceImpl implements CityService {

    private final Logger log = LoggerFactory.getLogger(CityServiceImpl.class);

    private final CityRepository cityRepository;

    private final CityMapper cityMapper;

    public CityServiceImpl(CityRepository cityRepository, CityMapper cityMapper) {
        this.cityRepository = cityRepository;
        this.cityMapper = cityMapper;
    }

    @Override
    public CityDTO save(CityDTO cityDTO) {
        log.debug("Request to save City : {}", cityDTO);
        City city = cityMapper.toEntity(cityDTO);
        city = cityRepository.save(city);
        return cityMapper.toDto(city);
    }

    @Override
    public CityDTO update(CityDTO cityDTO) {
        log.debug("Request to update City : {}", cityDTO);
        City city = cityMapper.toEntity(cityDTO);
        city = cityRepository.save(city);
        return cityMapper.toDto(city);
    }

    @Override
    public Optional<CityDTO> partialUpdate(CityDTO cityDTO) {
        log.debug("Request to partially update City : {}", cityDTO);

        return cityRepository
            .findById(cityDTO.getId())
            .map(existingCity -> {
                cityMapper.partialUpdate(existingCity, cityDTO);

                return existingCity;
            })
            .map(cityRepository::save)
            .map(cityMapper::toDto);
    }

    @Override
    public Page<CityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cities");
        return cityRepository.findAll(pageable).map(cityMapper::toDto);
    }

    public Page<CityDTO> findAllWithEagerRelationships(Pageable pageable) {
        return cityRepository.findAllWithEagerRelationships(pageable).map(cityMapper::toDto);
    }

    @Override
    public Optional<CityDTO> findOne(String id) {
        log.debug("Request to get City : {}", id);
        return cityRepository.findOneWithEagerRelationships(id).map(cityMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete City : {}", id);
        cityRepository.deleteById(id);
    }
}
