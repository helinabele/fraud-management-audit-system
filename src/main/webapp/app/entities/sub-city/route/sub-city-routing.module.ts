import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SubCityComponent } from '../list/sub-city.component';
import { SubCityDetailComponent } from '../detail/sub-city-detail.component';
import { SubCityUpdateComponent } from '../update/sub-city-update.component';
import { SubCityRoutingResolveService } from './sub-city-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const subCityRoute: Routes = [
  {
    path: '',
    component: SubCityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubCityDetailComponent,
    resolve: {
      subCity: SubCityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubCityUpdateComponent,
    resolve: {
      subCity: SubCityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubCityUpdateComponent,
    resolve: {
      subCity: SubCityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(subCityRoute)],
  exports: [RouterModule],
})
export class SubCityRoutingModule {}
