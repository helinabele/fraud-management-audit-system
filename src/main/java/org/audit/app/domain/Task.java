package org.audit.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;

import org.audit.app.domain.enumeration.ReportStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Task.
 */
@Document(collection = "task")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("title")
    private String title;

    @Field("description")
    private String description;

    @Field("due_date")
    private LocalDate dueDate;

    @Field("attachment")
    private byte[] attachment;

    @Field("attachment_content_type")
    private String attachmentContentType;

    @Field("status")
    private ReportStatus status;

    @DBRef
    @Field("assignedTask")
    @JsonIgnoreProperties(value = { "director", "manager", "teamLead", "employee", "task", "team" }, allowSetters = true)
    private Set<AssignTask> assignedTasks = new HashSet<>();

    @Field("whistleBlower")
    private Set<AssignTask> whistleBlower = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Task id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Task title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public Task description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return this.dueDate;
    }

    public Task dueDate(LocalDate dueDate) {
        this.setDueDate(dueDate);
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public byte[] getAttachment() {
        return this.attachment;
    }

    public Task attachment(byte[] attachment) {
        this.setAttachment(attachment);
        return this;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return this.attachmentContentType;
    }

    public Task attachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
        return this;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public ReportStatus getStatus() {
        return this.status;
    }

    public Task status(ReportStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(ReportStatus status) {
        this.status = status;
    }

    public Set<AssignTask> getAssignedTasks() {
        return this.assignedTasks;
    }

    public void setAssignedTasks(Set<AssignTask> assignTasks) {
        if (this.assignedTasks != null) {
            this.assignedTasks.forEach(i -> i.setTask(null));
        }
        if (assignTasks != null) {
            assignTasks.forEach(i -> i.setTask(this));
        }
        this.assignedTasks = assignTasks;
    }

    public Task assignedTasks(Set<AssignTask> assignTasks) {
        this.setAssignedTasks(assignTasks);
        return this;
    }

    public Task addAssignedTask(AssignTask assignTask) {
        this.assignedTasks.add(assignTask);
        assignTask.setTask(this);
        return this;
    }

    public Task removeAssignedTask(AssignTask assignTask) {
        this.assignedTasks.remove(assignTask);
        assignTask.setTask(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", attachmentContentType='" + getAttachmentContentType() + "'" +
            ", status='" + getStatus() + "'" +
            ", whistleBlower='" + getWhistleBlower() + "'" +
            "}";
    }

    public Set<AssignTask> getWhistleBlower() {
        return whistleBlower;
    }

    public void setWhistleBlower(Set<AssignTask> whistleBlower) {
        this.whistleBlower = whistleBlower;
    }
}
