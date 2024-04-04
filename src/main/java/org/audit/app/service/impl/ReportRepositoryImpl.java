package org.audit.app.service.impl;

import org.audit.app.service.dto.ReportRepositoryDTO;
import org.audit.app.service.mapper.ReportRepositoryMapper;

import java.util.Optional;

import org.audit.app.domain.ReportRepository;
import org.audit.app.repository.ReportRepositoryRepository;
import org.audit.app.service.ReportRepositoryService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service Implementation for managing {@link ReportRepository}.
 */
@Service
public class ReportRepositoryImpl implements ReportRepositoryService {
    private final Logger log = LoggerFactory.getLogger(ReportRepositoryImpl.class);

    private final ReportRepositoryRepository reportRepositoryRepository;

    private final ReportRepositoryMapper reportRepositoryMapper;

    public ReportRepositoryImpl(
        ReportRepositoryRepository reportRepositoryRepository,
        ReportRepositoryMapper reportRepositoryMapper
    ){
        this.reportRepositoryRepository = reportRepositoryRepository;
        this.reportRepositoryMapper = reportRepositoryMapper;
    }

    @Override
    public ReportRepositoryDTO save(ReportRepositoryDTO reportRepositoryDTO){
        log.debug("Request to save Report Repository : {}", reportRepositoryDTO);
        ReportRepository reportRepository = reportRepositoryMapper.toEntity(reportRepositoryDTO);
        reportRepository = reportRepositoryRepository.save(reportRepository);
        return reportRepositoryMapper.toDto(reportRepository);
    }

    @Override
    public ReportRepositoryDTO update(ReportRepositoryDTO reportRepositoryDTO){
        log.debug("Request to update Report Repository : {}", reportRepositoryDTO);
        ReportRepository reportRepository = reportRepositoryMapper.toEntity(reportRepositoryDTO);
        reportRepository = reportRepositoryRepository.save(reportRepository);
        return reportRepositoryMapper.toDto(reportRepository);
    }

    @Override
    public Optional<ReportRepositoryDTO> partialUpdate(ReportRepositoryDTO reportRepositoryDTO){
        log.debug("Request to partially update Report Repository : {}", reportRepositoryDTO);

        return reportRepositoryRepository
        .findById(reportRepositoryDTO.getId())
        .map(existingReportRepository -> {
            reportRepositoryMapper.partialUpdate(existingReportRepository, reportRepositoryDTO);

            return existingReportRepository;
        })
        .map(reportRepositoryRepository::save)
        .map(reportRepositoryMapper::toDto);
    }

    @Override
    public Page<ReportRepositoryDTO> findAll(Pageable pageable){
        log.debug("Request to get all report repository");
        return reportRepositoryRepository.findAll(pageable).map(reportRepositoryMapper::toDto);
    }

    @Override
    public Optional<ReportRepositoryDTO> findOne(String id){
        log.debug("Request to get Reoirt Repository : {}", id);
        return reportRepositoryRepository.findById(id).map(reportRepositoryMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete ReportRepository : {}", id);
        reportRepositoryRepository.deleteById(id);
    }


}
