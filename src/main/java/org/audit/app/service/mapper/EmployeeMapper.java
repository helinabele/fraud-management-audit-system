package org.audit.app.service.mapper;

import org.audit.app.domain.Director;
import org.audit.app.domain.Employee;
import org.audit.app.domain.Managerial;
import org.audit.app.domain.Team;
import org.audit.app.domain.TeamLead;
import org.audit.app.domain.User;
import org.audit.app.service.dto.DirectorDTO;
import org.audit.app.service.dto.EmployeeDTO;
import org.audit.app.service.dto.ManagerialDTO;
import org.audit.app.service.dto.TeamDTO;
import org.audit.app.service.dto.TeamLeadDTO;
import org.audit.app.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employee} and its DTO {@link EmployeeDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    @Mapping(target = "director", source = "director", qualifiedByName = "directorDirectorName")
    @Mapping(target = "manager", source = "manager", qualifiedByName = "managerialManagerialName")
    @Mapping(target = "teamLead", source = "teamLead", qualifiedByName = "teamLeadTeamLeadName")
    EmployeeDTO toDto(Employee s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("directorDirectorName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "directorName", source = "directorName")
    DirectorDTO toDtoDirectorDirectorName(Director director);

    @Named("managerialManagerialName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "managerialName", source = "managerialName")
    ManagerialDTO toDtoManagerialManagerialName(Managerial managerial);

    @Named("teamLeadTeamLeadName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "teamLeadName", source = "teamLeadName")
    TeamLeadDTO toDtoTeamLeadTeamLeadName(TeamLead teamLead);
}
