package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link org.audit.app.domain.InternalEmployee} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InternalEmployeeDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    @NotNull
    private String position;

    private String grade;

    private String experience;

    private String branch;

    private JobGradeDTO jobGrade;

    public JobGradeDTO getJobGrade() {
        return jobGrade;
    }

    public void setJobGrade(JobGradeDTO jobGrade) {
        this.jobGrade = jobGrade;
    }

    private JobTitleDTO jobTitle;
    
    public JobTitleDTO getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(JobTitleDTO jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InternalEmployeeDTO)) {
            return false;
        }

        InternalEmployeeDTO internalEmployeeDTO = (InternalEmployeeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, internalEmployeeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InternalEmployeeDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", position='" + getPosition() + "'" +
            ", grade='" + getGrade() + "'" +
            ", experience='" + getExperience() + "'" +
            ", branch='" + getBranch() + "'" +
            ", jobGrade='" + getJobGrade() + "'" +
            ", jobTitle='" + getJobTitle() + "'" +
            "}";
    }
}
