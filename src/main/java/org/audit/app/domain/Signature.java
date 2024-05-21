package org.audit.app.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 *  A Signature
 */
@Document(collection = "signature")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Signature implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("signature_name")
    private String signatureName;

    @Field("signature")
    private byte[] signature;

    @Field("signature_content_type")
    private String signatureContentType;

    @Field("description")
    private String description;

    public String getId(){
        return this.id;
    }

    public Signature id(String id){
        this.setId(id);
        return this;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getSignatureName(){
        return this.signatureName;
    }

    public Signature signatureName(String signatureName){
        this.setSignatureName(signatureName);
        return this;
    }
    public void setSignatureName(String signatureName){
        this.signatureName = signatureName;
    }

    public byte[] getSignature(){
        return this.signature;
    }

    public Signature signature(byte[] signature){
        this.setSignature(signature);
        return this;
    }

    public void setSignature(byte[] signature){
        this.signature = signature;
    }

    public String getSignatureContentType(){
        return this.signatureContentType;
    }
    public Signature signatureContentType(String signatureContentType){
        this.signatureContentType = signatureContentType;
        return this;
    }

    public void setSignatureContentType(String signatureContentType){
        this.signatureContentType = signatureContentType;
    }

    public String getDescription(){
        return this.description;
    }

    public Signature description(String description){
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description){

        this.description = description;
    }

    @Override
    public boolean equals(Object o){
        if(this == o) {
        return true;
        }
        if(!(o instanceof Signature)) {
            return false;
        }
        return id !=null && id.equals(((Signature) o).id);
    }

    @Override
    public int hashCode(){

        return getClass().hashCode();
    }

    @Override
    public String toString(){
        return "Signature{" +
            "id=" + getId() +
            ", signatureName='" + getSignatureName() + "'" +
            ", signature='" + getSignature()+ "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
