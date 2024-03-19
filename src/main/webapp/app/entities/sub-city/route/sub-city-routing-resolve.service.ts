import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISubCity } from '../sub-city.model';
import { SubCityService } from '../service/sub-city.service';

@Injectable({ providedIn: 'root' })
export class SubCityRoutingResolveService implements Resolve<ISubCity | null> {
  constructor(protected service: SubCityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubCity | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((subCity: HttpResponse<ISubCity>) => {
          if (subCity.body) {
            return of(subCity.body);
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
