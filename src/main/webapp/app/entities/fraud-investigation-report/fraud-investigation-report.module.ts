import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FraudInvestigationReportComponent } from './list/fraud-investigation-report.component';
import { FraudInvestigationReportDetailComponent } from './detail/fraud-investigation-report-detail.component';
import { FraudInvestigationReportUpdateComponent } from './update/fraud-investigation-report-update.component';
import { FraudInvestigationReportDeleteDialogComponent } from './delete/fraud-investigation-report-delete-dialog.component';
import { FraudInvestigationReportRoutingModule } from './route/fraud-investigation-report-routing.module';
import { ConfirmationDialogComponent } from './update/confirmation-dialog.component';

@NgModule({
  imports: [SharedModule, FraudInvestigationReportRoutingModule],
  declarations: [
    FraudInvestigationReportComponent,
    FraudInvestigationReportDetailComponent,
    FraudInvestigationReportUpdateComponent,
    FraudInvestigationReportDeleteDialogComponent,
    ConfirmationDialogComponent 
  ],
})
export class FraudInvestigationReportModule {}
