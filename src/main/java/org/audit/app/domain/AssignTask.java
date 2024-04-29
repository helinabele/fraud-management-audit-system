package org.audit.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A AssignTask.
 */
@Document(collection = "assign_task")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AssignTask implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("task_assignment_date")
    private Instant taskAssignmentDate;

    @Field("task_start_date")
    private Instant taskStartDate;

    @Field("task_end_date")
    private Instant taskEndDate;

    @Field("attachment")
    private byte[] attachment;

    @Field("attachment_content_type")
    private String attachmentContentType;

    @Field("description")
    private String description;

    @DBRef
    @Field("director")
    @JsonIgnoreProperties(value = { "user", "managers" }, allowSetters = true)
    private Director director;

    @DBRef
    @Field("manager")
    @JsonIgnoreProperties(value = { "user", "directors" }, allowSetters = true)
    private Managerial manager;

    @DBRef
    @Field("teamLead")
    @JsonIgnoreProperties(value = { "user", "managers" }, allowSetters = true)
    private TeamLead teamLead;

    @DBRef
    @Field("employee")
    @JsonIgnoreProperties(value = { "user", "director", "manager", "teamLead", "team" }, allowSetters = true)
    private Employee employee;

    @DBRef
    @Field("task")
    @JsonIgnoreProperties(value = { "assignedTasks" }, allowSetters = true)
    private Task task;

    @DBRef
    @Field("team")
    @JsonIgnoreProperties(value = { "teamLead", "managers", "employee", "assignTasks" }, allowSetters = true)
    private Team team;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public AssignTask id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getTaskAssignmentDate() {
        return this.taskAssignmentDate;
    }

    public AssignTask taskAssignmentDate(Instant taskAssignmentDate) {
        this.setTaskAssignmentDate(taskAssignmentDate);
        return this;
    }

    public void setTaskAssignmentDate(Instant taskAssignmentDate) {
        this.taskAssignmentDate = taskAssignmentDate;
    }

    public Instant getTaskStartDate() {
        return this.taskStartDate;
    }

    public AssignTask taskStartDate(Instant taskStartDate) {
        this.setTaskStartDate(taskStartDate);
        return this;
    }

    public void setTaskStartDate(Instant taskStartDate) {
        this.taskStartDate = taskStartDate;
    }

    public Instant getTaskEndDate() {
        return this.taskEndDate;
    }

    public AssignTask taskEndDate(Instant taskEndDate) {
        this.setTaskEndDate(taskEndDate);
        return this;
    }

    public void setTaskEndDate(Instant taskEndDate) {
        this.taskEndDate = taskEndDate;
    }

    public byte[] getAttachment() {
        return this.attachment;
    }

    public AssignTask attachment(byte[] attachment) {
        this.setAttachment(attachment);
        return this;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return this.attachmentContentType;
    }

    public AssignTask attachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
        return this;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getDescription() {
        return this.description;
    }

    public AssignTask description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Director getDirector() {
        return this.director;
    }

    public void setDirector(Director director) {
        this.director = director;
    }

    public AssignTask director(Director director) {
        this.setDirector(director);
        return this;
    }

    public Managerial getManager() {
        return this.manager;
    }

    public void setManager(Managerial managerial) {
        this.manager = managerial;
    }

    public AssignTask manager(Managerial managerial) {
        this.setManager(managerial);
        return this;
    }

    public TeamLead getTeamLead() {
        return this.teamLead;
    }

    public void setTeamLead(TeamLead teamLead) {
        this.teamLead = teamLead;
    }

    public AssignTask teamLead(TeamLead teamLead) {
        this.setTeamLead(teamLead);
        return this;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public AssignTask employee(Employee employee) {
        this.setEmployee(employee);
        return this;
    }

    public Task getTask() {
        return this.task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public AssignTask task(Task task) {
        this.setTask(task);
        return this;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public AssignTask team(Team team) {
        this.setTeam(team);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AssignTask)) {
            return false;
        }
        return id != null && id.equals(((AssignTask) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AssignTask{" +
            "id=" + getId() +
            ", taskAssignmentDate='" + getTaskAssignmentDate() + "'" +
            ", taskStartDate='" + getTaskStartDate() + "'" +
            ", taskEndDate='" + getTaskEndDate() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", attachmentContentType='" + getAttachmentContentType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
