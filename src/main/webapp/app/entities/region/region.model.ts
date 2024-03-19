export interface IRegion {
  id: string;
  regionName?: string | null;
  description?: string | null;
}

export type NewRegion = Omit<IRegion, 'id'> & { id: null };
