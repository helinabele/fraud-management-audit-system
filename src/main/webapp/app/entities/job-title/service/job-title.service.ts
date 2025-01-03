import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobTitle, NewJobTitle } from '../job-title.model';

export type PartialUpdateJobTitle = Partial<IJobTitle> & Pick<IJobTitle, 'id'>;

export type EntityResponseType = HttpResponse<IJobTitle>;
export type EntityArrayResponseType = HttpResponse<IJobTitle[]>;

@Injectable({ providedIn: 'root' })
export class JobTitleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/job-titles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(jobTitle: NewJobTitle): Observable<EntityResponseType> {
    return this.http.post<IJobTitle>(this.resourceUrl, jobTitle, { observe: 'response' });
  }

  update(jobTitle: IJobTitle): Observable<EntityResponseType> {
    return this.http.put<IJobTitle>(`${this.resourceUrl}/${this.getJobTitleIdentifier(jobTitle)}`, jobTitle, {
      observe: 'response',
    });
  }

  partialUpdate(jobTitle: PartialUpdateJobTitle): Observable<EntityResponseType> {
    return this.http.patch<IJobTitle>(`${this.resourceUrl}/${this.getJobTitleIdentifier(jobTitle)}`, jobTitle, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IJobTitle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobTitle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getJobTitleIdentifier(jobTitle: Pick<IJobTitle, 'id'>): string {
    return jobTitle.id;
  }

  compareJobTitle(o1: Pick<IJobTitle, 'id'> | null, o2: Pick<IJobTitle, 'id'> | null): boolean {
    return o1 && o2 ? this.getJobTitleIdentifier(o1) === this.getJobTitleIdentifier(o2) : o1 === o2;
  }

  addJobTitleToCollectionIfMissing<Type extends Pick<IJobTitle, 'id'>>(
    jobTitleCollection: Type[],
    ...jobTitlesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobTitles: Type[] = jobTitlesToCheck.filter(isPresent);
    if (jobTitles.length > 0) {
      const jobTitleCollectionIdentifiers = jobTitleCollection.map(
        jobTitleItem => this.getJobTitleIdentifier(jobTitleItem)!
      );
      const jobTitlesToAdd = jobTitles.filter(jobTitleItem => {
        const jobTitleIdentifier = this.getJobTitleIdentifier(jobTitleItem);
        if (jobTitleCollectionIdentifiers.includes(jobTitleIdentifier)) {
          return false;
        }
        jobTitleCollectionIdentifiers.push(jobTitleIdentifier);
        return true;
      });
      return [...jobTitlesToAdd, ...jobTitleCollection];
    }
    return jobTitleCollection;
  }
}
