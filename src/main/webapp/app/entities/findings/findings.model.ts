import { IFraudInvestigationReport } from 'app/entities/fraud-investigation-report/fraud-investigation-report.model';

export interface IFindings {
  id: string;
  findingAndAnalysis?: string | null;
  findingAndAnalysisAnnex?: string | null;
  findingAndAnalysisAnnexContentType?: string | null;
  fraudInvestigationReport?: Pick<IFraudInvestigationReport, 'id' | 'title'> | null;
}

export type NewFindings = Omit<IFindings, 'id'> & { id: null };
