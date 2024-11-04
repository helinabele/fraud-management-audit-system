package org.audit.app.service.mapper;

import java.util.List;

import org.audit.app.domain.Employee;
import org.audit.app.domain.FraudInvestigationReport;
import org.audit.app.domain.Task;
import org.audit.app.domain.Team;
import org.audit.app.service.dto.EmployeeDTO;
import org.audit.app.service.dto.FraudInvestigationReportDTO;
import org.audit.app.service.dto.TaskDTO;
import org.audit.app.service.dto.TeamDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link FraudInvestigationReport} and its DTO {@link FraudInvestigationReportDTO}.
 */
@Mapper(componentModel = "spring")
public interface FraudInvestigationReportMapper extends EntityMapper<FraudInvestigationReportDTO, FraudInvestigationReport> {
    @Mapping(target = "employee", source = "employee", qualifiedByName = "employeeName")
    @Mapping(target = "task", source = "task", qualifiedByName = "taskTitle")
    @Mapping(target = "team", source = "team", qualifiedByName = "teamTeamName")
    @Mapping(target = "whistleBlowerReport", source = "whistleBlowerReport")
    FraudInvestigationReportDTO toDto(FraudInvestigationReport s);

    @Named("employeeName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    List<EmployeeDTO> toDtoEmployeeName(List<Employee> employee);

    @Named("taskTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    TaskDTO toDtoTaskTitle(Task task);

    @Named("teamTeamName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "teamName", source = "teamName")
    TeamDTO toDtoTeamTeamName(Team team);
}
