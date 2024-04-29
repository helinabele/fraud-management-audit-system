import { IJobGrade, NewJobGrade} from './job-grade.model';

export const sampleWithRequiredData: IJobGrade = {
  id: '118d0d68-5d83-4ab2-9eb4-5f9a318c1c35',
  jobGradeName: 'eyeballs Home technologies',
};

export const sampleWithPartialData: IJobGrade = {
  id: '1d455a2d-5096-4d83-a9f7-a5307c91bd87',
  jobGradeName: 'calculating Books',
  description: 'Sharable',
};

export const sampleWithFullData: IJobGrade = {
  id: 'cb93d7db-4227-439f-baa5-33ff2a652d08',
  jobGradeName: 'program',
  description: 'cross-platform pink Circle',
};

export const sampleWithNewData: NewJobGrade = {
  jobGradeName: 'Cambridgeshire Generic Industrial',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
