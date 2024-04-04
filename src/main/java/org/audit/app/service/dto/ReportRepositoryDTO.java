package org.audit.app.service.dto;

import java.util.Objects;

/**
 * A DTO for the {@link org.audit.app.domain.ReportRepository} entity.
 */

@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReportRepositoryDTO {
    private String id;
    private String reportRepositoryName;
    private byte[] attachment;
    private String attachmentContentType;
    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReportRepositoryName() {
        return reportRepositoryName;
    }

    public void setReportRepositoryName(String reportRepositoryName) {
        this.reportRepositoryName = reportRepositoryName;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReportRepositoryDTO)) {
            return false;
        }
        ReportRepositoryDTO reportRepositoryDTO = (ReportRepositoryDTO) o;
        if ((this.id == null)) {
            return false;
        }
        return Objects.equals(this.id, reportRepositoryDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return "ReportRepositoryDTO{" +
                "id=" + getId() + "'" +
                ", reportRepositoryName='" + getReportRepositoryName() + "'" +
                ", attachment='" + getAttachment() + "'" +
                ", description=" + getDescription() +
                "}";
    }
}