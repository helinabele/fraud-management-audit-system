import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAssignTask, NewAssignTask } from '../assign-task.model';
import { IWhistleBlowerReport } from 'app/entities/whistle-blower-report/whistle-blower-report.model';

export type PartialUpdateAssignTask = Partial<IAssignTask> & Pick<IAssignTask, 'id'>;

type RestOf<T extends IAssignTask | NewAssignTask> = Omit<T, 'taskAssignmentDate' | 'taskStartDate' | 'taskEndDate'> & {
  taskAssignmentDate?: string | null;
  taskStartDate?: string | null;
  taskEndDate?: string | null;
  whistleBlowerReport?: IWhistleBlowerReport | null;
};

export type RestAssignTask = RestOf<IAssignTask>;

export type NewRestAssignTask = RestOf<NewAssignTask>;

export type PartialUpdateRestAssignTask = RestOf<PartialUpdateAssignTask>;

export type EntityResponseType = HttpResponse<IAssignTask>;
export type EntityArrayResponseType = HttpResponse<IAssignTask[]>;

@Injectable({ providedIn: 'root' })
export class AssignTaskService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/assign-tasks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(assignTask: NewAssignTask): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignTask);
    return this.http
      .post<RestAssignTask>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(assignTask: IAssignTask): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignTask);
    return this.http
      .put<RestAssignTask>(`${this.resourceUrl}/${this.getAssignTaskIdentifier(assignTask)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(assignTask: PartialUpdateAssignTask): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignTask);
    return this.http
      .patch<RestAssignTask>(`${this.resourceUrl}/${this.getAssignTaskIdentifier(assignTask)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestAssignTask>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAssignTask[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAssignTaskIdentifier(assignTask: Pick<IAssignTask, 'id'>): string {
    return assignTask.id;
  }

  compareAssignTask(o1: Pick<IAssignTask, 'id'> | null, o2: Pick<IAssignTask, 'id'> | null): boolean {
    return o1 && o2 ? this.getAssignTaskIdentifier(o1) === this.getAssignTaskIdentifier(o2) : o1 === o2;
  }

  addAssignTaskToCollectionIfMissing<Type extends Pick<IAssignTask, 'id'>>(
    assignTaskCollection: Type[],
    ...assignTasksToCheck: (Type | null | undefined)[]
  ): Type[] {
    const assignTasks: Type[] = assignTasksToCheck.filter(isPresent);
    if (assignTasks.length > 0) {
      const assignTaskCollectionIdentifiers = assignTaskCollection.map(assignTaskItem => this.getAssignTaskIdentifier(assignTaskItem)!);
      const assignTasksToAdd = assignTasks.filter(assignTaskItem => {
        const assignTaskIdentifier = this.getAssignTaskIdentifier(assignTaskItem);
        if (assignTaskCollectionIdentifiers.includes(assignTaskIdentifier)) {
          return false;
        }
        assignTaskCollectionIdentifiers.push(assignTaskIdentifier);
        return true;
      });
      return [...assignTasksToAdd, ...assignTaskCollection];
    }
    return assignTaskCollection;
  }

  protected convertDateFromClient<T extends IAssignTask | NewAssignTask | PartialUpdateAssignTask>(assignTask: T): RestOf<T> {
    return {
      ...assignTask,
      taskAssignmentDate: assignTask.taskAssignmentDate?.toJSON() ?? null,
      taskStartDate: assignTask.taskStartDate?.toJSON() ?? null,
      taskEndDate: assignTask.taskEndDate?.toJSON() ?? null,
      whistleBlowerReport: assignTask.whistleBlowerReport, 
    };
  }

  protected convertDateFromServer(restAssignTask: RestAssignTask): IAssignTask {
    return {
      ...restAssignTask,
      taskAssignmentDate: restAssignTask.taskAssignmentDate ? dayjs(restAssignTask.taskAssignmentDate) : undefined,
      taskStartDate: restAssignTask.taskStartDate ? dayjs(restAssignTask.taskStartDate) : undefined,
      taskEndDate: restAssignTask.taskEndDate ? dayjs(restAssignTask.taskEndDate) : undefined,
      whistleBlowerReport: restAssignTask.whistleBlowerReport,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAssignTask>): HttpResponse<IAssignTask> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAssignTask[]>): HttpResponse<IAssignTask[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
