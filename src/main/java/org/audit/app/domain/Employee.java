package org.audit.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.validation.constraints.*;
import org.audit.app.domain.enumeration.Gender;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Employee.
 */
@Document(collection = "employee")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("employee_code")
    private String employeeCode;

    @NotNull
    @Field("name")
    private String name;

    @Field("gender_type")
    private Gender genderType;

    @Field("date_of_birth")
    private Instant dateOfBirth;

    @Field("age")
    private Integer age;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Field("email")
    private String email;

    @Field("employee_picture")
    private byte[] employeePicture;

    @Field("employee_picture_content_type")
    private String employeePictureContentType;

    @DBRef
    @Field("user")
    private User user;

    @DBRef
    @Field("director")
    @JsonIgnoreProperties(value = { "user", "managers" }, allowSetters = true)
    private Director director;

    @DBRef
    @Field("manager")
    @JsonIgnoreProperties(value = { "user", "directors" }, allowSetters = true)
    private Managerial manager;

    @DBRef
    @Field("teamLead")
    @JsonIgnoreProperties(value = { "user", "managers" }, allowSetters = true)
    private TeamLead teamLead;

    @DBRef
    @Field("team")
    @JsonIgnoreProperties(value = { "teamLead", "managers", "employee", "assignTasks" }, allowSetters = true)
    private Team team;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Employee id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeCode() {
        return this.employeeCode;
    }

    public Employee employeeCode(String employeeCode) {
        this.setEmployeeCode(employeeCode);
        return this;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getName() {
        return this.name;
    }

    public Employee name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gender getGenderType() {
        return this.genderType;
    }

    public Employee genderType(Gender genderType) {
        this.setGenderType(genderType);
        return this;
    }

    public void setGenderType(Gender genderType) {
        this.genderType = genderType;
    }

    public Instant getDateOfBirth() {
        return this.dateOfBirth;
    }

    public Employee dateOfBirth(Instant dateOfBirth) {
        this.setDateOfBirth(dateOfBirth);
        return this;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getAge() {
        return this.age;
    }

    public Employee age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return this.email;
    }

    public Employee email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getEmployeePicture() {
        return this.employeePicture;
    }

    public Employee employeePicture(byte[] employeePicture) {
        this.setEmployeePicture(employeePicture);
        return this;
    }

    public void setEmployeePicture(byte[] employeePicture) {
        this.employeePicture = employeePicture;
    }

    public String getEmployeePictureContentType() {
        return this.employeePictureContentType;
    }

    public Employee employeePictureContentType(String employeePictureContentType) {
        this.employeePictureContentType = employeePictureContentType;
        return this;
    }

    public void setEmployeePictureContentType(String employeePictureContentType) {
        this.employeePictureContentType = employeePictureContentType;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Employee user(User user) {
        this.setUser(user);
        return this;
    }

    public Director getDirector() {
        return this.director;
    }

    public void setDirector(Director director) {
        this.director = director;
    }

    public Employee director(Director director) {
        this.setDirector(director);
        return this;
    }

    public Managerial getManager() {
        return this.manager;
    }

    public void setManager(Managerial managerial) {
        this.manager = managerial;
    }

    public Employee manager(Managerial managerial) {
        this.setManager(managerial);
        return this;
    }

    public TeamLead getTeamLead() {
        return this.teamLead;
    }

    public void setTeamLead(TeamLead teamLead) {
        this.teamLead = teamLead;
    }

    public Employee teamLead(TeamLead teamLead) {
        this.setTeamLead(teamLead);
        return this;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Employee team(Team team) {
        this.setTeam(team);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", employeeCode='" + getEmployeeCode() + "'" +
            ", name='" + getName() + "'" +
            ", genderType='" + getGenderType() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", age=" + getAge() +
            ", email='" + getEmail() + "'" +
            ", employeePicture='" + getEmployeePicture() + "'" +
            ", employeePictureContentType='" + getEmployeePictureContentType() + "'" +
            "}";
    }
}
