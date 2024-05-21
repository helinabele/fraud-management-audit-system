package org.audit.app.service.dto;

import java.util.Objects;

/**
 * A DTO for the {@link org.audit.app.domain.Signature} entity.
 */

@SuppressWarnings("common-java:DuplicatedBlocks")
public class SignatureDTO {
    private String id;
    private String signatureName;
    private byte[] singature;
    private String singatureContentType;
    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSignatureName() {
        return signatureName;
    }

    public void setSignatureName(String signatureName) {
        this.signatureName = signatureName;
    }

    public byte[] getSignature() {
        return singature;
    }

    public void setSignature(byte[] singature) {
        this.singature = singature;
    }

    public String getSignatureContentType() {
        return singatureContentType;
    }

    public void setSignatureContentType(String singatureContentType) {
        this.singatureContentType = singatureContentType;
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
        if (!(o instanceof SignatureDTO)) {
            return false;
        }
        SignatureDTO signatureDTO = (SignatureDTO) o;
        if ((this.id == null)) {
            return false;
        }
        return Objects.equals(this.id, signatureDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return "SignatureDTO{" +
                "id=" + getId() + "'" +
                ", signatureName='" + getSignatureName() + "'" +
                ", singature='" + getSignature() + "'" +
                ", description=" + getDescription() +
                "}";
    }
}