package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.Branch;
import org.audit.app.repository.BranchRepository;
import org.audit.app.service.BranchService;
import org.audit.app.service.dto.BranchDTO;
import org.audit.app.service.mapper.BranchMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Branch}.
 */
@Service
public class BranchServiceImpl implements BranchService {

    private final Logger log = LoggerFactory.getLogger(BranchServiceImpl.class);

    private final BranchRepository branchRepository;

    private final BranchMapper branchMapper;

    public BranchServiceImpl(BranchRepository branchRepository, BranchMapper branchMapper) {
        this.branchRepository = branchRepository;
        this.branchMapper = branchMapper;
    }

    @Override
    public BranchDTO save(BranchDTO branchDTO) {
        log.debug("Request to save Branch : {}", branchDTO);
        Branch branch = branchMapper.toEntity(branchDTO);
        branch = branchRepository.save(branch);
        return branchMapper.toDto(branch);
    }

    @Override
    public BranchDTO update(BranchDTO branchDTO) {
        log.debug("Request to update Branch : {}", branchDTO);
        Branch branch = branchMapper.toEntity(branchDTO);
        branch = branchRepository.save(branch);
        return branchMapper.toDto(branch);
    }

    @Override
    public Optional<BranchDTO> partialUpdate(BranchDTO branchDTO) {
        log.debug("Request to partially update Branch : {}", branchDTO);

        return branchRepository
            .findById(branchDTO.getId())
            .map(existingBranch -> {
                branchMapper.partialUpdate(existingBranch, branchDTO);

                return existingBranch;
            })
            .map(branchRepository::save)
            .map(branchMapper::toDto);
    }

    @Override
    public Page<BranchDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Branches");
        return branchRepository.findAll(pageable).map(branchMapper::toDto);
    }

    public Page<BranchDTO> findAllWithEagerRelationships(Pageable pageable) {
        return branchRepository.findAllWithEagerRelationships(pageable).map(branchMapper::toDto);
    }

    @Override
    public Optional<BranchDTO> findOne(String id) {
        log.debug("Request to get Branch : {}", id);
        return branchRepository.findOneWithEagerRelationships(id).map(branchMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Branch : {}", id);
        branchRepository.deleteById(id);
    }
}
