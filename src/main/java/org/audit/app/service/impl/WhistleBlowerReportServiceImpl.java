package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.WhistleBlowerReport;
import org.audit.app.repository.WhistleBlowerReportRepository;
import org.audit.app.service.WhistleBlowerReportService;
import org.audit.app.service.dto.WhistleBlowerReportDTO;
import org.audit.app.service.mapper.WhistleBlowerReportMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link WhistleBlowerReport}.
 */
@Service
public class WhistleBlowerReportServiceImpl implements WhistleBlowerReportService {

    private final Logger log = LoggerFactory.getLogger(WhistleBlowerReportServiceImpl.class);

    private final WhistleBlowerReportRepository whistleBlowerReportRepository;

    private final WhistleBlowerReportMapper whistleBlowerReportMapper;

    public WhistleBlowerReportServiceImpl(
        WhistleBlowerReportRepository whistleBlowerReportRepository,
        WhistleBlowerReportMapper whistleBlowerReportMapper
    ) {
        this.whistleBlowerReportRepository = whistleBlowerReportRepository;
        this.whistleBlowerReportMapper = whistleBlowerReportMapper;
    }

    @Override
    public WhistleBlowerReportDTO save(WhistleBlowerReportDTO whistleBlowerReportDTO) {
        log.debug("Request to save WhistleBlowerReport : {}", whistleBlowerReportDTO);
        WhistleBlowerReport whistleBlowerReport = whistleBlowerReportMapper.toEntity(whistleBlowerReportDTO);
        whistleBlowerReport = whistleBlowerReportRepository.save(whistleBlowerReport);
        return whistleBlowerReportMapper.toDto(whistleBlowerReport);
    }

    @Override
    public WhistleBlowerReportDTO update(WhistleBlowerReportDTO whistleBlowerReportDTO) {
        log.debug("Request to update WhistleBlowerReport : {}", whistleBlowerReportDTO);
        WhistleBlowerReport whistleBlowerReport = whistleBlowerReportMapper.toEntity(whistleBlowerReportDTO);
        whistleBlowerReport = whistleBlowerReportRepository.save(whistleBlowerReport);
        return whistleBlowerReportMapper.toDto(whistleBlowerReport);
    }

    @Override
    public Optional<WhistleBlowerReportDTO> partialUpdate(WhistleBlowerReportDTO whistleBlowerReportDTO) {
        log.debug("Request to partially update WhistleBlowerReport : {}", whistleBlowerReportDTO);

        return whistleBlowerReportRepository
            .findById(whistleBlowerReportDTO.getId())
            .map(existingWhistleBlowerReport -> {
                whistleBlowerReportMapper.partialUpdate(existingWhistleBlowerReport, whistleBlowerReportDTO);

                return existingWhistleBlowerReport;
            })
            .map(whistleBlowerReportRepository::save)
            .map(whistleBlowerReportMapper::toDto);
    }

    @Override
    public Page<WhistleBlowerReportDTO> findAll(Pageable pageable) {
        log.debug("Request to get all WhistleBlowerReports");
        return whistleBlowerReportRepository.findAll(pageable).map(whistleBlowerReportMapper::toDto);
    }

    public Page<WhistleBlowerReportDTO> findAllWithEagerRelationships(Pageable pageable) {
        return whistleBlowerReportRepository.findAllWithEagerRelationships(pageable).map(whistleBlowerReportMapper::toDto);
    }

    @Override
    public Optional<WhistleBlowerReportDTO> findOne(String id) {
        log.debug("Request to get WhistleBlowerReport : {}", id);
        return whistleBlowerReportRepository.findOneWithEagerRelationships(id).map(whistleBlowerReportMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete WhistleBlowerReport : {}", id);
        whistleBlowerReportRepository.deleteById(id);
    }
}
