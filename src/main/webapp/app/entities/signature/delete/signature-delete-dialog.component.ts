import { Component, OnInit } from "@angular/core";
import { ISignature } from "../signature.model";
import { SignatureService } from "../service/signature.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ITEM_DELETED_EVENT } from "app/config/navigation.constants";

@Component({
    selector: 'jhi-signature-delete-dialog',
    templateUrl: './signature-delete-dialog.component.html',
})
export class SignatureDeleteDialogComponent{
signature?: ISignature;
constructor(
    protected signatureService: SignatureService,
    protected activeModal: NgbActiveModal
){}
    cancel(): void{
        this.activeModal.dismiss();
    }

    confirmDelete(id: string): void{
        this.signatureService.delete(id).subscribe(() => {
            this.activeModal.close(ITEM_DELETED_EVENT);
        })
    }
}