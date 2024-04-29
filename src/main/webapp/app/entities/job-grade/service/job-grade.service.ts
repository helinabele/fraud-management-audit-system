import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobGrade, NewJobGrade } from '../job-grade.model';

export type PartialUpdateJobGrade = Partial<IJobGrade> & Pick<IJobGrade, 'id'>;

export type EntityResponseType = HttpResponse<IJobGrade>;
export type EntityArrayResponseType = HttpResponse<IJobGrade[]>;

@Injectable({ providedIn: 'root' })
export class JobGradeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/job-grades');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(jobGrade: NewJobGrade): Observable<EntityResponseType> {
    return this.http.post<IJobGrade>(this.resourceUrl, jobGrade, { observe: 'response' });
  }

  update(jobGrade: IJobGrade): Observable<EntityResponseType> {
    return this.http.put<IJobGrade>(`${this.resourceUrl}/${this.getJobGradeIdentifier(jobGrade)}`, jobGrade, {
      observe: 'response',
    });
  }

  partialUpdate(jobGrade: PartialUpdateJobGrade): Observable<EntityResponseType> {
    return this.http.patch<IJobGrade>(`${this.resourceUrl}/${this.getJobGradeIdentifier(jobGrade)}`, jobGrade, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IJobGrade>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobGrade[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getJobGradeIdentifier(jobGrade: Pick<IJobGrade, 'id'>): string {
    return jobGrade.id;
  }

  compareJobGrade(o1: Pick<IJobGrade, 'id'> | null, o2: Pick<IJobGrade, 'id'> | null): boolean {
    return o1 && o2 ? this.getJobGradeIdentifier(o1) === this.getJobGradeIdentifier(o2) : o1 === o2;
  }

  addJobGradeToCollectionIfMissing<Type extends Pick<IJobGrade, 'id'>>(
    jobGradeCollection: Type[],
    ...jobGradesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const jobGrades: Type[] = jobGradesToCheck.filter(isPresent);
    if (jobGrades.length > 0) {
      const jobGradeCollectionIdentifiers = jobGradeCollection.map(
        jobGradeItem => this.getJobGradeIdentifier(jobGradeItem)!
      );
      const jobGradesToAdd = jobGrades.filter(jobGradeItem => {
        const jobGradeIdentifier = this.getJobGradeIdentifier(jobGradeItem);
        if (jobGradeCollectionIdentifiers.includes(jobGradeIdentifier)) {
          return false;
        }
        jobGradeCollectionIdentifiers.push(jobGradeIdentifier);
        return true;
      });
      return [...jobGradesToAdd, ...jobGradeCollection];
    }
    return jobGradeCollection;
  }
}
