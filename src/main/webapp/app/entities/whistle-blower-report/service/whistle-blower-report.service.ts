import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWhistleBlowerReport, NewWhistleBlowerReport } from '../whistle-blower-report.model';

export type PartialUpdateWhistleBlowerReport = Partial<IWhistleBlowerReport> & Pick<IWhistleBlowerReport, 'id'>;

export type EntityResponseType = HttpResponse<IWhistleBlowerReport>;
export type EntityArrayResponseType = HttpResponse<IWhistleBlowerReport[]>;

@Injectable({ providedIn: 'root' })
export class WhistleBlowerReportService {
  selectedReportSubject = new BehaviorSubject<IWhistleBlowerReport | null>(null);
  selectedReport$ = this.selectedReportSubject.asObservable();
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/whistle-blower-reports');
  private selectedReport: IWhistleBlowerReport | null = null;

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) { }

  findByTrackingNumber(trackingNumber: string): Observable<IWhistleBlowerReport> {
    return this.http.get<IWhistleBlowerReport>(`${this.resourceUrl}/tracking/${trackingNumber}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Error:', error);
        return throwError(() => new Error('Error fetching whistle blower data'));
      })
    );
  }

/*   findByTrackingNumber(trackingNumber: string): Observable<IWhistleBlowerReport> {
    return this.http.get<IWhistleBlowerReport>(`${this.resourceUrl}/tracking/${trackingNumber}`);
  }
 */
 /*    findByTrackingNumber(trackingNumber: string): Observable<IWhistleBlowerReport> {
      return this.http.get<IWhistleBlowerReport>(`${this.resourceUrl}/tracking/${trackingNumber}`, { responseType: 'json' }).pipe(
          catchError((error: HttpErrorResponse) => {
              console.error('API Error:', error);
              return throwError(() => new Error('Error fetching whistleBlowerReport data'));
          })
      );
  } */
  
  setSelectedReport(report: IWhistleBlowerReport): void {
    this.selectedReportSubject.next(report);
  }

  // setSelectedReport(report: IWhistleBlowerReport): void {
  //   this.selectedReport = report;
  // }

  assignReport(reportId: string): Observable<any> {
    const url = `${this.resourceUrl}/${reportId}/assign`; // Adjust the API endpoint for assigning a report
    return this.http.put(url, null); // Adjust the HTTP method and payload as per your API
  }

  getSelectedReport(): IWhistleBlowerReport | null {
    return this.selectedReport;
  }

  /*   updateIsAssigned(whistleBlowerReport: IWhistleBlowerReport, isAssigned: boolean): Observable<IWhistleBlowerReport> {
      const url = `${this.resourceUrl}/${this.getWhistleBlowerReportIdentifier(whistleBlowerReport)}`;
      const updatedReport: Partial<IWhistleBlowerReport> = { isAssigned }; // Create a partial object with only the isAssigned property
    
      return this.http.put<IWhistleBlowerReport>(url, updatedReport);
    } */

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

  updateStatus(id: string, newStatus: string): Observable<IWhistleBlowerReport> {
    return this.http.put<IWhistleBlowerReport>(`${this.resourceUrl}/${id}/status`, newStatus);
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

  // rejectReport(id: string): Observable<HttpResponse<{}>> {
  //   return this.http.put(`${this.resourceUrl}/${id}/reject`, null, {observe: 'response'});
  // }

  rejectReport(id: string): Observable<any> {
    return this.http.put(`${this.resourceUrl}/${id}/reject`, {});
  }

  /*   getRejectedReports(): Observable<any[]> {
      return this.http.get<any[]>(`${this.resourceUrl}/rejected-reports`);
    } */
  getRejectedReports(): Observable<EntityArrayResponseType> {
    return this.http.get<IWhistleBlowerReport[]>(`${this.resourceUrl}/rejected-reports`, { observe: 'response' });
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
