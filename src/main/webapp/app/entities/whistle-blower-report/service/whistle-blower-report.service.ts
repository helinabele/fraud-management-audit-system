import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWhistleBlowerReport, NewWhistleBlowerReport } from '../whistle-blower-report.model';

export type PartialUpdateWhistleBlowerReport = Partial<IWhistleBlowerReport> & Pick<IWhistleBlowerReport, 'id'>;

export type EntityResponseType = HttpResponse<IWhistleBlowerReport>;
export type EntityArrayResponseType = HttpResponse<IWhistleBlowerReport[]>;

@Injectable({ providedIn: 'root' })
export class WhistleBlowerReportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/whistle-blower-reports');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}
  
  getwhistleBlowerReports(): Observable<IWhistleBlowerReport[]> {
    return this.http.get<IWhistleBlowerReport[]>(this.resourceUrl);
  }
  
  create(whistleBlowerReport: NewWhistleBlowerReport): Observable<EntityResponseType> {
    return this.http.post<IWhistleBlowerReport>(this.resourceUrl, whistleBlowerReport, { observe: 'response' });
  }

  update(whistleBlowerReport: IWhistleBlowerReport): Observable<EntityResponseType> {
    return this.http.put<IWhistleBlowerReport>(
      `${this.resourceUrl}/${this.getWhistleBlowerReportIdentifier(whistleBlowerReport)}`,
      whistleBlowerReport,
      { observe: 'response' }
    );
  }

  partialUpdate(whistleBlowerReport: PartialUpdateWhistleBlowerReport): Observable<EntityResponseType> {
    return this.http.patch<IWhistleBlowerReport>(
      `${this.resourceUrl}/${this.getWhistleBlowerReportIdentifier(whistleBlowerReport)}`,
      whistleBlowerReport,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IWhistleBlowerReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWhistleBlowerReport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWhistleBlowerReportIdentifier(whistleBlowerReport: Pick<IWhistleBlowerReport, 'id'>): string {
    return whistleBlowerReport.id;
  }

  compareWhistleBlowerReport(o1: Pick<IWhistleBlowerReport, 'id'> | null, o2: Pick<IWhistleBlowerReport, 'id'> | null): boolean {
    return o1 && o2 ? this.getWhistleBlowerReportIdentifier(o1) === this.getWhistleBlowerReportIdentifier(o2) : o1 === o2;
  }

  addWhistleBlowerReportToCollectionIfMissing<Type extends Pick<IWhistleBlowerReport, 'id'>>(
    whistleBlowerReportCollection: Type[],
    ...whistleBlowerReportsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const whistleBlowerReports: Type[] = whistleBlowerReportsToCheck.filter(isPresent);
    if (whistleBlowerReports.length > 0) {
      const whistleBlowerReportCollectionIdentifiers = whistleBlowerReportCollection.map(
        whistleBlowerReportItem => this.getWhistleBlowerReportIdentifier(whistleBlowerReportItem)!
      );
      const whistleBlowerReportsToAdd = whistleBlowerReports.filter(whistleBlowerReportItem => {
        const whistleBlowerReportIdentifier = this.getWhistleBlowerReportIdentifier(whistleBlowerReportItem);
        if (whistleBlowerReportCollectionIdentifiers.includes(whistleBlowerReportIdentifier)) {
          return false;
        }
        whistleBlowerReportCollectionIdentifiers.push(whistleBlowerReportIdentifier);
        return true;
      });
      return [...whistleBlowerReportsToAdd, ...whistleBlowerReportCollection];
    }
    return whistleBlowerReportCollection;
  }
}
