package org.audit.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import org.audit.app.domain.enumeration.Gender;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A WhistleBlowerReport.
 */
@Document(collection = "whistle_blower_report")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WhistleBlowerReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("full_name")
    private String fullName;

    @Field("gender_type")
    private Gender genderType;

    @Field("email_adress")
    private String emailAdress;

    @Field("phone")
    private Integer phone;

    @Field("organization")
    private String organization;

    @Field("message")
    private String message;

    @Field("attachment")
    private byte[] attachment;

    @Field("attachment_content_type")
    private String attachmentContentType;

    @Field("position")
    private String position;

    @Field("zone")
    private String zone;

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
    @Field("branch")
    @JsonIgnoreProperties(value = { "division", "department", "whistleBlowerReports" }, allowSetters = true)
    private Branch branch;

    @DBRef
    @Field("region")
    @JsonIgnoreProperties(value = { "cities", "whistleBlowerReports" }, allowSetters = true)
    private Region region;

    @DBRef
    @Field("city")
    @JsonIgnoreProperties(value = { "region", "subCities", "whistleBlowerReports" }, allowSetters = true)
    private City city;

    @DBRef
    @Field("subCity")
    @JsonIgnoreProperties(value = { "city", "whistleBlowerReports" }, allowSetters = true)
    private SubCity subCity;

    @Field("reportStatus")
    private ReportStatus reportStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ReportStatus getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(ReportStatus reportStatus) {
        this.reportStatus = reportStatus;
    }

    public WhistleBlowerReport id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return this.fullName;
    }

    public WhistleBlowerReport fullName(String fullName) {
        this.setFullName(fullName);
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Gender getGenderType() {
        return this.genderType;
    }

    public WhistleBlowerReport genderType(Gender genderType) {
        this.setGenderType(genderType);
        return this;
    }

    public void setGenderType(Gender genderType) {
        this.genderType = genderType;
    }

    public String getEmailAdress() {
        return this.emailAdress;
    }

    public WhistleBlowerReport emailAdress(String emailAdress) {
        this.setEmailAdress(emailAdress);
        return this;
    }

    public void setEmailAdress(String emailAdress) {
        this.emailAdress = emailAdress;
    }

    public Integer getPhone() {
        return this.phone;
    }

    public WhistleBlowerReport phone(Integer phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getOrganization() {
        return this.organization;
    }

    public WhistleBlowerReport organization(String organization) {
        this.setOrganization(organization);
        return this;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getMessage() {
        return this.message;
    }

    public WhistleBlowerReport message(String message) {
        this.setMessage(message);
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getAttachment() {
        return this.attachment;
    }

    public WhistleBlowerReport attachment(byte[] attachment) {
        this.setAttachment(attachment);
        return this;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return this.attachmentContentType;
    }

    public WhistleBlowerReport attachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
        return this;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getPosition() {
        return this.position;
    }

    public WhistleBlowerReport position(String position) {
        this.setPosition(position);
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getZone() {
        return this.zone;
    }

    public WhistleBlowerReport zone(String zone) {
        this.setZone(zone);
        return this;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public String getDescription() {
        return this.description;
    }

    public WhistleBlowerReport description(String description) {
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

    public WhistleBlowerReport division(Division division) {
        this.setDivision(division);
        return this;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public WhistleBlowerReport department(Department department) {
        this.setDepartment(department);
        return this;
    }

    public Branch getBranch() {
        return this.branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public WhistleBlowerReport branch(Branch branch) {
        this.setBranch(branch);
        return this;
    }

    public Region getRegion() {
        return this.region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public WhistleBlowerReport region(Region region) {
        this.setRegion(region);
        return this;
    }

    public City getCity() {
        return this.city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public WhistleBlowerReport city(City city) {
        this.setCity(city);
        return this;
    }

    public SubCity getSubCity() {
        return this.subCity;
    }

    public void setSubCity(SubCity subCity) {
        this.subCity = subCity;
    }

    public WhistleBlowerReport subCity(SubCity subCity) {
        this.setSubCity(subCity);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WhistleBlowerReport)) {
            return false;
        }
        return id != null && id.equals(((WhistleBlowerReport) o).id);
    }

    @Override
    public int hashCode() {
        // see
        // https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WhistleBlowerReport{" +
                "id=" + getId() +
                ", fullName='" + getFullName() + "'" +
                ", genderType='" + getGenderType() + "'" +
                ", emailAdress='" + getEmailAdress() + "'" +
                ", phone=" + getPhone() +
                ", organization='" + getOrganization() + "'" +
                ", message='" + getMessage() + "'" +
                ", attachment='" + getAttachment() + "'" +
                ", attachmentContentType='" + getAttachmentContentType() + "'" +
                ", position='" + getPosition() + "'" +
                ", zone='" + getZone() + "'" +
                ", description='" + getDescription() + "'" +
                ", reportStatus='" + getReportStatus() + "'" +
                "}";
    }
}
