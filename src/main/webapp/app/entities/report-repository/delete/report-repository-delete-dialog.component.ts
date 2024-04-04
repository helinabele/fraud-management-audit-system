import { Component, OnInit } from "@angular/core";
import { IReportRepository } from "../report-repository.model";
import { ReportRepositoryService } from "../service/report-repository.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ITEM_DELETED_EVENT } from "app/config/navigation.constants";

@Component({
    selector: 'jhi-report-repository-delete-dialog',
    templateUrl: './report-repository-delete-dialog.component.html',
})
export class ReportRepositoryDeleteDialogComponent{
reportRepository?: IReportRepository;
constructor(
    protected reportRepositoryService: ReportRepositoryService,
    protected activeModal: NgbActiveModal
){}
    cancel(): void{
        this.activeModal.dismiss();
    }

    confirmDelete(id: string): void{
        this.reportRepositoryService.delete(id).subscribe(() => {
            this.activeModal.close(ITEM_DELETED_EVENT);
        })
    }
}