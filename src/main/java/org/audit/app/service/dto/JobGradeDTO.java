package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link org.audit.app.domain.JobGrade} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class JobGradeDTO implements Serializable {

    private String id;

    @NotNull
    private String jobGradeName;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJobGradeName() {
        return jobGradeName;
    }

    public void setJobGradeName(String jobGradeName) {
        this.jobGradeName = jobGradeName;
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
        if (!(o instanceof JobGradeDTO)) {
            return false;
        }

        JobGradeDTO jobGradeDTO = (JobGradeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, jobGradeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobGradeDTO{" +
            "id='" + getId() + "'" +
            ", jobGradeName='" + getJobGradeName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
