package org.audit.app.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A JobTitle.
 */
@Document(collection = "job_title")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class JobTitle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("job_title_name")
    private String jobTitleName;

    @Field("description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public JobTitle id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJobTitleName() {
        return this.jobTitleName;
    }

    public JobTitle jobTitleName(String jobTitleName) {
        this.setJobTitleName(jobTitleName);
        return this;
    }

    public void setJobTitleName(String jobTitleName) {
        this.jobTitleName = jobTitleName;
    }

    public String getDescription() {
        return this.description;
    }

    public JobTitle description(String description) {
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
        if (!(o instanceof JobTitle)) {
            return false;
        }
        return id != null && id.equals(((JobTitle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobTitle{" +
            "id=" + getId() +
            ", jobTitleName='" + getJobTitleName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
