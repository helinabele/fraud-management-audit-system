import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';
import { ITask } from 'app/entities/task/task.model';
import { ITeam } from 'app/entities/team/team.model';

export interface IFraudInvestigationReport {
  id: string;
  title?: string | null;
  executiveSummary?: string | null;
  introductionAnnex?: string | null;
  introductionAnnexContentType?: string | null;
  introduction?: string | null;
  objective?: string | null;
  objectiveAnnex?: string | null;
  objectiveAnnexContentType?: string | null;
  scope?: string | null;
  scopeAnnex?: string | null;
  scopeAnnexContentType?: string | null;
  limitation?: string | null;
  limitationAnnex?: string | null;
  limitationAnnexContentType?: string | null;
  methodology?: string | null;
  methodologyAnnex?: string | null;
  methodologyAnnexContentType?: string | null;
  findingAndAnalysis?: string | null;
  findingAndAnalysisAnnex?: string | null;
  findingAndAnalysisAnnexContentType?: string | null;
  conclusion?: string | null;
  conclusionAnnex?: string | null;
  conclusionAnnexContentType?: string | null;
  recommendation?: string | null;
  recommendationAnnex?: string | null;
  recommendationAnnexContentType?: string | null;
  nameOfMembers?: string | null;
  signature?: string | null;
  references?: string | null;
  referencesContentType?: string | null;
  publicationDate?: dayjs.Dayjs | null;
  author?: string | null;
  employee?: IEmployee[] | null | undefined;
  task?: Pick<ITask, 'id' | 'title'> | null;
  team?: Pick<ITeam, 'id' | 'teamName'> | null;
}

export type NewFraudInvestigationReport = Omit<IFraudInvestigationReport, 'id'> & { id: null };
