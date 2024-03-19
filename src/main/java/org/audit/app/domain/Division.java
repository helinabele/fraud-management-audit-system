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
 * A Division.
 */
@Document(collection = "division")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Division implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("division_name")
    private String divisionName;

    @Field("description")
    private String description;

    @DBRef
    @Field("department")
    @JsonIgnoreProperties(value = { "division", "branches", "whistleBlowerReports" }, allowSetters = true)
    private Set<Department> departments = new HashSet<>();

    @DBRef
    @Field("branch")
    @JsonIgnoreProperties(value = { "division", "department", "whistleBlowerReports" }, allowSetters = true)
    private Set<Branch> branches = new HashSet<>();

    @DBRef
    @Field("whistleBlowerReport")
    @JsonIgnoreProperties(value = { "division", "department", "branch", "region", "city", "subCity" }, allowSetters = true)
    private Set<WhistleBlowerReport> whistleBlowerReports = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Division id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDivisionName() {
        return this.divisionName;
    }

    public Division divisionName(String divisionName) {
        this.setDivisionName(divisionName);
        return this;
    }

    public void setDivisionName(String divisionName) {
        this.divisionName = divisionName;
    }

    public String getDescription() {
        return this.description;
    }

    public Division description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Department> getDepartments() {
        return this.departments;
    }

    public void setDepartments(Set<Department> departments) {
        if (this.departments != null) {
            this.departments.forEach(i -> i.setDivision(null));
        }
        if (departments != null) {
            departments.forEach(i -> i.setDivision(this));
        }
        this.departments = departments;
    }

    public Division departments(Set<Department> departments) {
        this.setDepartments(departments);
        return this;
    }

    public Division addDepartment(Department department) {
        this.departments.add(department);
        department.setDivision(this);
        return this;
    }

    public Division removeDepartment(Department department) {
        this.departments.remove(department);
        department.setDivision(null);
        return this;
    }

    public Set<Branch> getBranches() {
        return this.branches;
    }

    public void setBranches(Set<Branch> branches) {
        if (this.branches != null) {
            this.branches.forEach(i -> i.setDivision(null));
        }
        if (branches != null) {
            branches.forEach(i -> i.setDivision(this));
        }
        this.branches = branches;
    }

    public Division branches(Set<Branch> branches) {
        this.setBranches(branches);
        return this;
    }

    public Division addBranch(Branch branch) {
        this.branches.add(branch);
        branch.setDivision(this);
        return this;
    }

    public Division removeBranch(Branch branch) {
        this.branches.remove(branch);
        branch.setDivision(null);
        return this;
    }

    public Set<WhistleBlowerReport> getWhistleBlowerReports() {
        return this.whistleBlowerReports;
    }

    public void setWhistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        if (this.whistleBlowerReports != null) {
            this.whistleBlowerReports.forEach(i -> i.setDivision(null));
        }
        if (whistleBlowerReports != null) {
            whistleBlowerReports.forEach(i -> i.setDivision(this));
        }
        this.whistleBlowerReports = whistleBlowerReports;
    }

    public Division whistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        this.setWhistleBlowerReports(whistleBlowerReports);
        return this;
    }

    public Division addWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.add(whistleBlowerReport);
        whistleBlowerReport.setDivision(this);
        return this;
    }

    public Division removeWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.remove(whistleBlowerReport);
        whistleBlowerReport.setDivision(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Division)) {
            return false;
        }
        return id != null && id.equals(((Division) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Division{" +
            "id=" + getId() +
            ", divisionName='" + getDivisionName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
