import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WhistleBlowerReportComponent } from '../list/whistle-blower-report.component';
import { WhistleBlowerReportDetailComponent } from '../detail/whistle-blower-report-detail.component';
import { WhistleBlowerReportUpdateComponent } from '../update/whistle-blower-report-update.component';
import { WhistleBlowerReportRoutingResolveService } from './whistle-blower-report-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';
import { AssignTaskUpdateComponent } from 'app/entities/assign-task/update/assign-task-update.component';
import { RejectedReportComponent } from '../rejected-report/rejected-report.component';

const whistleBlowerReportRoute: Routes = [
  {
    path: '',
    component: WhistleBlowerReportComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
  },
  {
    path: ':id/view',
    component: WhistleBlowerReportDetailComponent,
    resolve: {
      whistleBlowerReport: WhistleBlowerReportRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: WhistleBlowerReportUpdateComponent,
    resolve: {
      whistleBlowerReport: WhistleBlowerReportRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: WhistleBlowerReportUpdateComponent,
    resolve: {
      whistleBlowerReport: WhistleBlowerReportRoutingResolveService,
    },
  },
  {
    path: ':id/assign',
    component: AssignTaskUpdateComponent,
    resolve: {
      task: WhistleBlowerReportRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'rejected-reports',
    component: RejectedReportComponent,
    resolve: {
      task: WhistleBlowerReportRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(whistleBlowerReportRoute)],
  exports: [RouterModule],
})
export class WhistleBlowerReportRoutingModule {}
