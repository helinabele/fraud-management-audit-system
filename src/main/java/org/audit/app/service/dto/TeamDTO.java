package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link org.audit.app.domain.Team} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TeamDTO implements Serializable {

    private String id;

    private String teamName;

    private String description;

    private Integer managerialId;

    private Boolean isCreator;

    private TeamLeadDTO teamLead;

    private ManagerialDTO managers;
    
    private Set<EmployeeDTO> employees;

    public Set<EmployeeDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<EmployeeDTO> employees) {
        this.employees = employees;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getManagerialId() {
        return managerialId;
    }

    public void setManagerialId(Integer managerialId) {
        this.managerialId = managerialId;
    }

    public Boolean getIsCreator() {
        return isCreator;
    }

    public void setIsCreator(Boolean isCreator) {
        this.isCreator = isCreator;
    }

    public TeamLeadDTO getTeamLead() {
        return teamLead;
    }

    public void setTeamLead(TeamLeadDTO teamLead) {
        this.teamLead = teamLead;
    }

    public ManagerialDTO getManagers() {
        return managers;
    }

    public void setManagers(ManagerialDTO managers) {
        this.managers = managers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TeamDTO)) {
            return false;
        }

        TeamDTO teamDTO = (TeamDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, teamDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TeamDTO{" +
            "id='" + getId() + "'" +
            ", teamName='" + getTeamName() + "'" +
            ", description='" + getDescription() + "'" +
            ", managerialId=" + getManagerialId() +
            ", isCreator='" + getIsCreator() + "'" +
            ", teamLead=" + getTeamLead() +
            ", managers=" + getManagers() +
            "}";
    }
}
