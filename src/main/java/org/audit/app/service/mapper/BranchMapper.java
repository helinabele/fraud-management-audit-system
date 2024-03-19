package org.audit.app.service.mapper;

import org.audit.app.domain.Branch;
import org.audit.app.domain.Department;
import org.audit.app.domain.Division;
import org.audit.app.service.dto.BranchDTO;
import org.audit.app.service.dto.DepartmentDTO;
import org.audit.app.service.dto.DivisionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Branch} and its DTO {@link BranchDTO}.
 */
@Mapper(componentModel = "spring")
public interface BranchMapper extends EntityMapper<BranchDTO, Branch> {
    @Mapping(target = "division", source = "division", qualifiedByName = "divisionDivisionName")
    @Mapping(target = "department", source = "department", qualifiedByName = "departmentDepartmentName")
    BranchDTO toDto(Branch s);

    @Named("divisionDivisionName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "divisionName", source = "divisionName")
    DivisionDTO toDtoDivisionDivisionName(Division division);

    @Named("departmentDepartmentName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "departmentName", source = "departmentName")
    DepartmentDTO toDtoDepartmentDepartmentName(Department department);
}
