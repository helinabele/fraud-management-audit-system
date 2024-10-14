package org.audit.app.service.impl;

import java.util.NoSuchElementException;
import java.util.Optional;
import org.audit.app.domain.Task;
import org.audit.app.domain.WhistleBlowerReport;
import org.audit.app.domain.enumeration.ReportStatus;
import org.audit.app.repository.TaskRepository;
import org.audit.app.repository.WhistleBlowerReportRepository;
import org.audit.app.service.TaskService;
import org.audit.app.service.dto.TaskDTO;
import org.audit.app.service.mapper.TaskMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
     * Service Implementation for managing {@link Task}.
     */
    @Service
    public class TaskServiceImpl implements TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    private final WhistleBlowerReportRepository whistleBlowerReportRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper,  WhistleBlowerReportRepository whistleBlowerReportRepository) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.whistleBlowerReportRepository = whistleBlowerReportRepository;
    }

    @Override
    public TaskDTO save(TaskDTO taskDTO) {
        log.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    @Override
    public TaskDTO update(TaskDTO taskDTO) {
        log.debug("Request to update Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    @Override
    public Optional<TaskDTO> partialUpdate(TaskDTO taskDTO) {
        log.debug("Request to partially update Task : {}", taskDTO);

        return taskRepository
            .findById(taskDTO.getId())
            .map(existingTask -> {
                taskMapper.partialUpdate(existingTask, taskDTO);

                return existingTask;
            })
            .map(taskRepository::save)
            .map(taskMapper::toDto);
    }

    @Override
    public Page<TaskDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tasks");
        return taskRepository.findAll(pageable).map(taskMapper::toDto);
    }

    @Override
    public Optional<TaskDTO> findOne(String id) {
        log.debug("Request to get Task : {}", id);
        return taskRepository.findById(id).map(taskMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Task : {}", id);
        taskRepository.deleteById(id);
    }

    @Override
    public Task updateTaskStatus(Long taskId, ReportStatus newStatus) {
        Task task = taskRepository.findById(String.valueOf(taskId))
            .orElseThrow(() -> new NoSuchElementException("Task not found"));

        task.setStatus(newStatus);
        taskRepository.save(task);

        // Update the related whistleblower report status
        WhistleBlowerReport report = (WhistleBlowerReport) task.getWhistleBlower();
        if (report != null) {
            report.setReportStatus(mapTaskStatusToReportStatus(newStatus));
            whistleBlowerReportRepository.save(report);
        }

        return task;
    }

    private ReportStatus mapTaskStatusToReportStatus(ReportStatus taskStatus) {
        switch (taskStatus) {
            case STARTED:
                return ReportStatus.STARTED;
            case ON_PROGRESS:
                return ReportStatus.ON_PROGRESS;
            case CLOSED:
                return ReportStatus.IMPLEMENTED;
            case REJECTED:
                return ReportStatus.REJECTED;
            default:
                return ReportStatus.INITIATED;
        }
    }

}
