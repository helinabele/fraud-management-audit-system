package org.audit.app.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A FraudInvestigationReport.
 */
@Document(collection = "fraud_investigation_report")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FraudInvestigationReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("title")
    private String title;

    @Field("executive_summary")
    private String executiveSummary;

    @Field("introduction_annex")
    private byte[] introductionAnnex;

    @Field("introduction_annex_content_type")
    private String introductionAnnexContentType;

    @NotNull
    @Field("introduction")
    private String introduction;

    @Field("comments")
    private List<String> comments = new ArrayList<>();

    @Field("objectiveComments")
    private List<String> objectiveComments = new ArrayList<>();

    @NotNull
    @Field("objective")
    private String objective;

    @Field("objective_annex")
    private byte[] objectiveAnnex;

    @Field("objective_annex_content_type")
    private String objectiveAnnexContentType;

    @Field("scope")
    private String scope;

    @Field("scope_annex")
    private byte[] scopeAnnex;

    @Field("scope_annex_content_type")
    private String scopeAnnexContentType;

    @Field("limitation")
    private String limitation;

    @Field("limitation_annex")
    private byte[] limitationAnnex;

    @Field("limitation_annex_content_type")
    private String limitationAnnexContentType;

    @NotNull
    @Field("methodology")
    private String methodology;

    @Field("methodology_annex")
    private byte[] methodologyAnnex;

    @Field("methodology_annex_content_type")
    private String methodologyAnnexContentType;

    @Field("finding_and_analysis")
    private String findingAndAnalysis;

    @Field("finding_and_analysis_annex")
    private byte[] findingAndAnalysisAnnex;

    @Field("finding_and_analysis_annex_content_type")
    private String findingAndAnalysisAnnexContentType;

    @Field("conclusion")
    private String conclusion;

    @Field("conclusion_annex")
    private byte[] conclusionAnnex;

    @Field("conclusion_annex_content_type")
    private String conclusionAnnexContentType;

    @Field("recommendation")
    private String recommendation;

    @Field("recommendation_annex")
    private byte[] recommendationAnnex;

    @Field("recommendation_annex_content_type")
    private String recommendationAnnexContentType;

    @Field("name_of_members")
    private List<String> nameOfMembers;

    @Field("signature")
    private String signature;

    @Field("references")
    private byte[] references;

    @Field("references_content_type")
    private String referencesContentType;

    @Field("publication_date")
    private Instant publicationDate;

    @Field("author")
    private String author;

    @DBRef
    @Field("employee")
    @JsonIgnoreProperties(value = { "user", "director", "manager", "teamLead", "team" }, allowSetters = true)
    private List<Employee> employee;

    @DBRef
    @Field("task")
    @JsonIgnoreProperties(value = { "assignedTasks" }, allowSetters = true)
    private Task task;

    @DBRef
    @Field("team")
    @JsonIgnoreProperties(value = { "teamLead", "managers", "employees", "assignTasks" }, allowSetters = true)
    private Team team;

    @DBRef
    @Field("findings")
    @JsonIgnoreProperties(value = { "fraudInvestigationReport" }, allowSetters = true)
    private Set<Findings> findings = new HashSet<>();

    @DBRef
    @Field("whistle_blower_report")
    private WhistleBlowerReport whistleBlowerReport;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public FraudInvestigationReport id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public FraudInvestigationReport title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExecutiveSummary() {
        return this.executiveSummary;
    }

    public FraudInvestigationReport executiveSummary(String executiveSummary) {
        this.setExecutiveSummary(executiveSummary);
        return this;
    }

    public void setExecutiveSummary(String executiveSummary) {
        this.executiveSummary = executiveSummary;
    }

    public byte[] getIntroductionAnnex() {
        return this.introductionAnnex;
    }

    public FraudInvestigationReport introductionAnnex(byte[] introductionAnnex) {
        this.setIntroductionAnnex(introductionAnnex);
        return this;
    }

    public void setIntroductionAnnex(byte[] introductionAnnex) {
        this.introductionAnnex = introductionAnnex;
    }

    public String getIntroductionAnnexContentType() {
        return this.introductionAnnexContentType;
    }

    public FraudInvestigationReport introductionAnnexContentType(String introductionAnnexContentType) {
        this.introductionAnnexContentType = introductionAnnexContentType;
        return this;
    }

    public void setIntroductionAnnexContentType(String introductionAnnexContentType) {
        this.introductionAnnexContentType = introductionAnnexContentType;
    }

    public String getIntroduction() {
        return this.introduction;
    }

    public FraudInvestigationReport introduction(String introduction) {
        this.setIntroduction(introduction);
        return this;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getObjective() {
        return this.objective;
    }

    public FraudInvestigationReport objective(String objective) {
        this.setObjective(objective);
        return this;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public byte[] getObjectiveAnnex() {
        return this.objectiveAnnex;
    }

    public FraudInvestigationReport objectiveAnnex(byte[] objectiveAnnex) {
        this.setObjectiveAnnex(objectiveAnnex);
        return this;
    }

    public void setObjectiveAnnex(byte[] objectiveAnnex) {
        this.objectiveAnnex = objectiveAnnex;
    }

    public String getObjectiveAnnexContentType() {
        return this.objectiveAnnexContentType;
    }

    public FraudInvestigationReport objectiveAnnexContentType(String objectiveAnnexContentType) {
        this.objectiveAnnexContentType = objectiveAnnexContentType;
        return this;
    }

    public void setObjectiveAnnexContentType(String objectiveAnnexContentType) {
        this.objectiveAnnexContentType = objectiveAnnexContentType;
    }

    public String getScope() {
        return this.scope;
    }

    public FraudInvestigationReport scope(String scope) {
        this.setScope(scope);
        return this;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public byte[] getScopeAnnex() {
        return this.scopeAnnex;
    }

    public FraudInvestigationReport scopeAnnex(byte[] scopeAnnex) {
        this.setScopeAnnex(scopeAnnex);
        return this;
    }

    public void setScopeAnnex(byte[] scopeAnnex) {
        this.scopeAnnex = scopeAnnex;
    }

    public String getScopeAnnexContentType() {
        return this.scopeAnnexContentType;
    }

    public FraudInvestigationReport scopeAnnexContentType(String scopeAnnexContentType) {
        this.scopeAnnexContentType = scopeAnnexContentType;
        return this;
    }

    public void setScopeAnnexContentType(String scopeAnnexContentType) {
        this.scopeAnnexContentType = scopeAnnexContentType;
    }

    public String getLimitation() {
        return this.limitation;
    }

    public FraudInvestigationReport limitation(String limitation) {
        this.setLimitation(limitation);
        return this;
    }

    public void setLimitation(String limitation) {
        this.limitation = limitation;
    }

    public byte[] getLimitationAnnex() {
        return this.limitationAnnex;
    }

    public FraudInvestigationReport limitationAnnex(byte[] limitationAnnex) {
        this.setLimitationAnnex(limitationAnnex);
        return this;
    }

    public void setLimitationAnnex(byte[] limitationAnnex) {
        this.limitationAnnex = limitationAnnex;
    }

    public String getLimitationAnnexContentType() {
        return this.limitationAnnexContentType;
    }

    public FraudInvestigationReport limitationAnnexContentType(String limitationAnnexContentType) {
        this.limitationAnnexContentType = limitationAnnexContentType;
        return this;
    }

    public void setLimitationAnnexContentType(String limitationAnnexContentType) {
        this.limitationAnnexContentType = limitationAnnexContentType;
    }

    public String getMethodology() {
        return this.methodology;
    }

    public FraudInvestigationReport methodology(String methodology) {
        this.setMethodology(methodology);
        return this;
    }

    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }

    public byte[] getMethodologyAnnex() {
        return this.methodologyAnnex;
    }

    public FraudInvestigationReport methodologyAnnex(byte[] methodologyAnnex) {
        this.setMethodologyAnnex(methodologyAnnex);
        return this;
    }

    public void setMethodologyAnnex(byte[] methodologyAnnex) {
        this.methodologyAnnex = methodologyAnnex;
    }

    public String getMethodologyAnnexContentType() {
        return this.methodologyAnnexContentType;
    }

    public FraudInvestigationReport methodologyAnnexContentType(String methodologyAnnexContentType) {
        this.methodologyAnnexContentType = methodologyAnnexContentType;
        return this;
    }

    public void setMethodologyAnnexContentType(String methodologyAnnexContentType) {
        this.methodologyAnnexContentType = methodologyAnnexContentType;
    }

    public String getFindingAndAnalysis() {
        return this.findingAndAnalysis;
    }

    public FraudInvestigationReport findingAndAnalysis(String findingAndAnalysis) {
        this.setFindingAndAnalysis(findingAndAnalysis);
        return this;
    }

    public void setFindingAndAnalysis(String findingAndAnalysis) {
        this.findingAndAnalysis = findingAndAnalysis;
    }

    public byte[] getFindingAndAnalysisAnnex() {
        return this.findingAndAnalysisAnnex;
    }

    public FraudInvestigationReport findingAndAnalysisAnnex(byte[] findingAndAnalysisAnnex) {
        this.setFindingAndAnalysisAnnex(findingAndAnalysisAnnex);
        return this;
    }

    public void setFindingAndAnalysisAnnex(byte[] findingAndAnalysisAnnex) {
        this.findingAndAnalysisAnnex = findingAndAnalysisAnnex;
    }

    public String getFindingAndAnalysisAnnexContentType() {
        return this.findingAndAnalysisAnnexContentType;
    }

    public FraudInvestigationReport findingAndAnalysisAnnexContentType(String findingAndAnalysisAnnexContentType) {
        this.findingAndAnalysisAnnexContentType = findingAndAnalysisAnnexContentType;
        return this;
    }

    public void setFindingAndAnalysisAnnexContentType(String findingAndAnalysisAnnexContentType) {
        this.findingAndAnalysisAnnexContentType = findingAndAnalysisAnnexContentType;
    }

    public String getConclusion() {
        return this.conclusion;
    }

    public FraudInvestigationReport conclusion(String conclusion) {
        this.setConclusion(conclusion);
        return this;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public byte[] getConclusionAnnex() {
        return this.conclusionAnnex;
    }

    public FraudInvestigationReport conclusionAnnex(byte[] conclusionAnnex) {
        this.setConclusionAnnex(conclusionAnnex);
        return this;
    }

    public void setConclusionAnnex(byte[] conclusionAnnex) {
        this.conclusionAnnex = conclusionAnnex;
    }

    public String getConclusionAnnexContentType() {
        return this.conclusionAnnexContentType;
    }

    public FraudInvestigationReport conclusionAnnexContentType(String conclusionAnnexContentType) {
        this.conclusionAnnexContentType = conclusionAnnexContentType;
        return this;
    }

    public void setConclusionAnnexContentType(String conclusionAnnexContentType) {
        this.conclusionAnnexContentType = conclusionAnnexContentType;
    }

    public String getRecommendation() {
        return this.recommendation;
    }

    public FraudInvestigationReport recommendation(String recommendation) {
        this.setRecommendation(recommendation);
        return this;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public byte[] getRecommendationAnnex() {
        return this.recommendationAnnex;
    }

    public FraudInvestigationReport recommendationAnnex(byte[] recommendationAnnex) {
        this.setRecommendationAnnex(recommendationAnnex);
        return this;
    }

    public void setRecommendationAnnex(byte[] recommendationAnnex) {
        this.recommendationAnnex = recommendationAnnex;
    }

    public String getRecommendationAnnexContentType() {
        return this.recommendationAnnexContentType;
    }

    public FraudInvestigationReport recommendationAnnexContentType(String recommendationAnnexContentType) {
        this.recommendationAnnexContentType = recommendationAnnexContentType;
        return this;
    }

    public void setRecommendationAnnexContentType(String recommendationAnnexContentType) {
        this.recommendationAnnexContentType = recommendationAnnexContentType;
    }

    public List<String> getNameOfMembers() {
        return this.nameOfMembers;
    }

    public FraudInvestigationReport nameOfMembers(List<String> nameOfMembers) {
        this.setNameOfMembers(nameOfMembers);
        return this;
    }

    public void setNameOfMembers(List<String> nameOfMembers) {
        this.nameOfMembers = nameOfMembers;
    }

    public String getSignature() {
        return this.signature;
    }

    public FraudInvestigationReport signature(String signature) {
        this.setSignature(signature);
        return this;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public byte[] getReferences() {
        return this.references;
    }

    public FraudInvestigationReport references(byte[] references) {
        this.setReferences(references);
        return this;
    }

    public void setReferences(byte[] references) {
        this.references = references;
    }

    public String getReferencesContentType() {
        return this.referencesContentType;
    }

    public FraudInvestigationReport referencesContentType(String referencesContentType) {
        this.referencesContentType = referencesContentType;
        return this;
    }

    public void setReferencesContentType(String referencesContentType) {
        this.referencesContentType = referencesContentType;
    }

    public Instant getPublicationDate() {
        return this.publicationDate;
    }

    public FraudInvestigationReport publicationDate(Instant publicationDate) {
        this.setPublicationDate(publicationDate);
        return this;
    }

    public void setPublicationDate(Instant publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getAuthor() {
        return this.author;
    }

    public FraudInvestigationReport author(String author) {
        this.setAuthor(author);
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<Employee> getEmployee() {
        return this.employee;
    }

    public void setEmployee(List<Employee> employee) {
        this.employee = employee;
    }

    public FraudInvestigationReport employee(List<Employee> employee) {
        this.setEmployee(employee);
        return this;
    }

    public Task getTask() {
        return this.task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public FraudInvestigationReport task(Task task) {
        this.setTask(task);
        return this;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public FraudInvestigationReport team(Team team) {
        this.setTeam(team);
        return this;
    }

    public Set<Findings> getFindings() {
        return this.findings;
    }

    public void setFindings(Set<Findings> findings) {
        if (this.findings != null) {
            this.findings.forEach(i -> i.setFraudInvestigationReport(null));
        }
        if (findings != null) {
            findings.forEach(i -> i.setFraudInvestigationReport(this));
        }
        this.findings = findings;
    }

    public FraudInvestigationReport findings(Set<Findings> findings) {
        this.setFindings(findings);
        return this;
    }

    public FraudInvestigationReport addFindings(Findings findings) {
        this.findings.add(findings);
        findings.setFraudInvestigationReport(this);
        return this;
    }

    public FraudInvestigationReport removeFindings(Findings findings) {
        this.findings.remove(findings);
        findings.setFraudInvestigationReport(null);
        return this;
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


    public WhistleBlowerReport getWhistleBlowerReport() {
        return whistleBlowerReport;
    }

    public void setWhistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.whistleBlowerReport = whistleBlowerReport;
    }

    public FraudInvestigationReport whistleBlowerReport(WhistleBlowerReport whistleBlowerReport) {
        this.setWhistleBlowerReport(whistleBlowerReport);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FraudInvestigationReport)) {
            return false;
        }
        return id != null && id.equals(((FraudInvestigationReport) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FraudInvestigationReport{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", executiveSummary='" + getExecutiveSummary() + "'" +
            ", introductionAnnex='" + getIntroductionAnnex() + "'" +
            ", introductionAnnexContentType='" + getIntroductionAnnexContentType() + "'" +
            ", introduction='" + getIntroduction() + "'" +
            ", objective='" + getObjective() + "'" +
            ", objectiveAnnex='" + getObjectiveAnnex() + "'" +
            ", objectiveAnnexContentType='" + getObjectiveAnnexContentType() + "'" +
            ", scope='" + getScope() + "'" +
            ", scopeAnnex='" + getScopeAnnex() + "'" +
            ", scopeAnnexContentType='" + getScopeAnnexContentType() + "'" +
            ", limitation='" + getLimitation() + "'" +
            ", limitationAnnex='" + getLimitationAnnex() + "'" +
            ", limitationAnnexContentType='" + getLimitationAnnexContentType() + "'" +
            ", methodology='" + getMethodology() + "'" +
            ", methodologyAnnex='" + getMethodologyAnnex() + "'" +
            ", methodologyAnnexContentType='" + getMethodologyAnnexContentType() + "'" +
            ", findingAndAnalysis='" + getFindingAndAnalysis() + "'" +
            ", findingAndAnalysisAnnex='" + getFindingAndAnalysisAnnex() + "'" +
            ", findingAndAnalysisAnnexContentType='" + getFindingAndAnalysisAnnexContentType() + "'" +
            ", conclusion='" + getConclusion() + "'" +
            ", conclusionAnnex='" + getConclusionAnnex() + "'" +
            ", conclusionAnnexContentType='" + getConclusionAnnexContentType() + "'" +
            ", recommendation='" + getRecommendation() + "'" +
            ", recommendationAnnex='" + getRecommendationAnnex() + "'" +
            ", recommendationAnnexContentType='" + getRecommendationAnnexContentType() + "'" +
            ", nameOfMembers='" + getNameOfMembers() + "'" +
            ", signature='" + getSignature() + "'" +
            ", references='" + getReferences() + "'" +
            ", referencesContentType='" + getReferencesContentType() + "'" +
            ", publicationDate='" + getPublicationDate() + "'" +
            ", author='" + getAuthor() + "'" +
            "}";
    }

}
