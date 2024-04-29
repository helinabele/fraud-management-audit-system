package org.audit.app.service.mapper;

import org.audit.app.domain.JobTitle;
import org.audit.app.service.dto.JobTitleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link JobTitle} and its DTO {@link JobTitleDTO}.
 */
@Mapper(componentModel = "spring")
public interface JobTitleMapper extends EntityMapper<JobTitleDTO, JobTitle> {}
