import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WhistleBlowerReportComponent } from './list/whistle-blower-report.component';
import { WhistleBlowerReportDetailComponent } from './detail/whistle-blower-report-detail.component';
import { WhistleBlowerReportUpdateComponent } from './update/whistle-blower-report-update.component';
import { WhistleBlowerReportDeleteDialogComponent } from './delete/whistle-blower-report-delete-dialog.component';
import { WhistleBlowerReportRoutingModule } from './route/whistle-blower-report-routing.module';
import { AssignTaskUpdateComponent } from '../assign-task/update/assign-task-update.component';
import { WhistleBlowerReportRejectDialogComponent } from './reject/whistle-blower-report-reject-dialog.component';
import { TrackingNumberModalComponent } from './tracking-number-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatButtonModule } from '@angular/material/button'; // If you use buttons
import { MatTooltipModule } from '@angular/material/tooltip'; // If you use tooltips
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [SharedModule, WhistleBlowerReportRoutingModule, MatIconModule, MatCardModule, MatButtonModule, MatTooltipModule, OverlayModule ],
  declarations: [
    WhistleBlowerReportComponent,
    WhistleBlowerReportDetailComponent,
    WhistleBlowerReportUpdateComponent,
    WhistleBlowerReportDeleteDialogComponent,
    WhistleBlowerReportRejectDialogComponent,
    AssignTaskUpdateComponent,
    TrackingNumberModalComponent
  ],
})
export class WhistleBlowerReportModule {}
