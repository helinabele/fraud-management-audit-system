package org.audit.app.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A InternalEmployee.
 */
@Document(collection = "internal_employee")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class InternalEmployee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("position")
    private String position;

    @Field("grade")
    private String grade;

    @Field("experience")
    private String experience;

    @Field("branch")
    private String branch;

    @Field("job_grade")
    private JobGrade jobGrade;

    @Field("job_title")
    private JobTitle jobTitle;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public InternalEmployee id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public InternalEmployee name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return this.position;
    }

    public InternalEmployee position(String position) {
        this.setPosition(position);
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getGrade() {
        return this.grade;
    }

    public InternalEmployee grade(String grade) {
        this.setGrade(grade);
        return this;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getExperience() {
        return this.experience;
    }

    public InternalEmployee experience(String experience) {
        this.setExperience(experience);
        return this;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getBranch() {
        return this.branch;
    }

    public InternalEmployee branch(String branch) {
        this.setBranch(branch);
        return this;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public JobGrade getJobGrade() {
        return this.jobGrade;
    }

    public void setRegion(JobGrade jobGrade) {
        this.jobGrade = jobGrade;
    }

    public InternalEmployee jobGrade(JobGrade jobGrade) {
        this.setRegion(jobGrade);
        return this;
    }

    public JobTitle getJobTitle() {
        return this.jobTitle;
    }

    public void setRegion(JobTitle jobTitle) {
        this.jobTitle = jobTitle;
    }

    public InternalEmployee jobTitle(JobTitle jobTitle) {
        this.setRegion(jobTitle);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InternalEmployee)) {
            return false;
        }
        return id != null && id.equals(((InternalEmployee) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InternalEmployee{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", position='" + getPosition() + "'" +
            ", grade='" + getGrade() + "'" +
            ", experience='" + getExperience() + "'" +
            ", branch='" + getBranch() + "'" +
            "}";
    }
}
