import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { JobGradeService } from '../service/job-grade.service';
import { IJobGrade } from '../job-grade.model';

@Injectable({ providedIn: 'root' })
export class JobGradeRoutingResolveService implements Resolve<IJobGrade | null> {
  constructor(protected service: JobGradeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobGrade | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((jobGrade: HttpResponse<IJobGrade>) => {
          if (jobGrade.body) {
            return of(jobGrade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
