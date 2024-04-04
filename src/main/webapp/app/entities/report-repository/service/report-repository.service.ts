import { HttpClient, HttpResponse } from "@angular/common/http";
import { IReportRepository, NewReportRepository } from "../report-repository.model";
import { Injectable } from "@angular/core";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { Observable } from "rxjs";
import { createRequestOption } from "app/core/request/request-util";
import { isPresent } from "app/core/util/operators";

export type PartialUpdateReportRepository = Partial<IReportRepository> & Pick<IReportRepository, 'id'>;

export type EntityResponseType = HttpResponse<IReportRepository>;
export type EntityArrayResponseType = HttpResponse<IReportRepository[]>;

@Injectable({ providedIn: 'root' })
export class ReportRepositoryService {
    protected resourceUrl = this.applicationConfigService.getEndpointFor('api/report-repository');

    constructor(protected http: HttpClient,
        protected applicationConfigService: ApplicationConfigService) { }

    create(reportRepository: NewReportRepository): Observable<EntityResponseType> {
        return this.http.post<IReportRepository>(this.resourceUrl, reportRepository, { observe: 'response' });
    }

    update(reportRepository: IReportRepository): Observable<EntityResponseType> {
        return this.http.put<IReportRepository>(`${this.resourceUrl}/${this.getReportRepositoryIdentifier(reportRepository)}`, reportRepository, { observe: 'response' })
    }

    partialUpdate(reportRepository: PartialUpdateReportRepository): Observable<EntityResponseType> {
        return this.http.patch<IReportRepository>(`${this.resourceUrl}/${this.getReportRepositoryIdentifier(reportRepository)}`, reportRepository, { observe: 'response' });
    }
    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IReportRepository>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReportRepository[]>(this.resourceUrl, { params: options, observe: 'response' });
    }
    delete(id: string): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' })
    }
    getReportRepositoryIdentifier(reportRepository: Pick<IReportRepository, 'id'>): string {
        return reportRepository.id;
    }

    compareReportRepository(o1: Pick<IReportRepository, 'id'> | null, o2: Pick<IReportRepository, 'id'> | null): boolean {
        return o1 && o2 ? this.getReportRepositoryIdentifier(o1) === this.getReportRepositoryIdentifier(o2) : o1 === o2;
    }

    addReportRepositoryToCollectionIfMissing<Type extends Pick<IReportRepository, 'id'>>(
        reportRepositoryCollection: Type[],
        ...reportRepositoryToCheck: (Type | null | undefined)[]
    ): Type[] {
        const reportRepository: Type[] = reportRepositoryToCheck.filter(isPresent);
        if (reportRepository.length > 0) {
            const reportRepositoryCollectionIdentifiers = reportRepositoryCollection.map(reportRepositoryItem => this.getReportRepositoryIdentifier(reportRepositoryItem)!);
            const reportRepositoryToAdd = reportRepository.filter(reportRepositoryItem => {
                const reportRepositoryIdentifier = this.getReportRepositoryIdentifier(reportRepositoryItem);
                if (reportRepositoryCollectionIdentifiers.includes(reportRepositoryIdentifier)) {
                    return false;
                }
                reportRepositoryCollectionIdentifiers.push(reportRepositoryIdentifier);
                return true;
            });
            return [...reportRepositoryToAdd, ...reportRepositoryCollection];
        }
        return reportRepositoryCollection;
    }
}