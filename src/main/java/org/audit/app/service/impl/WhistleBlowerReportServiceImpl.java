package org.audit.app.service.impl;

import java.util.Optional;

import org.audit.app.domain.ReportStatus;
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

/**
 * Service Implementation for managing {@link WhistleBlowerReport}.
 */
@Service
public class WhistleBlowerReportServiceImpl implements WhistleBlowerReportService {

    private final Logger log = LoggerFactory.getLogger(WhistleBlowerReportServiceImpl.class);

    private final WhistleBlowerReportRepository whistleBlowerReportRepository;

    private final WhistleBlowerReportMapper whistleBlowerReportMapper;

    private final WhistleBlowerReportRepository reportRepository;

    public WhistleBlowerReportServiceImpl(
        WhistleBlowerReportRepository whistleBlowerReportRepository,
        WhistleBlowerReportMapper whistleBlowerReportMapper,
        WhistleBlowerReportRepository reportRepository
    ) {
        this.whistleBlowerReportRepository = whistleBlowerReportRepository;
        this.whistleBlowerReportMapper = whistleBlowerReportMapper;
        this.reportRepository = reportRepository;
    }

    @Override
    public WhistleBlowerReportDTO save(WhistleBlowerReportDTO whistleBlowerReportDTO) {
        log.debug("Request to save WhistleBlowerReport : {}", whistleBlowerReportDTO);

        //convert dto to entity
        WhistleBlowerReport whistleBlowerReport = whistleBlowerReportMapper.toEntity(whistleBlowerReportDTO);

        //generate tracking number if it's not already set
        if (whistleBlowerReport.getTrackingNumber() == null || whistleBlowerReport.getTrackingNumber().isEmpty()) {
            whistleBlowerReport.setTrackingNumber(generateTrackingNumber());
        }

        //save the entity
        whistleBlowerReport = whistleBlowerReportRepository.save(whistleBlowerReport);

        //convert entity back to DTO and return
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
    public Page<Object> findAll(Pageable pageable) {
        log.debug("Request to get all WhistleBlowerReports");
        return whistleBlowerReportRepository.findAll(pageable).map(whistleBlowerReportMapper::toDto)
        .map(status->status.getReportStatus() != ReportStatus.REJECTED);
    }

    @Override
    public Page<WhistleBlowerReportDTO> findByReportStatus(Pageable pageable) {
        log.debug("Request to get all WhistleBlowerReports");
        return whistleBlowerReportRepository.findAll(pageable).map(whistleBlowerReportMapper::toDto);
    }


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
        // Logic to reject the report and update its status in the database
        // ...

        // Example: Update the report's status to "Rejected"
        Optional<WhistleBlowerReport> optionalReport = reportRepository.findById(id);
        if (optionalReport.isPresent()) {
            WhistleBlowerReport report = optionalReport.get();
            report.setReportStatus(ReportStatus.REJECTED);
            reportRepository.save(report);
        } else {
            // Handle the case when the report with the given ID is not found
            throw new RuntimeException("WhistleBlowerReport not found with id: " + id);
            // or any other appropriate exception/error handling
        }
        return false;
    }

    // @Override
    // public Optional<WhistleBlowerReportDTO> findByReportStatus(String status) {
    //     /**
    //      * Write the logic which fecthes the report status with not rejected
    //      */
    //     if(status != ReportStatus.REJECTED.toString()){
    //         return (Optional<WhistleBlowerReportDTO>) reportRepository.findByReportStatus(status);
    //     }
    //     throw new UnsupportedOperationException("Unimplemented method 'findByReportStatus'");
    // }


}
