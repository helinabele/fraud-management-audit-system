package org.audit.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link org.audit.app.domain.Division} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DivisionDTO implements Serializable {

    private String id;

    @NotNull
    private String divisionName;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDivisionName() {
        return divisionName;
    }

    public void setDivisionName(String divisionName) {
        this.divisionName = divisionName;
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
        if (!(o instanceof DivisionDTO)) {
            return false;
        }

        DivisionDTO divisionDTO = (DivisionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, divisionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DivisionDTO{" +
            "id='" + getId() + "'" +
            ", divisionName='" + getDivisionName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
