package org.audit.app.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the {@link org.audit.app.domain.FraudInvestigationReport} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FraudInvestigationReportDTO implements Serializable {

    private String id;

    @NotNull
    private String title;

    private String executiveSummary;

    private byte[] introductionAnnex;

    private String introductionAnnexContentType;

    @NotNull
    private String introduction;

    private List<String> comments = new ArrayList<>();
    private List<String> objectiveComments = new ArrayList<>();

    @NotNull
    private String objective;

    private byte[] objectiveAnnex;

    private String objectiveAnnexContentType;
    private String scope;

    private byte[] scopeAnnex;

    private String scopeAnnexContentType;
    private String limitation;

    private byte[] limitationAnnex;

    private String limitationAnnexContentType;

    @NotNull
    private String methodology;

    private byte[] methodologyAnnex;

    private String methodologyAnnexContentType;
    private String findingAndAnalysis;

    private byte[] findingAndAnalysisAnnex;

    private String findingAndAnalysisAnnexContentType;
    private String conclusion;

    private byte[] conclusionAnnex;

    private String conclusionAnnexContentType;
    private String recommendation;

    private byte[] recommendationAnnex;

    private String recommendationAnnexContentType;
    private List<String> nameOfMembers;

    private String signature;

    private byte[] references;

    private String referencesContentType;
    private Instant publicationDate;

    private String author;

    private List<EmployeeDTO> employee;

    private TaskDTO task;

    private TeamDTO team;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExecutiveSummary() {
        return executiveSummary;
    }

    public void setExecutiveSummary(String executiveSummary) {
        this.executiveSummary = executiveSummary;
    }

    public byte[] getIntroductionAnnex() {
        return introductionAnnex;
    }

    public void setIntroductionAnnex(byte[] introductionAnnex) {
        this.introductionAnnex = introductionAnnex;
    }

    public String getIntroductionAnnexContentType() {
        return introductionAnnexContentType;
    }

    public void setIntroductionAnnexContentType(String introductionAnnexContentType) {
        this.introductionAnnexContentType = introductionAnnexContentType;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public byte[] getObjectiveAnnex() {
        return objectiveAnnex;
    }

    public void setObjectiveAnnex(byte[] objectiveAnnex) {
        this.objectiveAnnex = objectiveAnnex;
    }

    public String getObjectiveAnnexContentType() {
        return objectiveAnnexContentType;
    }

    public void setObjectiveAnnexContentType(String objectiveAnnexContentType) {
        this.objectiveAnnexContentType = objectiveAnnexContentType;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public byte[] getScopeAnnex() {
        return scopeAnnex;
    }

    public void setScopeAnnex(byte[] scopeAnnex) {
        this.scopeAnnex = scopeAnnex;
    }

    public String getScopeAnnexContentType() {
        return scopeAnnexContentType;
    }

    public void setScopeAnnexContentType(String scopeAnnexContentType) {
        this.scopeAnnexContentType = scopeAnnexContentType;
    }

    public String getLimitation() {
        return limitation;
    }

    public void setLimitation(String limitation) {
        this.limitation = limitation;
    }

    public byte[] getLimitationAnnex() {
        return limitationAnnex;
    }

    public void setLimitationAnnex(byte[] limitationAnnex) {
        this.limitationAnnex = limitationAnnex;
    }

    public String getLimitationAnnexContentType() {
        return limitationAnnexContentType;
    }

    public void setLimitationAnnexContentType(String limitationAnnexContentType) {
        this.limitationAnnexContentType = limitationAnnexContentType;
    }

    public String getMethodology() {
        return methodology;
    }

    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }

    public byte[] getMethodologyAnnex() {
        return methodologyAnnex;
    }

    public void setMethodologyAnnex(byte[] methodologyAnnex) {
        this.methodologyAnnex = methodologyAnnex;
    }

    public String getMethodologyAnnexContentType() {
        return methodologyAnnexContentType;
    }

    public void setMethodologyAnnexContentType(String methodologyAnnexContentType) {
        this.methodologyAnnexContentType = methodologyAnnexContentType;
    }

    public String getFindingAndAnalysis() {
        return findingAndAnalysis;
    }

    public void setFindingAndAnalysis(String findingAndAnalysis) {
        this.findingAndAnalysis = findingAndAnalysis;
    }

    public byte[] getFindingAndAnalysisAnnex() {
        return findingAndAnalysisAnnex;
    }

    public void setFindingAndAnalysisAnnex(byte[] findingAndAnalysisAnnex) {
        this.findingAndAnalysisAnnex = findingAndAnalysisAnnex;
    }

    public String getFindingAndAnalysisAnnexContentType() {
        return findingAndAnalysisAnnexContentType;
    }

    public void setFindingAndAnalysisAnnexContentType(String findingAndAnalysisAnnexContentType) {
        this.findingAndAnalysisAnnexContentType = findingAndAnalysisAnnexContentType;
    }

    public String getConclusion() {
        return conclusion;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public byte[] getConclusionAnnex() {
        return conclusionAnnex;
    }

    public void setConclusionAnnex(byte[] conclusionAnnex) {
        this.conclusionAnnex = conclusionAnnex;
    }

    public String getConclusionAnnexContentType() {
        return conclusionAnnexContentType;
    }

    public void setConclusionAnnexContentType(String conclusionAnnexContentType) {
        this.conclusionAnnexContentType = conclusionAnnexContentType;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public byte[] getRecommendationAnnex() {
        return recommendationAnnex;
    }

    public void setRecommendationAnnex(byte[] recommendationAnnex) {
        this.recommendationAnnex = recommendationAnnex;
    }

    public String getRecommendationAnnexContentType() {
        return recommendationAnnexContentType;
    }

    public void setRecommendationAnnexContentType(String recommendationAnnexContentType) {
        this.recommendationAnnexContentType = recommendationAnnexContentType;
    }

    public List<String> getNameOfMembers() {
        return nameOfMembers;
    }

    public void setNameOfMembers(List<String> nameOfMembers) {
        this.nameOfMembers = nameOfMembers;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public byte[] getReferences() {
        return references;
    }

    public void setReferences(byte[] references) {
        this.references = references;
    }

    public String getReferencesContentType() {
        return referencesContentType;
    }

    public void setReferencesContentType(String referencesContentType) {
        this.referencesContentType = referencesContentType;
    }

    public Instant getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Instant publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<EmployeeDTO> getEmployee() {
        return employee;
    }

    public void setEmployee(List<EmployeeDTO> employee) {
        this.employee = employee;
    }

    public TaskDTO getTask() {
        return task;
    }

    public void setTask(TaskDTO task) {
        this.task = task;
    }

    public TeamDTO getTeam() {
        return team;
    }

    public void setTeam(TeamDTO team) {
        this.team = team;
    }
    
    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public List<String> getObjectiveComments() {
        return objectiveComments;
    }

    public void setObjectiveComments(List<String> objectiveComments) {
        this.objectiveComments = objectiveComments;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FraudInvestigationReportDTO)) {
            return false;
        }

        FraudInvestigationReportDTO fraudInvestigationReportDTO = (FraudInvestigationReportDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, fraudInvestigationReportDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FraudInvestigationReportDTO{" +
            "id='" + getId() + "'" +
            ", title='" + getTitle() + "'" +
            ", executiveSummary='" + getExecutiveSummary() + "'" +
            ", introductionAnnex='" + getIntroductionAnnex() + "'" +
            ", introduction='" + getIntroduction() + "'" +
            ", objective='" + getObjective() + "'" +
            ", objectiveAnnex='" + getObjectiveAnnex() + "'" +
            ", scope='" + getScope() + "'" +
            ", scopeAnnex='" + getScopeAnnex() + "'" +
            ", limitation='" + getLimitation() + "'" +
            ", limitationAnnex='" + getLimitationAnnex() + "'" +
            ", methodology='" + getMethodology() + "'" +
            ", methodologyAnnex='" + getMethodologyAnnex() + "'" +
            ", findingAndAnalysis='" + getFindingAndAnalysis() + "'" +
            ", findingAndAnalysisAnnex='" + getFindingAndAnalysisAnnex() + "'" +
            ", conclusion='" + getConclusion() + "'" +
            ", conclusionAnnex='" + getConclusionAnnex() + "'" +
            ", recommendation='" + getRecommendation() + "'" +
            ", recommendationAnnex='" + getRecommendationAnnex() + "'" +
            ", nameOfMembers='" + getNameOfMembers() + "'" +
            ", signature='" + getSignature() + "'" +
            ", references='" + getReferences() + "'" +
            ", publicationDate='" + getPublicationDate() + "'" +
            ", author='" + getAuthor() + "'" +
            ", employee=" + getEmployee() +
            ", task=" + getTask() +
            ", team=" + getTeam() +
            ", comments=" + getComments() +
            ", objectiveComments=" + getObjectiveComments() +
            "}";
    }

}
