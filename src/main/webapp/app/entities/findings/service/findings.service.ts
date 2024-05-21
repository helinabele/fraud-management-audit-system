import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFindings, NewFindings } from '../findings.model';

export type PartialUpdateFindings = Partial<IFindings> & Pick<IFindings, 'id'>;

export type EntityResponseType = HttpResponse<IFindings>;
export type EntityArrayResponseType = HttpResponse<IFindings[]>;

@Injectable({ providedIn: 'root' })
export class FindingsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/findings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(findings: NewFindings): Observable<EntityResponseType> {
    return this.http.post<IFindings>(this.resourceUrl, findings, { observe: 'response' });
  }

  update(findings: IFindings): Observable<EntityResponseType> {
    return this.http.put<IFindings>(`${this.resourceUrl}/${this.getFindingsIdentifier(findings)}`, findings, { observe: 'response' });
  }

  partialUpdate(findings: PartialUpdateFindings): Observable<EntityResponseType> {
    return this.http.patch<IFindings>(`${this.resourceUrl}/${this.getFindingsIdentifier(findings)}`, findings, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IFindings>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFindings[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAttachment(id: string, attachment: Blob): Observable<IFindings> {
    return this.http.post<IFindings>(`${this.resourceUrl}/${id}/attachments`, attachment);
}

  getFindingsIdentifier(findings: Pick<IFindings, 'id'>): string {
    return findings.id;
  }

  compareFindings(o1: Pick<IFindings, 'id'> | null, o2: Pick<IFindings, 'id'> | null): boolean {
    return o1 && o2 ? this.getFindingsIdentifier(o1) === this.getFindingsIdentifier(o2) : o1 === o2;
  }

  addFindingsToCollectionIfMissing<Type extends Pick<IFindings, 'id'>>(
    findingsCollection: Type[],
    ...findingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const findings: Type[] = findingsToCheck.filter(isPresent);
    if (findings.length > 0) {
      const findingsCollectionIdentifiers = findingsCollection.map(findingsItem => this.getFindingsIdentifier(findingsItem)!);
      const findingsToAdd = findings.filter(findingsItem => {
        const findingsIdentifier = this.getFindingsIdentifier(findingsItem);
        if (findingsCollectionIdentifiers.includes(findingsIdentifier)) {
          return false;
        }
        findingsCollectionIdentifiers.push(findingsIdentifier);
        return true;
      });
      return [...findingsToAdd, ...findingsCollection];
    }
    return findingsCollection;
  }
}
