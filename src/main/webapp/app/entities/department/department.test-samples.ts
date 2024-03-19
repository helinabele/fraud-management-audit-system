import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: '684b861b-2c15-4402-a277-318933fd4b5b',
  departmentName: 'digital user-centric',
};

export const sampleWithPartialData: IDepartment = {
  id: '56701eb3-5f70-42c3-8774-fe4f434215bb',
  departmentName: 'vertical maroon',
  description: 'Row lavender',
};

export const sampleWithFullData: IDepartment = {
  id: '7e98a281-962f-4192-844a-0201fd6a5b09',
  departmentName: 'Gorgeous Minnesota',
  description: 'utilize Exclusive',
};

export const sampleWithNewData: NewDepartment = {
  departmentName: 'empower Object-based',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
