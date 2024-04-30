package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.JobGrade;
import org.audit.app.repository.JobGradeRepository;
import org.audit.app.service.JobGradeService;
import org.audit.app.service.dto.JobGradeDTO;
import org.audit.app.service.mapper.JobGradeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link JobGrade}.
 */
@Service
public class JobGradeServiceImpl implements JobGradeService {

    private final Logger log = LoggerFactory.getLogger(JobGradeServiceImpl.class);

    private final JobGradeRepository jobGradeRepository;

    private final JobGradeMapper jobGradeMapper;

    public JobGradeServiceImpl(JobGradeRepository jobGradeRepository, JobGradeMapper jobGradeMapper) {
        this.jobGradeRepository = jobGradeRepository;
        this.jobGradeMapper = jobGradeMapper;
    }

    @Override
    public JobGradeDTO save(JobGradeDTO jobGradeDTO) {
        log.debug("Request to save JobGrade : {}", jobGradeDTO);
        JobGrade jobGrade = jobGradeMapper.toEntity(jobGradeDTO);
        jobGrade = jobGradeRepository.save(jobGrade);
        return jobGradeMapper.toDto(jobGrade);
    }

    @Override
    public JobGradeDTO update(JobGradeDTO jobGradeDTO) {
        log.debug("Request to update JobGrade : {}", jobGradeDTO);
        JobGrade jobGrade = jobGradeMapper.toEntity(jobGradeDTO);
        jobGrade = jobGradeRepository.save(jobGrade);
        return jobGradeMapper.toDto(jobGrade);
    }

    @Override
    public Optional<JobGradeDTO> partialUpdate(JobGradeDTO jobGradeDTO) {
        log.debug("Request to partially update JobGrade : {}", jobGradeDTO);

        return jobGradeRepository
            .findById(jobGradeDTO.getId())
            .map(existingJobGrade -> {
                jobGradeMapper.partialUpdate(existingJobGrade, jobGradeDTO);

                return existingJobGrade;
            })
            .map(jobGradeRepository::save)
            .map(jobGradeMapper::toDto);
    }

    @Override
    public Page<JobGradeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all JobGrades");
        return jobGradeRepository.findAll(pageable).map(jobGradeMapper::toDto);
    }

    @Override
    public Optional<JobGradeDTO> findOne(String id) {
        log.debug("Request to get JobGrade : {}", id);
        return jobGradeRepository.findById(id).map(jobGradeMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete JobGrade : {}", id);
        jobGradeRepository.deleteById(id);
    }
}
