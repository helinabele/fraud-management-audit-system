package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link org.audit.app.domain.SubCity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SubCityDTO implements Serializable {

    private String id;

    @NotNull
    private String subCityName;

    private String description;

    private CityDTO city;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubCityName() {
        return subCityName;
    }

    public void setSubCityName(String subCityName) {
        this.subCityName = subCityName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CityDTO getCity() {
        return city;
    }

    public void setCity(CityDTO city) {
        this.city = city;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubCityDTO)) {
            return false;
        }

        SubCityDTO subCityDTO = (SubCityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, subCityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubCityDTO{" +
            "id='" + getId() + "'" +
            ", subCityName='" + getSubCityName() + "'" +
            ", description='" + getDescription() + "'" +
            ", city=" + getCity() +
            "}";
    }
}
