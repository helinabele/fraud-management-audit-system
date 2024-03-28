import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWhistleBlowerReport } from '../whistle-blower-report.model';
import { WhistleBlowerReportService } from '../service/whistle-blower-report.service';
import { ITEM_REJECTED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './whistle-blower-report-reject-dialog.component.html',
})
export class WhistleBlowerReportRejectDialogComponent {
  whistleBlowerReport?: IWhistleBlowerReport;

  constructor(protected whistleBlowerReportService: WhistleBlowerReportService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmReject(id: string): void {
    this.whistleBlowerReportService.rejectReport(id).subscribe(() => {
      this.activeModal.close(ITEM_REJECTED_EVENT);
    });
  }
}
