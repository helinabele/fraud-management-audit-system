import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFraudInvestigationReport, NewFraudInvestigationReport } from '../fraud-investigation-report.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../update/confirmation-dialog.component';

export type PartialUpdateFraudInvestigationReport = Partial<IFraudInvestigationReport> & Pick<IFraudInvestigationReport, 'id'>;

type RestOf<T extends IFraudInvestigationReport | NewFraudInvestigationReport> = Omit<T, 'publicationDate'> & {
  publicationDate?: string | null;
};

export type RestFraudInvestigationReport = RestOf<IFraudInvestigationReport>;

export type NewRestFraudInvestigationReport = RestOf<NewFraudInvestigationReport>;

export type PartialUpdateRestFraudInvestigationReport = RestOf<PartialUpdateFraudInvestigationReport>;

export type EntityResponseType = HttpResponse<IFraudInvestigationReport>;
export type EntityArrayResponseType = HttpResponse<IFraudInvestigationReport[]>;

@Injectable({ providedIn: 'root' })
export class FraudInvestigationReportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fraud-investigation-reports');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService,
    private modalService: NgbModal
  ) { }

  create(fraudInvestigationReport: NewFraudInvestigationReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fraudInvestigationReport);
    return this.http
      .post<RestFraudInvestigationReport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fraudInvestigationReport: IFraudInvestigationReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fraudInvestigationReport);
    return this.http
      .put<RestFraudInvestigationReport>(
        `${this.resourceUrl}/${this.getFraudInvestigationReportIdentifier(fraudInvestigationReport)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  submitReport(fraudInvestigationReport: IFraudInvestigationReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fraudInvestigationReport);
    return this.http
        .put<RestFraudInvestigationReport>(
            `${this.resourceUrl}/${fraudInvestigationReport.id}`,
            copy,
            { observe: 'response' }
        )
        .pipe(map(res => this.convertResponseFromServer(res)));
}

  partialUpdate(fraudInvestigationReport: PartialUpdateFraudInvestigationReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fraudInvestigationReport);
    return this.http
      .patch<RestFraudInvestigationReport>(
        `${this.resourceUrl}/${this.getFraudInvestigationReportIdentifier(fraudInvestigationReport)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFraudInvestigationReport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFraudInvestigationReport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  confirm(message: string): Observable<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.componentInstance.message = message;
    return from(modalRef.result);
  }

  getFraudInvestigationReportIdentifier(fraudInvestigationReport: Pick<IFraudInvestigationReport, 'id'>): string {
    return fraudInvestigationReport.id;
  }

  compareFraudInvestigationReport(
    o1: Pick<IFraudInvestigationReport, 'id'> | null,
    o2: Pick<IFraudInvestigationReport, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getFraudInvestigationReportIdentifier(o1) === this.getFraudInvestigationReportIdentifier(o2) : o1 === o2;
  }

  addFraudInvestigationReportToCollectionIfMissing<Type extends Pick<IFraudInvestigationReport, 'id'>>(
    fraudInvestigationReportCollection: Type[],
    ...fraudInvestigationReportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fraudInvestigationReports: Type[] = fraudInvestigationReportsToCheck.filter(isPresent);
    if (fraudInvestigationReports.length > 0) {
      const fraudInvestigationReportCollectionIdentifiers = fraudInvestigationReportCollection.map(
        fraudInvestigationReportItem => this.getFraudInvestigationReportIdentifier(fraudInvestigationReportItem)!
      );
      const fraudInvestigationReportsToAdd = fraudInvestigationReports.filter(fraudInvestigationReportItem => {
        const fraudInvestigationReportIdentifier = this.getFraudInvestigationReportIdentifier(fraudInvestigationReportItem);
        if (fraudInvestigationReportCollectionIdentifiers.includes(fraudInvestigationReportIdentifier)) {
          return false;
        }
        fraudInvestigationReportCollectionIdentifiers.push(fraudInvestigationReportIdentifier);
        return true;
      });
      return [...fraudInvestigationReportsToAdd, ...fraudInvestigationReportCollection];
    }
    return fraudInvestigationReportCollection;
  }

  protected convertDateFromClient<
    T extends IFraudInvestigationReport | NewFraudInvestigationReport | PartialUpdateFraudInvestigationReport
  >(fraudInvestigationReport: T): RestOf<T> {
    return {
      ...fraudInvestigationReport,
      publicationDate: fraudInvestigationReport.publicationDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFraudInvestigationReport: RestFraudInvestigationReport): IFraudInvestigationReport {
    return {
      ...restFraudInvestigationReport,
      publicationDate: restFraudInvestigationReport.publicationDate ? dayjs(restFraudInvestigationReport.publicationDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFraudInvestigationReport>): HttpResponse<IFraudInvestigationReport> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFraudInvestigationReport[]>): HttpResponse<IFraudInvestigationReport[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
