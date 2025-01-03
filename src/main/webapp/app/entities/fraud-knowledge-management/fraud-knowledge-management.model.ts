import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';
import { IFraudInvestigationReport } from 'app/entities/fraud-investigation-report/fraud-investigation-report.model';
import { IFraudType } from 'app/entities/fraud-type/fraud-type.model';
import { IBankAccount } from 'app/entities/bank-account/bank-account.model';
import { IBankService } from 'app/entities/bank-service/bank-service.model';
import { IInternalEmployee } from 'app/entities/internal-employee/internal-employee.model';
import { IExternalEmployee } from 'app/entities/external-employee/external-employee.model';
import { FraudTypeByIncident } from 'app/entities/enumerations/fraud-type-by-incident.model';
import { SuspectedFraudster } from 'app/entities/enumerations/suspected-fraudster.model';

export interface IFraudKnowledgeManagement {
  id: string;
  reportNumber?: number | null;
  fraudIncident?: FraudTypeByIncident | null;
  actualIncident?: string | null;
  attemptIncident?: string | null;
  reasonForFailure?: string | null;
  unit?: string | null;
  incidentDate?: dayjs.Dayjs | null;
  dateOfDetection?: dayjs.Dayjs | null;
  reasonForDelay?: string | null;
  projectCreationDate?: dayjs.Dayjs | null;
  reportDate?: dayjs.Dayjs | null;
  suspectedFraudster?: SuspectedFraudster | null;
  financialLossAmount?: number | null;
  actualFraudAmount?: string | null;
  debitAccount?: string | null;
  creditAccount?: string | null;
  techniquesandTechnologiesUsed?: string | null;
  causeForAnIncident?: string | null;
  systemAndProceduralLoophole?: string | null;
  effect?: string | null;
  recommendationsDrawn?: string | null;
  positionJG?: string | null;
  nameIdNo?: string | null;
  actionInvolved?: string | null;
  ngScreenerReport?: string | null;
  committeeDecision?: string | null;
  measureTaken?: string | null;
  fraudAmountRecovered?: string | null;
  fraudAmountWrittenOff?: string | null;
  previouslyHeldForFraudOutstanding?: string | null;
  employee?: Pick<IEmployee, 'id' | 'name'> | null;
  fraudInvestigationReport?: Pick<IFraudInvestigationReport, 'id' | 'title'> | null;
  fraudType?: Pick<IFraudType, 'id' | 'fraudName'> | null;
  bankAccount?: Pick<IBankAccount, 'id' | 'bankName'> | null;
  bankService?: Pick<IBankService, 'id' | 'serviceName'> | null;
  internalEmployee?: Pick<IInternalEmployee, 'id' | 'name'> | null;
  externalEmployee?: Pick<IExternalEmployee, 'id' | 'name'> | null;
}

export type NewFraudKnowledgeManagement = Omit<IFraudKnowledgeManagement, 'id'> & { id: null };
