package org.audit.app.service.impl;

import java.util.Optional;
import org.audit.app.domain.Department;
import org.audit.app.repository.DepartmentRepository;
import org.audit.app.service.DepartmentService;
import org.audit.app.service.dto.DepartmentDTO;
import org.audit.app.service.mapper.DepartmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Department}.
 */
@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    private final DepartmentRepository departmentRepository;

    private final DepartmentMapper departmentMapper;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, DepartmentMapper departmentMapper) {
        this.departmentRepository = departmentRepository;
        this.departmentMapper = departmentMapper;
    }

    @Override
    public DepartmentDTO save(DepartmentDTO departmentDTO) {
        log.debug("Request to save Department : {}", departmentDTO);
        Department department = departmentMapper.toEntity(departmentDTO);
        department = departmentRepository.save(department);
        return departmentMapper.toDto(department);
    }

    @Override
    public DepartmentDTO update(DepartmentDTO departmentDTO) {
        log.debug("Request to update Department : {}", departmentDTO);
        Department department = departmentMapper.toEntity(departmentDTO);
        department = departmentRepository.save(department);
        return departmentMapper.toDto(department);
    }

    @Override
    public Optional<DepartmentDTO> partialUpdate(DepartmentDTO departmentDTO) {
        log.debug("Request to partially update Department : {}", departmentDTO);

        return departmentRepository
            .findById(departmentDTO.getId())
            .map(existingDepartment -> {
                departmentMapper.partialUpdate(existingDepartment, departmentDTO);

                return existingDepartment;
            })
            .map(departmentRepository::save)
            .map(departmentMapper::toDto);
    }

    @Override
    public Page<DepartmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Departments");
        return departmentRepository.findAll(pageable).map(departmentMapper::toDto);
    }

    public Page<DepartmentDTO> findAllWithEagerRelationships(Pageable pageable) {
        return departmentRepository.findAllWithEagerRelationships(pageable).map(departmentMapper::toDto);
    }

    @Override
    public Optional<DepartmentDTO> findOne(String id) {
        log.debug("Request to get Department : {}", id);
        return departmentRepository.findOneWithEagerRelationships(id).map(departmentMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Department : {}", id);
        departmentRepository.deleteById(id);
    }
}
