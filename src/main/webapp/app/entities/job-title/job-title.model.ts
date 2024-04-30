export interface IJobTitle {
  id: string;
  jobTitleName?: string | null;
  description?: string | null;
}

export type NewJobTitle = Omit<IJobTitle, 'id'> & { id: null };
