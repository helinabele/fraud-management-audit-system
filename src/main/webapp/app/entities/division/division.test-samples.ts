import { IDivision, NewDivision } from './division.model';

export const sampleWithRequiredData: IDivision = {
  id: '753eab59-e38e-452f-8803-50c1401dc97e',
  divisionName: 'Cotton Keyboard edge',
};

export const sampleWithPartialData: IDivision = {
  id: 'e0354d76-1c93-4d71-9a60-18d00ef5b9ff',
  divisionName: 'wireless Cambridgeshire Concrete',
};

export const sampleWithFullData: IDivision = {
  id: '7b5ef44e-5075-4463-b025-f75932b44b7e',
  divisionName: 'Research Shirt exploit',
  description: 'Dong hierarchy',
};

export const sampleWithNewData: NewDivision = {
  divisionName: 'Radial Lead',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
