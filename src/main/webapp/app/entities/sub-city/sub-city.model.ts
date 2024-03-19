import { ICity } from 'app/entities/city/city.model';

export interface ISubCity {
  id: string;
  subCityName?: string | null;
  description?: string | null;
  city?: Pick<ICity, 'id' | 'cityName'> | null;
}

export type NewSubCity = Omit<ISubCity, 'id'> & { id: null };
