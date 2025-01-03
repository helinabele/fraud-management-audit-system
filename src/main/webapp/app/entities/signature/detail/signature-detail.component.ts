import { Component, OnInit } from "@angular/core";
import { ISignature } from "../signature.model";
import { DataUtils } from "app/core/util/data-util.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'jhi-signature-detail',
    templateUrl: './signature-detail.component.html',
})
export class SignatureDetailComponent implements OnInit {
    signature: ISignature | null = null;

    constructor(
        protected dataUtils: DataUtils,
        protected activatedRoute: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ signature }) => {
            this.signature = signature;
        });
    }

    byteSize(base64String: string): string {
        return this.dataUtils.byteSize(base64String);
    }

    openFile(base64String: string, contentType: string | null | undefined): void {
        this.dataUtils.openFile(base64String, contentType);
    }
    previousState(): void {
        window.history.back();
    }
}