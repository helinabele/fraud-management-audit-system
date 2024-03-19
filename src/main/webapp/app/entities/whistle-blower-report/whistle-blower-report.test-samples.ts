import { Gender } from 'app/entities/enumerations/gender.model';

import { IWhistleBlowerReport, NewWhistleBlowerReport } from './whistle-blower-report.model';

export const sampleWithRequiredData: IWhistleBlowerReport = {
  id: 'b6ffc0fc-399d-4530-8ceb-db41224a95a2',
};

export const sampleWithPartialData: IWhistleBlowerReport = {
  id: '605c409e-7514-4d09-bd47-fc331da31957',
  emailAdress: 'Officer Oregon niches',
  organization: 'bandwidth',
  attachment: '../fake-data/blob/hipster.png',
  attachmentContentType: 'unknown',
  zone: 'reinvent Gorgeous',
  description: 'Chief New SMTP',
};

export const sampleWithFullData: IWhistleBlowerReport = {
  id: '1ee4917d-362c-43b3-9f8f-59de99cdbc13',
  fullName: 'plug-and-play',
  genderType: Gender['FEMALE'],
  emailAdress: 'compressing Libyan',
  phone: 43164,
  organization: 'Account communities Plastic',
  message: 'Lilangeni Legacy Berkshire',
  attachment: '../fake-data/blob/hipster.png',
  attachmentContentType: 'unknown',
  position: 'payment Supervisor',
  zone: 'invoice Mobility Awesome',
  description: 'Enterprise-wide Soft',
};

export const sampleWithNewData: NewWhistleBlowerReport = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
