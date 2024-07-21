package org.audit.app.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;
import org.audit.app.domain.enumeration.Gender;

/**
 * A DTO for the {@link org.audit.app.domain.Employee} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmployeeDTO implements Serializable {
    private String id;

    private String employeeCode;

    @NotNull
    private String name;

    private Gender genderType;

    private Instant dateOfBirth;

    private Integer age;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    private String email;

    private byte[] employeePicture;

    private String employeePictureContentType;
    private UserDTO user;

    private DirectorDTO director;

    private ManagerialDTO manager;

    private TeamLeadDTO teamLead;

    public EmployeeDTO() {
        // default constructor
    }
    
    public EmployeeDTO(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gender getGenderType() {
        return genderType;
    }

    public void setGenderType(Gender genderType) {
        this.genderType = genderType;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getEmployeePicture() {
        return employeePicture;
    }

    public void setEmployeePicture(byte[] employeePicture) {
        this.employeePicture = employeePicture;
    }

    public String getEmployeePictureContentType() {
        return employeePictureContentType;
    }

    public void setEmployeePictureContentType(String employeePictureContentType) {
        this.employeePictureContentType = employeePictureContentType;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public DirectorDTO getDirector() {
        return director;
    }

    public void setDirector(DirectorDTO director) {
        this.director = director;
    }

    public ManagerialDTO getManager() {
        return manager;
    }

    public void setManager(ManagerialDTO manager) {
        this.manager = manager;
    }

    public TeamLeadDTO getTeamLead() {
        return teamLead;
    }

    public void setTeamLead(TeamLeadDTO teamLead) {
        this.teamLead = teamLead;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeDTO)) {
            return false;
        }

        EmployeeDTO employeeDTO = (EmployeeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, employeeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeDTO{" +
            "id='" + getId() + "'" +
            ", employeeCode='" + getEmployeeCode() + "'" +
            ", name='" + getName() + "'" +
            ", genderType='" + getGenderType() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", age=" + getAge() +
            ", email='" + getEmail() + "'" +
            ", employeePicture='" + getEmployeePicture() + "'" +
            ", user=" + getUser() +
            ", director=" + getDirector() +
            ", manager=" + getManager() +
            ", teamLead=" + getTeamLead() +
            "}";
    }
}
