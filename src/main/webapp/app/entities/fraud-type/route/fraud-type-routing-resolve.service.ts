import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFraudType } from '../fraud-type.model';
import { FraudTypeService } from '../service/fraud-type.service';

@Injectable({ providedIn: 'root' })
export class FraudTypeRoutingResolveService implements Resolve<IFraudType | null> {
  constructor(protected service: FraudTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFraudType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fraudType: HttpResponse<IFraudType>) => {
          if (fraudType.body) {
            return of(fraudType.body);
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
