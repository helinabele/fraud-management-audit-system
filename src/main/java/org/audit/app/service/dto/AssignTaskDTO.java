package org.audit.app.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link org.audit.app.domain.AssignTask} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AssignTaskDTO implements Serializable {

    private String id;

    private Instant taskAssignmentDate;

    private Instant taskStartDate;

    private Instant taskEndDate;

    private byte[] attachment;

    private String attachmentContentType;
    private String description;

    private DirectorDTO director;

    private ManagerialDTO manager;

    private TeamLeadDTO teamLead;

    private EmployeeDTO employee;

    private TaskDTO task;

    private TeamDTO team;

    private WhistleBlowerReportDTO whistleBlowerReport;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getTaskAssignmentDate() {
        return taskAssignmentDate;
    }

    public void setTaskAssignmentDate(Instant taskAssignmentDate) {
        this.taskAssignmentDate = taskAssignmentDate;
    }

    public Instant getTaskStartDate() {
        return taskStartDate;
    }

    public void setTaskStartDate(Instant taskStartDate) {
        this.taskStartDate = taskStartDate;
    }

    public Instant getTaskEndDate() {
        return taskEndDate;
    }

    public void setTaskEndDate(Instant taskEndDate) {
        this.taskEndDate = taskEndDate;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return attachmentContentType;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DirectorDTO getDirector() {
        return director;
    }

    public void setDirector(DirectorDTO director) {
        this.director = director;
    }

    public ManagerialDTO getManager() {
        return manager;
    }

    public void setManager(ManagerialDTO manager) {
        this.manager = manager;
    }

    public TeamLeadDTO getTeamLead() {
        return teamLead;
    }

    public void setTeamLead(TeamLeadDTO teamLead) {
        this.teamLead = teamLead;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    public TaskDTO getTask() {
        return task;
    }

    public void setTask(TaskDTO task) {
        this.task = task;
    }

    public TeamDTO getTeam() {
        return team;
    }

    public void setTeam(TeamDTO team) {
        this.team = team;
    }

    public WhistleBlowerReportDTO getWhistleBlowerReport() {
        return whistleBlowerReport;
    }

    public void setWhistleBlowerReport(WhistleBlowerReportDTO whistleBlowerReport) {
        this.whistleBlowerReport = whistleBlowerReport;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AssignTaskDTO)) {
            return false;
        }

        AssignTaskDTO assignTaskDTO = (AssignTaskDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, assignTaskDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AssignTaskDTO{" +
            "id='" + getId() + "'" +
            ", taskAssignmentDate='" + getTaskAssignmentDate() + "'" +
            ", taskStartDate='" + getTaskStartDate() + "'" +
            ", taskEndDate='" + getTaskEndDate() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", description='" + getDescription() + "'" +
            ", director=" + getDirector() +
            ", manager=" + getManager() +
            ", teamLead=" + getTeamLead() +
            ", employee=" + getEmployee() +
            ", task=" + getTask() +
            ", team=" + getTeam() +
            ", team=" + getWhistleBlowerReport() +
            "}";
    }

}
