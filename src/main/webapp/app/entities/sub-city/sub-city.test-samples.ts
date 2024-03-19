import { ISubCity, NewSubCity } from './sub-city.model';

export const sampleWithRequiredData: ISubCity = {
  id: '625ef08e-e6c3-4770-8623-23e4533f261e',
  subCityName: 'Chief Utah generate',
};

export const sampleWithPartialData: ISubCity = {
  id: '93ce51df-5dc5-43a7-8837-86e4783de6fe',
  subCityName: 'Handmade Bike',
  description: 'one-to-one Cotton bifurcated',
};

export const sampleWithFullData: ISubCity = {
  id: '5b2924c7-3f62-4ce0-afa3-276451e16f7a',
  subCityName: 'Netherlands',
  description: 'TCP Vietnam',
};

export const sampleWithNewData: NewSubCity = {
  subCityName: 'Security directional',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
