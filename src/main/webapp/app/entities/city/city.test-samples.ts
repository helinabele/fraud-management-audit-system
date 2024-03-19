import { ICity, NewCity } from './city.model';

export const sampleWithRequiredData: ICity = {
  id: 'c8d08c97-401b-48da-9e89-291ff58e5207',
  cityName: 'Fresh Course embrace',
};

export const sampleWithPartialData: ICity = {
  id: 'f0c38ba1-01b1-4b32-8eb4-db11e977f56a',
  cityName: 'Baby yellow Health',
};

export const sampleWithFullData: ICity = {
  id: 'c3bea5dd-4c1c-4f3f-a497-6c3b040d9a9c',
  cityName: 'maximized',
  description: 'up',
};

export const sampleWithNewData: NewCity = {
  cityName: 'protocol envisioneer Gloves',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
