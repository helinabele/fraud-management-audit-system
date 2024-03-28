import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WhistleBlowerReportComponent } from './list/whistle-blower-report.component';
import { WhistleBlowerReportDetailComponent } from './detail/whistle-blower-report-detail.component';
import { WhistleBlowerReportUpdateComponent } from './update/whistle-blower-report-update.component';
import { WhistleBlowerReportDeleteDialogComponent } from './delete/whistle-blower-report-delete-dialog.component';
import { WhistleBlowerReportRoutingModule } from './route/whistle-blower-report-routing.module';
import { AssignTaskUpdateComponent } from '../assign-task/update/assign-task-update.component';
import { WhistleBlowerReportRejectDialogComponent } from './reject/whistle-blower-report-reject-dialog.component';

@NgModule({
  imports: [SharedModule, WhistleBlowerReportRoutingModule],
  declarations: [
    WhistleBlowerReportComponent,
    WhistleBlowerReportDetailComponent,
    WhistleBlowerReportUpdateComponent,
    WhistleBlowerReportDeleteDialogComponent,
    WhistleBlowerReportRejectDialogComponent,
    AssignTaskUpdateComponent
  ],
})
export class WhistleBlowerReportModule {}
