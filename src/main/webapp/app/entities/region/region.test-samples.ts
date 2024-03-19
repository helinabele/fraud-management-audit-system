import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: '4ac22173-a27f-4cc2-bff5-851da2a397e4',
  regionName: 'attitude Senior',
};

export const sampleWithPartialData: IRegion = {
  id: '65077364-590c-4ed3-b468-4f1913319f7a',
  regionName: 'Mouse ROI',
  description: 'embrace overriding Tasty',
};

export const sampleWithFullData: IRegion = {
  id: '2b2c8cab-4bda-47a2-91c2-9f9740f0e29f',
  regionName: 'Metal reboot',
  description: 'connecting',
};

export const sampleWithNewData: NewRegion = {
  regionName: 'Architect Card',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
