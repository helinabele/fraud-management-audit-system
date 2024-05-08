package org.audit.app.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;
import org.audit.app.domain.enumeration.StatusEnum;

/**
 * A DTO for the {@link org.audit.app.domain.Task} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskDTO implements Serializable {

    private String id;

    @NotNull
    private String title;

    private String description;

    private LocalDate dueDate;

    private byte[] attachment;

    private String attachmentContentType;
    private StatusEnum status;

    public TaskDTO() {
        // default constructor
    }
    
    public TaskDTO(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
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

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskDTO)) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, taskDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskDTO{" +
            "id='" + getId() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
