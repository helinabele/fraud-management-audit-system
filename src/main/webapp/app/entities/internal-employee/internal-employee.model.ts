import { IJobGrade } from "../job-grade/job-grade.model";
import { IJobTitle } from "../job-title/job-title.model";

export interface IInternalEmployee {
  id: string;
  name?: string | null;
  position?: string | null;
  grade?: string | null;
  experience?: string | null;
  branch?: string | null;
  jobGrade?: Pick<IJobGrade, 'id' | 'jobGradeName'> | null;
  jobTitle?: Pick<IJobTitle, 'id' | 'jobTitleName'> | null;
}

export type NewInternalEmployee = Omit<IInternalEmployee, 'id'> & { id: null };
