import { IBranch, NewBranch } from './branch.model';

export const sampleWithRequiredData: IBranch = {
  id: '0c38fc2c-0367-4497-964e-31bc165ed1a5',
  branchName: 'Denar Human Architect',
};

export const sampleWithPartialData: IBranch = {
  id: '25cbf6ea-083c-46b2-a87a-85c5c91bbdb5',
  branchName: 'productize responsive',
  description: 'Steel conglomeration action-items',
};

export const sampleWithFullData: IBranch = {
  id: 'fbb1e076-3992-437a-b921-fd5eb01ba940',
  branchName: 'Shirt lavender Illinois',
  description: 'Multi-layered quantify',
};

export const sampleWithNewData: NewBranch = {
  branchName: 'program',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
