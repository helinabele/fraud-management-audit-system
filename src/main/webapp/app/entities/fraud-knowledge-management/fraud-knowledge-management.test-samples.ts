import dayjs from 'dayjs/esm';

import { FraudTypeByIncident } from 'app/entities/enumerations/fraud-type-by-incident.model';
import { SuspectedFraudster } from 'app/entities/enumerations/suspected-fraudster.model';

import { IFraudKnowledgeManagement, NewFraudKnowledgeManagement } from './fraud-knowledge-management.model';

export const sampleWithRequiredData: IFraudKnowledgeManagement = {
  id: '6d9aadea-b2f2-48ba-a7fc-ef5e0f0e87b9',
  reportNumber: 24679,
  fraudIncident: FraudTypeByIncident['ACTUAL'],
  actualIncident: 'Summit orchid index',
  attemptIncident: 'Clothing haptic',
  reasonForFailure: 'overriding Intranet',
  unit: 'Cape Steel Customer',
  incidentDate: dayjs('2023-08-24T20:01'),
  dateOfDetection: dayjs('2023-08-24T14:38'),
  projectCreationDate: dayjs('2023-08-25'),
  reportDate: dayjs('2023-08-24'),
  suspectedFraudster: SuspectedFraudster['OTHER'],
  financialLossAmount: 65603,
  actualFraudAmount: 'Personal copying',
  debitAccount: 'web-enabled Jordanian Outdoors',
  creditAccount: 'Circle',
  causeForAnIncident: 'primary models synthesize',
  effect: 'Table Centralized payment',
  recommendationsDrawn: 'China Metical',
};

export const sampleWithPartialData: IFraudKnowledgeManagement = {
  id: 'fd851fd9-f619-4f34-99f2-bd5310fad1a9',
  reportNumber: 2928,
  fraudIncident: FraudTypeByIncident['ATTEMPT'],
  actualIncident: 'withdrawal South',
  attemptIncident: 'Table',
  reasonForFailure: 'e-commerce e-enable Senior',
  unit: 'overriding South Garden',
  incidentDate: dayjs('2023-08-24T17:53'),
  dateOfDetection: dayjs('2023-08-24T17:49'),
  projectCreationDate: dayjs('2023-08-24'),
  reportDate: dayjs('2023-08-25'),
  suspectedFraudster: SuspectedFraudster['INTERNAL'],
  financialLossAmount: 1813,
  actualFraudAmount: 'Fully-configurable Money',
  debitAccount: 'Ergonomic strategy',
  creditAccount: 'Gabon Massachusetts streamline',
  causeForAnIncident: 'Georgia Burundi Berkshire',
  systemAndProceduralLoophole: 'multi-tasking',
  effect: 'Executive',
  recommendationsDrawn: 'Money azure',
  positionJG: 'value-added programming Refined',
  actionInvolved: 'Manager niches white',
  ngScreenerReport: 'Research blue Mouse',
};

export const sampleWithFullData: IFraudKnowledgeManagement = {
  id: '42eacf1c-48b1-48d7-af9b-219404f3d127',
  reportNumber: 71818,
  fraudIncident: FraudTypeByIncident['ATTEMPT'],
  actualIncident: 'Metal Table compressing',
  attemptIncident: 'Kids Quality-focused Keyboard',
  reasonForFailure: 'Analyst hacking',
  unit: 'Frozen Track',
  incidentDate: dayjs('2023-08-25T05:38'),
  dateOfDetection: dayjs('2023-08-25T01:46'),
  reasonForDelay: 'Kwacha granular ADP',
  projectCreationDate: dayjs('2023-08-24'),
  reportDate: dayjs('2023-08-24'),
  suspectedFraudster: SuspectedFraudster['INTERNAL'],
  financialLossAmount: 53965,
  actualFraudAmount: '24/365 Table',
  debitAccount: 'model invoice Lari',
  creditAccount: 'Towels Central',
  techniquesandTechnologiesUsed: 'generating dynamic',
  causeForAnIncident: 'help-desk payment',
  systemAndProceduralLoophole: 'proactive Function-based payment',
  effect: 'JSON azure Dinar',
  recommendationsDrawn: 'hub yellow',
  positionJG: 'content-based bypass transmit',
  nameIdNo: 'Bermuda deploy',
  actionInvolved: 'cross-platform',
  ngScreenerReport: 'Awesome Ohio',
  committeeDecision: 'frame',
  measureTaken: 'Cross-group',
  fraudAmountRecovered: 'AI tan Stream',
  fraudAmountWrittenOff: 'structure Handmade Generic',
  previouslyHeldForFraudOutstanding: 'Iowa back-end complexity',
};

export const sampleWithNewData: NewFraudKnowledgeManagement = {
  reportNumber: 23097,
  fraudIncident: FraudTypeByIncident['ACTUAL'],
  actualIncident: 'Avon Berkshire Frozen',
  attemptIncident: 'system',
  reasonForFailure: 'clear-thinking Lead',
  unit: 'microchip attitude-oriented Wisconsin',
  incidentDate: dayjs('2023-08-25T10:22'),
  dateOfDetection: dayjs('2023-08-25T11:32'),
  projectCreationDate: dayjs('2023-08-25'),
  reportDate: dayjs('2023-08-24'),
  suspectedFraudster: SuspectedFraudster['BOTH'],
  financialLossAmount: 71551,
  actualFraudAmount: 'Account maroon',
  debitAccount: 'impactful reboot architectures',
  creditAccount: 'Awesome synergistic',
  causeForAnIncident: 'Pants deposit Salad',
  effect: 'Swaziland',
  recommendationsDrawn: 'bluetooth',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
