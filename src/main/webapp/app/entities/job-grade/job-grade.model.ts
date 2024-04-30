export interface IJobGrade {
  id: string;
  jobGradeName?: string | null;
  description?: string | null;
}

export type NewJobGrade = Omit<IJobGrade, 'id'> & { id: null };
