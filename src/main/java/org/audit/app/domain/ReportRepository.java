package org.audit.app.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 *  A ReportRepository
 */
@Document(collection = "report_repository")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReportRepository implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("report_repository_name")
    private String reportRepositoryName;

    @Field("attachment")
    private byte[] attachment;

    @Field("attachment_content_type")
    private String attachmentContentType;

    @Field("description")
    private String description;

    public String getId(){
        return this.id;
    }

    public ReportRepository id(String id){
        this.setId(id);
        return this;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getReportRepositoryName(){
        return this.reportRepositoryName;
    }

    public ReportRepository reportRepositoryName(String reportRepositoryName){
        this.setReportRepositoryName(reportRepositoryName);
        return this;
    }
    public void setReportRepositoryName(String reportRepositoryName){
        this.reportRepositoryName = reportRepositoryName;
    }

    public byte[] getAttachment(){
        return this.attachment;
    }

    public ReportRepository attachment(byte[] attachment){
        this.setAttachment(attachment);
        return this;
    }

    public void setAttachment(byte[] attachment){
        this.attachment = attachment;
    }

    public String getAttachmentContentType(){
        return this.attachmentContentType;
    }
    public ReportRepository attachmentContentType(String attachmentContentType){
        this.attachmentContentType = attachmentContentType;
        return this;
    }

    public void setAttachmentContentType(String attachmentContentType){
        this.attachmentContentType = attachmentContentType;
    }

    public String getDescription(){
        return this.description;
    }

    public ReportRepository description(String description){
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
        if(!(o instanceof ReportRepository)) {
            return false;
        }
        return id !=null && id.equals(((ReportRepository) o).id);
    }

    @Override
    public int hashCode(){

        return getClass().hashCode();
    }

    @Override
    public String toString(){
        return "ReportRepository{" +
            "id=" + getId() +
            ", reportRepositoryName='" + getReportRepositoryName() + "'" +
            ", attachment='" + getAttachment()+ "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
