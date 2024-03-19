package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link org.audit.app.domain.Region} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RegionDTO implements Serializable {

    private String id;

    @NotNull
    private String regionName;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RegionDTO)) {
            return false;
        }

        RegionDTO regionDTO = (RegionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, regionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RegionDTO{" +
            "id='" + getId() + "'" +
            ", regionName='" + getRegionName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
