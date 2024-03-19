import { IDivision } from 'app/entities/division/division.model';

export interface IDepartment {
  id: string;
  departmentName?: string | null;
  description?: string | null;
  division?: Pick<IDivision, 'id' | 'divisionName'> | null;
}

export type NewDepartment = Omit<IDepartment, 'id'> & { id: null };
