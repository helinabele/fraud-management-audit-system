import { IDivision } from 'app/entities/division/division.model';
import { IDepartment } from 'app/entities/department/department.model';
import { IBranch } from 'app/entities/branch/branch.model';
import { IRegion } from 'app/entities/region/region.model';
import { ICity } from 'app/entities/city/city.model';
import { ISubCity } from 'app/entities/sub-city/sub-city.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IWhistleBlowerReport {
date?: any;
  id: string;
  fullName?: string | null;
  genderType?: Gender | null;
  emailAdress?: string | null;
  phone?: number | null;
  organization?: string | null;
  message?: string | null;
  attachment?: string | null;
  attachmentContentType?: string | null;
  position?: string | null;
  zone?: string | null;
  description?: string | null;
  division?: Pick<IDivision, 'id' | 'divisionName'> | null;
  department?: Pick<IDepartment, 'id' | 'departmentName'> | null;
  branch?: Pick<IBranch, 'id' | 'branchName'> | null;
  region?: Pick<IRegion, 'id' | 'regionName'> | null;
  city?: Pick<ICity, 'id' | 'cityName'> | null;
  subCity?: Pick<ISubCity, 'id' | 'subCityName'> | null;
  reportStatus?: string | null;
}

export type NewWhistleBlowerReport = Omit<IWhistleBlowerReport, 'id'> & { id: null };
