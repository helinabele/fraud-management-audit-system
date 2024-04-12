package org.audit.app.service.mapper;

import java.util.Set;

import org.audit.app.domain.Employee;
import org.audit.app.domain.Managerial;
import org.audit.app.domain.Team;
import org.audit.app.domain.TeamLead;
import org.audit.app.service.dto.EmployeeDTO;
import org.audit.app.service.dto.ManagerialDTO;
import org.audit.app.service.dto.TeamDTO;
import org.audit.app.service.dto.TeamLeadDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Team} and its DTO {@link TeamDTO}.
 */
@Mapper(componentModel = "spring")
public interface TeamMapper extends EntityMapper<TeamDTO, Team> {
    @Mapping(target = "teamLead", source = "teamLead", qualifiedByName = "teamLeadTeamLeadName")
    @Mapping(target = "managers", source = "managers", qualifiedByName = "managerialManagerialName")
    @Mapping(target = "employees", source = "employees", qualifiedByName = "employeeName")
    TeamDTO toDto(Team s);

    @Named("teamLeadTeamLeadName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "teamLeadName", source = "teamLeadName")
    TeamLeadDTO toDtoTeamLeadTeamLeadName(TeamLead teamLead);

    @Named("managerialManagerialName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "managerialName", source = "managerialName")
    ManagerialDTO toDtoManagerialManagerialName(Managerial managerial);
 
    @Named("employeeName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    Set<EmployeeDTO> toDtoEmployeeName(Set<Employee> employees);
}
