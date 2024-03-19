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
 * A Department.
 */
@Document(collection = "department")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("department_name")
    private String departmentName;

    @Field("description")
    private String description;

    @DBRef
    @Field("division")
    @JsonIgnoreProperties(value = { "departments", "branches", "whistleBlowerReports" }, allowSetters = true)
    private Division division;

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

    public Department id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public Department departmentName(String departmentName) {
        this.setDepartmentName(departmentName);
        return this;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDescription() {
        return this.description;
    }

    public Department description(String description) {
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

    public Department division(Division division) {
        this.setDivision(division);
        return this;
    }

    public Set<Branch> getBranches() {
        return this.branches;
    }

    public void setBranches(Set<Branch> branches) {
        if (this.branches != null) {
            this.branches.forEach(i -> i.setDepartment(null));
        }
        if (branches != null) {
            branches.forEach(i -> i.setDepartment(this));
        }
        this.branches = branches;
    }

    public Department branches(Set<Branch> branches) {
        this.setBranches(branches);
        return this;
    }

    public Department addBranch(Branch branch) {
        this.branches.add(branch);
        branch.setDepartment(this);
        return this;
    }

    public Department removeBranch(Branch branch) {
        this.branches.remove(branch);
        branch.setDepartment(null);
        return this;
    }

    public Set<WhistleBlowerReport> getWhistleBlowerReports() {
        return this.whistleBlowerReports;
    }

    public void setWhistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        if (this.whistleBlowerReports != null) {
            this.whistleBlowerReports.forEach(i -> i.setDepartment(null));
        }
        if (whistleBlowerReports != null) {
            whistleBlowerReports.forEach(i -> i.setDepartment(this));
        }
        this.whistleBlowerReports = whistleBlowerReports;
    }

    public Department whistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        this.setWhistleBlowerReports(whistleBlowerReports);
        return this;
    }

    public Department addWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.add(whistleBlowerReport);
        whistleBlowerReport.setDepartment(this);
        return this;
    }

    public Department removeWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.remove(whistleBlowerReport);
        whistleBlowerReport.setDepartment(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Department)) {
            return false;
        }
        return id != null && id.equals(((Department) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Department{" +
            "id=" + getId() +
            ", departmentName='" + getDepartmentName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
