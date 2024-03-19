package org.audit.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Branch.
 */
@Document(collection = "branch")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Branch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("branch_name")
    private String branchName;

    @Field("description")
    private String description;

    @DBRef
    @Field("division")
    @JsonIgnoreProperties(value = { "departments", "branches", "whistleBlowerReports" }, allowSetters = true)
    private Division division;

    @DBRef
    @Field("department")
    @JsonIgnoreProperties(value = { "division", "branches", "whistleBlowerReports" }, allowSetters = true)
    private Department department;

    @DBRef
    @Field("whistleBlowerReport")
    @JsonIgnoreProperties(value = { "division", "department", "branch", "region", "city", "subCity" }, allowSetters = true)
    private Set<WhistleBlowerReport> whistleBlowerReports = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Branch id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBranchName() {
        return this.branchName;
    }

    public Branch branchName(String branchName) {
        this.setBranchName(branchName);
        return this;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getDescription() {
        return this.description;
    }

    public Branch description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Division getDivision() {
        return this.division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public Branch division(Division division) {
        this.setDivision(division);
        return this;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Branch department(Department department) {
        this.setDepartment(department);
        return this;
    }

    public Set<WhistleBlowerReport> getWhistleBlowerReports() {
        return this.whistleBlowerReports;
    }

    public void setWhistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        if (this.whistleBlowerReports != null) {
            this.whistleBlowerReports.forEach(i -> i.setBranch(null));
        }
        if (whistleBlowerReports != null) {
            whistleBlowerReports.forEach(i -> i.setBranch(this));
        }
        this.whistleBlowerReports = whistleBlowerReports;
    }

    public Branch whistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        this.setWhistleBlowerReports(whistleBlowerReports);
        return this;
    }

    public Branch addWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.add(whistleBlowerReport);
        whistleBlowerReport.setBranch(this);
        return this;
    }

    public Branch removeWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.remove(whistleBlowerReport);
        whistleBlowerReport.setBranch(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Branch)) {
            return false;
        }
        return id != null && id.equals(((Branch) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Branch{" +
            "id=" + getId() +
            ", branchName='" + getBranchName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
