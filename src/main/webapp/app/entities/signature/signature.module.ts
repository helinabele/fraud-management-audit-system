import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { SignatureUpdateComponent } from "./update/signature-update.component";
import { SignatureDetailComponent } from "./detail/signature-detail.component";
import { SignatureDeleteDialogComponent } from "./delete/signature-delete-dialog.component";
import { SignatureComponent } from "./list/signature.component";
import { SignatureRoutingModule } from "./route/signature-routing.module";

@NgModule({
    imports: [SharedModule, SignatureRoutingModule],
    declarations: [
        SignatureComponent,
        SignatureDetailComponent,
        SignatureUpdateComponent,
        SignatureDeleteDialogComponent
    ]
})

export class SignatureModule { }