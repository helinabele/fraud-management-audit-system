package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import org.audit.app.domain.enumeration.Gender;
import org.audit.app.service.impl.ReportStatus;

/**
 * A DTO for the {@link org.audit.app.domain.WhistleBlowerReport} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WhistleBlowerReportDTO implements Serializable {

    private String id;

    private String fullName;

    private Gender genderType;

    private String emailAdress;

    private Integer phone;

    private String organization;

    private String message;

    private byte[] attachment;

    private String attachmentContentType;
    private String position;

    private String zone;

    private String description;

    private DivisionDTO division;

    private DepartmentDTO department;

    private BranchDTO branch;

    private RegionDTO region;

    private CityDTO city;

    private SubCityDTO subCity;

    private ReportStatus reportStatus;

    public ReportStatus getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(ReportStatus reportStatus) {
        this.reportStatus = reportStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Gender getGenderType() {
        return genderType;
    }

    public void setGenderType(Gender genderType) {
        this.genderType = genderType;
    }

    public String getEmailAdress() {
        return emailAdress;
    }

    public void setEmailAdress(String emailAdress) {
        this.emailAdress = emailAdress;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return attachmentContentType;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DivisionDTO getDivision() {
        return division;
    }

    public void setDivision(DivisionDTO division) {
        this.division = division;
    }

    public DepartmentDTO getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentDTO department) {
        this.department = department;
    }

    public BranchDTO getBranch() {
        return branch;
    }

    public void setBranch(BranchDTO branch) {
        this.branch = branch;
    }

    public RegionDTO getRegion() {
        return region;
    }

    public void setRegion(RegionDTO region) {
        this.region = region;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city;
    }

    public SubCityDTO getSubCity() {
        return subCity;
    }

    public void setSubCity(SubCityDTO subCity) {
        this.subCity = subCity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WhistleBlowerReportDTO)) {
            return false;
        }

        WhistleBlowerReportDTO whistleBlowerReportDTO = (WhistleBlowerReportDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, whistleBlowerReportDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WhistleBlowerReportDTO{" +
            "id='" + getId() + "'" +
            ", fullName='" + getFullName() + "'" +
            ", genderType='" + getGenderType() + "'" +
            ", emailAdress='" + getEmailAdress() + "'" +
            ", phone=" + getPhone() +
            ", organization='" + getOrganization() + "'" +
            ", message='" + getMessage() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", position='" + getPosition() + "'" +
            ", zone='" + getZone() + "'" +
            ", description='" + getDescription() + "'" +
            ", division=" + getDivision() +
            ", department=" + getDepartment() +
            ", branch=" + getBranch() +
            ", region=" + getRegion() +
            ", city=" + getCity() +
            ", subCity=" + getSubCity() +
            ", reportStatus=" + getReportStatus() +
            "}";
    }
}
