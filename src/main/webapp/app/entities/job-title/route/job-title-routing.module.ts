import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { JobTitleComponent } from '../list/job-title.component';
import { JobTitleDetailComponent } from '../detail/job-title-detail.component';
import { JobTitleUpdateComponent } from '../update/job-title-update.component';
import { JobTitleRoutingResolveService } from './job-title-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const jobTitleRoute: Routes = [
  {
    path: '',
    component: JobTitleComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobTitleDetailComponent,
    resolve: {
      jobTitle: JobTitleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobTitleUpdateComponent,
    resolve: {
      jobTitle: JobTitleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobTitleUpdateComponent,
    resolve: {
      jobTitle: JobTitleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jobTitleRoute)],
  exports: [RouterModule],
})
export class JobTitleRoutingModule {}
