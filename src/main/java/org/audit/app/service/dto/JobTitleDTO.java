package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link org.audit.app.domain.JobTitle} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class JobTitleDTO implements Serializable {

    private String id;

    @NotNull
    private String jobTitleName;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJobTitleName() {
        return jobTitleName;
    }

    public void setJobTitleName(String jobTitleName) {
        this.jobTitleName = jobTitleName;
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
        if (!(o instanceof JobTitleDTO)) {
            return false;
        }

        JobTitleDTO jobTitleDTO = (JobTitleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, jobTitleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobTitleDTO{" +
            "id='" + getId() + "'" +
            ", jobTitleName='" + getJobTitleName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
