import { IDivision } from 'app/entities/division/division.model';
import { IDepartment } from 'app/entities/department/department.model';

export interface IBranch {
  id: string;
  branchName?: string | null;
  description?: string | null;
  division?: Pick<IDivision, 'id' | 'divisionName'> | null;
  department?: Pick<IDepartment, 'id' | 'departmentName'> | null;
}

export type NewBranch = Omit<IBranch, 'id'> & { id: null };
