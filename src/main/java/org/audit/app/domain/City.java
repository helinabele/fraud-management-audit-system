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
 * A City.
 */
@Document(collection = "city")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class City implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("city_name")
    private String cityName;

    @Field("description")
    private String description;

    @DBRef
    @Field("region")
    @JsonIgnoreProperties(value = { "cities", "whistleBlowerReports" }, allowSetters = true)
    private Region region;

    @DBRef
    @Field("subCity")
    @JsonIgnoreProperties(value = { "city", "whistleBlowerReports" }, allowSetters = true)
    private Set<SubCity> subCities = new HashSet<>();

    @DBRef
    @Field("whistleBlowerReport")
    @JsonIgnoreProperties(value = { "division", "department", "branch", "region", "city", "subCity" }, allowSetters = true)
    private Set<WhistleBlowerReport> whistleBlowerReports = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public City id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCityName() {
        return this.cityName;
    }

    public City cityName(String cityName) {
        this.setCityName(cityName);
        return this;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getDescription() {
        return this.description;
    }

    public City description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Region getRegion() {
        return this.region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public City region(Region region) {
        this.setRegion(region);
        return this;
    }

    public Set<SubCity> getSubCities() {
        return this.subCities;
    }

    public void setSubCities(Set<SubCity> subCities) {
        if (this.subCities != null) {
            this.subCities.forEach(i -> i.setCity(null));
        }
        if (subCities != null) {
            subCities.forEach(i -> i.setCity(this));
        }
        this.subCities = subCities;
    }

    public City subCities(Set<SubCity> subCities) {
        this.setSubCities(subCities);
        return this;
    }

    public City addSubCity(SubCity subCity) {
        this.subCities.add(subCity);
        subCity.setCity(this);
        return this;
    }

    public City removeSubCity(SubCity subCity) {
        this.subCities.remove(subCity);
        subCity.setCity(null);
        return this;
    }

    public Set<WhistleBlowerReport> getWhistleBlowerReports() {
        return this.whistleBlowerReports;
    }

    public void setWhistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        if (this.whistleBlowerReports != null) {
            this.whistleBlowerReports.forEach(i -> i.setCity(null));
        }
        if (whistleBlowerReports != null) {
            whistleBlowerReports.forEach(i -> i.setCity(this));
        }
        this.whistleBlowerReports = whistleBlowerReports;
    }

    public City whistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        this.setWhistleBlowerReports(whistleBlowerReports);
        return this;
    }

    public City addWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.add(whistleBlowerReport);
        whistleBlowerReport.setCity(this);
        return this;
    }

    public City removeWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.remove(whistleBlowerReport);
        whistleBlowerReport.setCity(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof City)) {
            return false;
        }
        return id != null && id.equals(((City) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "City{" +
            "id=" + getId() +
            ", cityName='" + getCityName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
