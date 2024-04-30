package org.audit.app.service.mapper;

import org.audit.app.domain.JobGrade;
import org.audit.app.service.dto.JobGradeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link JobGrade} and its DTO {@link JobGradeDTO}.
 */
@Mapper(componentModel = "spring")
public interface JobGradeMapper extends EntityMapper<JobGradeDTO, JobGrade> {}
