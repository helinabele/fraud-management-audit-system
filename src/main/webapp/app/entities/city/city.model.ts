import { IRegion } from 'app/entities/region/region.model';

export interface ICity {
  id: string;
  cityName?: string | null;
  description?: string | null;
  region?: Pick<IRegion, 'id' | 'regionName'> | null;
}

export type NewCity = Omit<ICity, 'id'> & { id: null };
