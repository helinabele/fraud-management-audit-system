package org.audit.app.service.mapper;

import org.audit.app.domain.Department;
import org.audit.app.domain.Division;
import org.audit.app.service.dto.DepartmentDTO;
import org.audit.app.service.dto.DivisionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {
    @Mapping(target = "division", source = "division", qualifiedByName = "divisionDivisionName")
    DepartmentDTO toDto(Department s);

    @Named("divisionDivisionName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "divisionName", source = "divisionName")
    DivisionDTO toDtoDivisionDivisionName(Division division);
}
