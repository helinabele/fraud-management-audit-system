package org.audit.app.service.mapper;

import org.audit.app.domain.Division;
import org.audit.app.service.dto.DivisionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Division} and its DTO {@link DivisionDTO}.
 */
@Mapper(componentModel = "spring")
public interface DivisionMapper extends EntityMapper<DivisionDTO, Division> {}
