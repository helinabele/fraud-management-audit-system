export interface IReportRepository {
    id: string;
    reportRepositoryName?: string | null;
    attachment?: string | null;
    attachmentContentType?: string | null;
    description?: string | null;
}

export type NewReportRepository = Omit<IReportRepository, 'id'> & { id: null };