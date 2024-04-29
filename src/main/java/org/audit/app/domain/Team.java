package org.audit.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Team.
 */
@Document(collection = "team")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("team_name")
    private String teamName;

    @Field("description")
    private String description;

    @Field("managerial_id")
    private Integer managerialId;

    @Field("is_creator")
    private Boolean isCreator;

    @DBRef
    @Field("teamLead")
    private TeamLead teamLead;

    @DBRef
    @Field("managers")
    @JsonIgnoreProperties(value = { "user", "directors" }, allowSetters = true)
    private Managerial managers;

    @DBRef
    @Field("employee")
    @JsonIgnoreProperties(value = { "user", "director", "manager", "teamLead", "team" }, allowSetters = true)
    private List<Employee> employees = new ArrayList<>();

    @DBRef
    @Field("assignTask")
    @JsonIgnoreProperties(value = { "director", "manager", "teamLead", "employee", "task", "team" }, allowSetters = true)
    private Set<AssignTask> assignTasks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Team id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeamName() {
        return this.teamName;
    }

    public Team teamName(String teamName) {
        this.setTeamName(teamName);
        return this;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getDescription() {
        return this.description;
    }

    public Team description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getManagerialId() {
        return this.managerialId;
    }

    public Team managerialId(Integer managerialId) {
        this.setManagerialId(managerialId);
        return this;
    }

    public void setManagerialId(Integer managerialId) {
        this.managerialId = managerialId;
    }

    public Boolean getIsCreator() {
        return this.isCreator;
    }

    public Team isCreator(Boolean isCreator) {
        this.setIsCreator(isCreator);
        return this;
    }

    public void setIsCreator(Boolean isCreator) {
        this.isCreator = isCreator;
    }

    public TeamLead getTeamLead() {
        return this.teamLead;
    }

    public void setTeamLead(TeamLead teamLead) {
        this.teamLead = teamLead;
    }

    public Team teamLead(TeamLead teamLead) {
        this.setTeamLead(teamLead);
        return this;
    }

    public Managerial getManagers() {
        return this.managers;
    }

    public void setManagers(Managerial managerial) {
        this.managers = managerial;
    }

    public Team managers(Managerial managerial) {
        this.setManagers(managerial);
        return this;
    }

    public List<Employee> getEmployees() {
        return this.employees;
    }

    public void setEmployees(List<Employee> employee) {
        if (this.employees != null) {
            this.employees.forEach(i -> i.setTeam(null));
        }
        if (employee != null) {
            employee.forEach(i -> i.setTeam(this));
        }
        this.employees = employee;
    }

    public Team employee(List<Employee> employee) {
        this.setEmployees(employee);
        return this;
    }

    public Team addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.setTeam(this);
        return this;
    }

    public Team removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.setTeam(null);
        return this;
    }

    public Set<AssignTask> getAssignTasks() {
        return this.assignTasks;
    }

    public void setAssignTasks(Set<AssignTask> assignTasks) {
        if (this.assignTasks != null) {
            this.assignTasks.forEach(i -> i.setTeam(null));
        }
        if (assignTasks != null) {
            assignTasks.forEach(i -> i.setTeam(this));
        }
        this.assignTasks = assignTasks;
    }

    public Team assignTasks(Set<AssignTask> assignTasks) {
        this.setAssignTasks(assignTasks);
        return this;
    }

    public Team addAssignTask(AssignTask assignTask) {
        this.assignTasks.add(assignTask);
        assignTask.setTeam(this);
        return this;
    }

    public Team removeAssignTask(AssignTask assignTask) {
        this.assignTasks.remove(assignTask);
        assignTask.setTeam(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Team)) {
            return false;
        }
        return id != null && id.equals(((Team) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", teamName='" + getTeamName() + "'" +
            ", description='" + getDescription() + "'" +
            ", managerialId=" + getManagerialId() +
            ", isCreator='" + getIsCreator() + "'" +
            "}";
    }
}
