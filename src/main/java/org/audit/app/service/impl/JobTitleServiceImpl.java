package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.JobTitle;
import org.audit.app.repository.JobTitleRepository;
import org.audit.app.service.JobTitleService;
import org.audit.app.service.dto.JobTitleDTO;
import org.audit.app.service.mapper.JobTitleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link JobTitle}.
 */
@Service
public class JobTitleServiceImpl implements JobTitleService {

    private final Logger log = LoggerFactory.getLogger(JobTitleServiceImpl.class);

    private final JobTitleRepository jobTitleRepository;

    private final JobTitleMapper jobTitleMapper;

    public JobTitleServiceImpl(JobTitleRepository jobTitleRepository, JobTitleMapper jobTitleMapper) {
        this.jobTitleRepository = jobTitleRepository;
        this.jobTitleMapper = jobTitleMapper;
    }

    @Override
    public JobTitleDTO save(JobTitleDTO jobTitleDTO) {
        log.debug("Request to save JobTitle : {}", jobTitleDTO);
        JobTitle jobTitle = jobTitleMapper.toEntity(jobTitleDTO);
        jobTitle = jobTitleRepository.save(jobTitle);
        return jobTitleMapper.toDto(jobTitle);
    }

    @Override
    public JobTitleDTO update(JobTitleDTO jobTitleDTO) {
        log.debug("Request to update JobTitle : {}", jobTitleDTO);
        JobTitle jobTitle = jobTitleMapper.toEntity(jobTitleDTO);
        jobTitle = jobTitleRepository.save(jobTitle);
        return jobTitleMapper.toDto(jobTitle);
    }

    @Override
    public Optional<JobTitleDTO> partialUpdate(JobTitleDTO jobTitleDTO) {
        log.debug("Request to partially update JobTitle : {}", jobTitleDTO);

        return jobTitleRepository
            .findById(jobTitleDTO.getId())
            .map(existingJobTitle -> {
                jobTitleMapper.partialUpdate(existingJobTitle, jobTitleDTO);

                return existingJobTitle;
            })
            .map(jobTitleRepository::save)
            .map(jobTitleMapper::toDto);
    }

    @Override
    public Page<JobTitleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all JobTitles");
        return jobTitleRepository.findAll(pageable).map(jobTitleMapper::toDto);
    }

    @Override
    public Optional<JobTitleDTO> findOne(String id) {
        log.debug("Request to get JobTitle : {}", id);
        return jobTitleRepository.findById(id).map(jobTitleMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete JobTitle : {}", id);
        jobTitleRepository.deleteById(id);
    }
}
