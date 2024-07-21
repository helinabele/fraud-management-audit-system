import { Component, OnInit } from "@angular/core";
import { ISignature } from "../signature.model";
import { DataUtils, FileLoadError } from "app/core/util/data-util.service";
import { ActivatedRoute } from "@angular/router";
import { SignatureService } from "../service/signature.service";
import { SignatureFormGroup, SignatureFormService } from "./signature-form.service";
import { AlertError } from "app/shared/alert/alert-error.model";
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { Observable, finalize } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Component({
    selector: 'jhi-signature-update',
    templateUrl: './signature-update.component.html'
})
export class SignatureUpdateComponent implements OnInit {
    isSaving = false;
    signature: ISignature | null = null;

    editForm: SignatureFormGroup = this.signatureFormService.createSignatureFormGroup();

    constructor(
        protected dataUtils: DataUtils,
        protected eventManager: EventManager,
        protected signatureService: SignatureService,
        protected signatureFormService: SignatureFormService,
        protected activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ signature }) => {
            this.signature = signature;
            if (signature) {
                this.updateForm(signature);
            }
        })
    }

    byteSize(base64String: string): void {
        this.dataUtils.byteSize(base64String);
    }

    openFile(base64String: string, contentType: string | null | undefined): void {
        this.dataUtils.openFile(base64String, contentType);
    }

    setFileData(event: Event, field: string, isImage: boolean): void {
        this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
            error: (err: FileLoadError) =>
                this.eventManager.broadcast(new EventWithContent<AlertError>('fraudMgtApp.error', { ...err, key: 'error.file.' + err.key })),
        });
    }
    previousState(): void {
        window.history.back();
    }
    save(): void {
        this.isSaving = true;
        const signature = this.signatureFormService.getSignature(this.editForm);
        if (signature.id !== null) {
            this.subscribeToSaveResponse(this.signatureService.update(signature));
        } else {
            this.subscribeToSaveResponse(this.signatureService.create(signature));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISignature>>): void {
        result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
            next: () => this.onSaveSucess(),
            error: () => this.onSaveError(),
        })
    }
    protected onSaveSucess(): void {
        this.previousState();
    }
    protected onSaveError(): void {
        // Api for inheritance.
    }
    protected onSaveFinalize(): void {
        this.isSaving = false;
    }
    protected updateForm(signature: ISignature): void {
        this.signature = signature;
        this.signatureFormService.resetForm(this.editForm, signature);
    }
}