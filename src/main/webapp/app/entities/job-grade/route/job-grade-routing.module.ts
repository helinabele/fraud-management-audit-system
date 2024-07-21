import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { JobGradeComponent } from '../list/job-grade.component';
import { JobGradeDetailComponent } from '../detail/job-grade-detail.component';
import { JobGradeRoutingResolveService } from './job-grade-routing-resolve.service';
import { JobGradeUpdateComponent } from '../update/job-grade-update.component';

const bankAccountRoute: Routes = [
  {
    path: '',
    component: JobGradeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobGradeDetailComponent,
    resolve: {
      jobGrade: JobGradeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobGradeUpdateComponent,
    resolve: {
      jobGrade: JobGradeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobGradeUpdateComponent,
    resolve: {
      jobGrade: JobGradeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(bankAccountRoute)],
  exports: [RouterModule],
})
export class JobGradeRoutingModule {}
