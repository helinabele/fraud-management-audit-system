import { IJobTitle, NewJobTitle } from './job-title.model';

export const sampleWithRequiredData: IJobTitle = {
  id: '118d0d68-5d83-4ab2-9eb4-5f9a318c1c35',
  jobTitleName: 'eyeballs Home technologies',
};

export const sampleWithPartialData: IJobTitle = {
  id: '1d455a2d-5096-4d83-a9f7-a5307c91bd87',
  jobTitleName: 'calculating Books',
  description: 'Sharable',
};

export const sampleWithFullData: IJobTitle = {
  id: 'cb93d7db-4227-439f-baa5-33ff2a652d08',
  jobTitleName: 'program',
  description: 'cross-platform pink Circle',
};

export const sampleWithNewData: NewJobTitle = {
  jobTitleName: 'Cambridgeshire Generic Industrial',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
