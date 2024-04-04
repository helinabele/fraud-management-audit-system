import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReportRepository } from "../report-repository.model";
import { ReportRepositoryService } from "../service/report-repository.service";


@Injectable({ providedIn: 'root' })
export class ReportRepositoryRoutingResolveService implements Resolve<IReportRepository | null>{
    constructor(
        protected service: ReportRepositoryService,
        protected router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IReportRepository | null | never> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                mergeMap((reportRepository: HttpResponse<IReportRepository>) => {
                    if (reportRepository.body) {
                        return of(reportRepository.body);
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