import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IFraudInvestigationReport } from '../fraud-investigation-report.model';
import { FraudInvestigationReportService } from '../service/fraud-investigation-report.service';
import { ITEM_CONFIRMED_EVENT } from 'app/config/navigation.constants';

@Component({
    templateUrl: 'confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
    @Input() message: string | undefined;

    constructor(protected activeModal: NgbActiveModal) {}

    cancel(): void {
        this.activeModal.dismiss();
    }

    confirm(): void {
        this.activeModal.close(ITEM_CONFIRMED_EVENT);
    }
}
