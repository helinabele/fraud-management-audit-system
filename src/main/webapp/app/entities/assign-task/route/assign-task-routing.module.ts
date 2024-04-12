import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AssignTaskComponent } from '../list/assign-task.component';
import { AssignTaskDetailComponent } from '../detail/assign-task-detail.component';
import { AssignTaskUpdateComponent } from '../update/assign-task-update.component';
import { AssignTaskRoutingResolveService } from './assign-task-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';
import { FraudInvestigationReportUpdateComponent } from 'app/entities/fraud-investigation-report/update/fraud-investigation-report-update.component';

const assignTaskRoute: Routes = [
  {
    path: '',
    component: AssignTaskComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AssignTaskDetailComponent,
    resolve: {
      assignTask: AssignTaskRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AssignTaskUpdateComponent,
    resolve: {
      assignTask: AssignTaskRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AssignTaskUpdateComponent,
    resolve: {
      assignTask: AssignTaskRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/assign',
    component: AssignTaskUpdateComponent,
    resolve: {
      task: AssignTaskRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/startInvestigation',
    component: FraudInvestigationReportUpdateComponent,
    resolve: {
      task: AssignTaskRoutingResolveService
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(assignTaskRoute)],
  exports: [RouterModule],
})
export class AssignTaskRoutingModule {}
