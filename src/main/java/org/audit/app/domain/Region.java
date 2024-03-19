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
 * A Region.
 */
@Document(collection = "region")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Region implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("region_name")
    private String regionName;

    @Field("description")
    private String description;

    @DBRef
    @Field("city")
    @JsonIgnoreProperties(value = { "region", "subCities", "whistleBlowerReports" }, allowSetters = true)
    private Set<City> cities = new HashSet<>();

    @DBRef
    @Field("whistleBlowerReport")
    @JsonIgnoreProperties(value = { "division", "department", "branch", "region", "city", "subCity" }, allowSetters = true)
    private Set<WhistleBlowerReport> whistleBlowerReports = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Region id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRegionName() {
        return this.regionName;
    }

    public Region regionName(String regionName) {
        this.setRegionName(regionName);
        return this;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getDescription() {
        return this.description;
    }

    public Region description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<City> getCities() {
        return this.cities;
    }

    public void setCities(Set<City> cities) {
        if (this.cities != null) {
            this.cities.forEach(i -> i.setRegion(null));
        }
        if (cities != null) {
            cities.forEach(i -> i.setRegion(this));
        }
        this.cities = cities;
    }

    public Region cities(Set<City> cities) {
        this.setCities(cities);
        return this;
    }

    public Region addCity(City city) {
        this.cities.add(city);
        city.setRegion(this);
        return this;
    }

    public Region removeCity(City city) {
        this.cities.remove(city);
        city.setRegion(null);
        return this;
    }

    public Set<WhistleBlowerReport> getWhistleBlowerReports() {
        return this.whistleBlowerReports;
    }

    public void setWhistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        if (this.whistleBlowerReports != null) {
            this.whistleBlowerReports.forEach(i -> i.setRegion(null));
        }
        if (whistleBlowerReports != null) {
            whistleBlowerReports.forEach(i -> i.setRegion(this));
        }
        this.whistleBlowerReports = whistleBlowerReports;
    }

    public Region whistleBlowerReports(Set<WhistleBlowerReport> whistleBlowerReports) {
        this.setWhistleBlowerReports(whistleBlowerReports);
        return this;
    }

    public Region addWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.add(whistleBlowerReport);
        whistleBlowerReport.setRegion(this);
        return this;
    }

    public Region removeWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReports.remove(whistleBlowerReport);
        whistleBlowerReport.setRegion(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Region)) {
            return false;
        }
        return id != null && id.equals(((Region) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Region{" +
            "id=" + getId() +
            ", regionName='" + getRegionName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
