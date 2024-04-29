package org.audit.app.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A JobGrade.
 */
@Document(collection = "job_grade")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class JobGrade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("job_grade_name")
    private String jobGradeName;

    @Field("description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public JobGrade id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJobGradeName() {
        return this.jobGradeName;
    }

    public JobGrade jobGradeName(String jobGradeName) {
        this.setJobGradeName(jobGradeName);
        return this;
    }

    public void setJobGradeName(String jobGradeName) {
        this.jobGradeName = jobGradeName;
    }

    public String getDescription() {
        return this.description;
    }

    public JobGrade description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof JobGrade)) {
            return false;
        }
        return id != null && id.equals(((JobGrade) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobGrade{" +
            "id=" + getId() +
            ", jobGradeName='" + getJobGradeName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
