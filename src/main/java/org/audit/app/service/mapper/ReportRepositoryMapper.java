package org.audit.app.service.mapper;

import org.audit.app.service.dto.ReportRepositoryDTO;
import org.mapstruct.Mapper;
import org.audit.app.domain.ReportRepository;

/**
 * Mapper for the entity {@link ReportRepository} and its DTO
 * {@link ReportRepositoryDTO}
 */
@Mapper(componentModel = "spring")
public interface ReportRepositoryMapper extends EntityMapper<ReportRepositoryDTO, ReportRepository> {}
