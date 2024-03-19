export interface IDivision {
  id: string;
  divisionName?: string | null;
  description?: string | null;
}

export type NewDivision = Omit<IDivision, 'id'> & { id: null };
