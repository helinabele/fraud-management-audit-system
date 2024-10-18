package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.AssignTask;
import org.audit.app.domain.WhistleBlowerReport;
import org.audit.app.domain.enumeration.ReportStatus;
import org.audit.app.repository.AssignTaskRepository;
import org.audit.app.repository.WhistleBlowerReportRepository;
import org.audit.app.service.AssignTaskService;
import org.audit.app.service.dto.AssignTaskDTO;
import org.audit.app.service.mapper.AssignTaskMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.audit.app.web.rest.errors.BadRequestAlertException;

/**
 * Service Implementation for managing {@link AssignTask}.
 */
@Service
public class AssignTaskServiceImpl implements AssignTaskService {

    private final Logger log = LoggerFactory.getLogger(AssignTaskServiceImpl.class);

    private final AssignTaskRepository assignTaskRepository;

    private final AssignTaskMapper assignTaskMapper;

    private final WhistleBlowerReportRepository whistleBlowerReportRepository;

    public AssignTaskServiceImpl(AssignTaskRepository assignTaskRepository, AssignTaskMapper assignTaskMapper,  WhistleBlowerReportRepository whistleBlowerReportRepository) {
        this.assignTaskRepository = assignTaskRepository;
        this.assignTaskMapper = assignTaskMapper;
        this.whistleBlowerReportRepository = whistleBlowerReportRepository;
    }

    @Override
    public AssignTaskDTO save(AssignTaskDTO assignTaskDTO) {
        log.debug("Request to save AssignTask : {}", assignTaskDTO);

        // Convert DTO to entity
        AssignTask assignTask = assignTaskMapper.toEntity(assignTaskDTO);

        // Ensure the whistleBlowerReport is not null and correctly assigned
        if (assignTaskDTO.getWhistleBlowerReport() != null) {
            // Fetch the WhistleBlowerReport by ID
            WhistleBlowerReport whistleBlowerReport = whistleBlowerReportRepository.findById(assignTaskDTO.getWhistleBlowerReport().getId())
                .orElseThrow(() -> new BadRequestAlertException("Invalid whistle blower ID", "whistle_blower_report", "idnotfound")); 
log.debug("Fetched WhistleBlowerReport: {}", whistleBlowerReport);
            // Set report status to "ON_PROGRESS"
            whistleBlowerReport.setReportStatus(ReportStatus.ON_PROGRESS);

            // Save the updated WhistleBlowerReport with the new status
            whistleBlowerReportRepository.save(whistleBlowerReport);

            // Assign the updated WhistleBlowerReport to the task
            assignTask.setWhistleBlowerReport(whistleBlowerReport);
        }

        // Save the AssignTask entity
        assignTask = assignTaskRepository.save(assignTask);

        // Return the DTO of the saved AssignTask
        return assignTaskMapper.toDto(assignTask);
    }


    @Override
    public AssignTaskDTO update(AssignTaskDTO assignTaskDTO) {
        log.debug("Request to update AssignTask : {}", assignTaskDTO);
        AssignTask assignTask = assignTaskMapper.toEntity(assignTaskDTO);
        assignTask = assignTaskRepository.save(assignTask);
        return assignTaskMapper.toDto(assignTask);
    }

    @Override
    public Optional<AssignTaskDTO> partialUpdate(AssignTaskDTO assignTaskDTO) {
        log.debug("Request to partially update AssignTask : {}", assignTaskDTO);

        return assignTaskRepository
            .findById(assignTaskDTO.getId())
            .map(existingAssignTask -> {
                assignTaskMapper.partialUpdate(existingAssignTask, assignTaskDTO);

                return existingAssignTask;
            })
            .map(assignTaskRepository::save)
            .map(assignTaskMapper::toDto);
    }

    @Override
    public Page<AssignTaskDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AssignTasks");
        return assignTaskRepository.findAll(pageable).map(assignTaskMapper::toDto);
    }

    public Page<AssignTaskDTO> findAllWithEagerRelationships(Pageable pageable) {
        return assignTaskRepository.findAllWithEagerRelationships(pageable).map(assignTaskMapper::toDto);
    }

    @Override
    public Optional<AssignTaskDTO> findOne(String id) {
        log.debug("Request to get AssignTask : {}", id);
        return assignTaskRepository.findOneWithEagerRelationships(id).map(assignTaskMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete AssignTask : {}", id);
        assignTaskRepository.deleteById(id);
    }
}
