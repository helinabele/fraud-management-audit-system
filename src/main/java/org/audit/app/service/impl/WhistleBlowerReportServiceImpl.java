package org.audit.app.service.impl;

import java.util.List;
import java.util.Optional;

import org.audit.app.domain.enumeration.ReportStatus;
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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.stream.Collectors;

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

        // Convert DTO to entity
        WhistleBlowerReport whistleBlowerReport = whistleBlowerReportMapper.toEntity(whistleBlowerReportDTO);

        // Generate tracking number if it's not already set
        if (whistleBlowerReport.getTrackingNumber() == null || whistleBlowerReport.getTrackingNumber().isEmpty()) {
            whistleBlowerReport.setTrackingNumber(generateTrackingNumber());
        }

        // Set initial status to "Initiated" if not already set
        if (whistleBlowerReport.getReportStatus() == null) {
            whistleBlowerReport.setReportStatus(ReportStatus.INITIATED); // Assuming you have an enum for statuses
        }

        // Save the entity
        whistleBlowerReport = whistleBlowerReportRepository.save(whistleBlowerReport);

        // Convert entity back to DTO and return
        return whistleBlowerReportMapper.toDto(whistleBlowerReport);
    }

    /**
     * Helper method to generate a unique tracking number.
     * Format example: WB-20230918-UUID
     */
    private String generateTrackingNumber() {
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uuidPart = UUID.randomUUID().toString().substring(0, 8); // First 8 characters of UUID
        return "WB-" + datePart + "-" + uuidPart;
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
        return whistleBlowerReportRepository.findAll(pageable)
            .map(whistleBlowerReportMapper::toDto);
            // .map(status -> status.getReportStatus() != ReportStatus.REJECTED);
    }

    @Override
    public Page<WhistleBlowerReportDTO> findByReportStatus(Pageable pageable) {
        log.debug("Request to get all WhistleBlowerReports");
        return whistleBlowerReportRepository.findAll(pageable).map(whistleBlowerReportMapper::toDto);
    }

    @Override
    public Page<WhistleBlowerReportDTO> findAllWithEagerRelationships(Pageable pageable) {
        return whistleBlowerReportRepository.findAllWithEagerRelationships(pageable)
            .map(whistleBlowerReportMapper::toDto);
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

    @Override
    public boolean rejectReport(String id) {
        log.debug("Request to reject WhistleBlowerReport with id: {}", id);

        // Logic to reject the report and update its status in the database
        Optional<WhistleBlowerReport> optionalReport = whistleBlowerReportRepository.findById(id);
        if (optionalReport.isPresent()) {
            WhistleBlowerReport report = optionalReport.get();
            report.setReportStatus(ReportStatus.REJECTED); // Set status to "Rejected"
            whistleBlowerReportRepository.save(report); // Save the updated report
            return true; // Return true indicating success
        } else {
            // Handle the case when the report with the given ID is not found
            throw new RuntimeException("WhistleBlowerReport not found with id: " + id);
        }
    }


    @Override
    public WhistleBlowerReportDTO updateStatus(String id, ReportStatus newStatus) {
        WhistleBlowerReport report = findById(id);
        report.setReportStatus(newStatus);
        return update(convertToDTO(report));
    }

    public WhistleBlowerReport findById(String id) {
        return whistleBlowerReportRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Report not found"));
    }

    private WhistleBlowerReportDTO convertToDTO(WhistleBlowerReport report) {
        WhistleBlowerReportDTO dto = new WhistleBlowerReportDTO();
        dto.setId(report.getId());
        dto.setReportStatus(report.getReportStatus());
        return dto;
    }

    @Override
    public List<WhistleBlowerReportDTO> findRejectedReports() {
        List<WhistleBlowerReport> rejectedReports = whistleBlowerReportRepository.findByReportStatus("REJECTED");
        return rejectedReports.stream()
            .map(whistleBlowerReportMapper::toDto)
            .collect(Collectors.toList());
    }

/*     @Override
    public Optional<WhistleBlowerReportDTO> findByTrackingNumber(String trackingNumber) {
        log.debug("Request to get WhistleBlowerReport : {}", trackingNumber);
        return whistleBlowerReportRepository.findByTrackingNumber(trackingNumber)
        .map(whistleBlowerReportMapper::toDto);
    } */
    @Override
    public Optional<WhistleBlowerReportDTO> findByTrackingNumber(String trackingNumber) {
        return whistleBlowerReportRepository.findByTrackingNumber(trackingNumber)
            .map(whistleBlowerReportMapper::toDto);
    }
}
