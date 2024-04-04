import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ReportRepositoryUpdateComponent } from "./update/report-repository-update.component";
import { ReportRepositoryDetailComponent } from "./detail/report-repository-detail.component";
import { ReportRepositoryDeleteDialogComponent } from "./delete/report-repository-delete-dialog.component";
import { ReportRepositoryComponent } from "./list/report-repository.component";
import { ReportRepositoryRoutingModule } from "./route/report-repository-routing.module";

@NgModule({
    imports: [SharedModule, ReportRepositoryRoutingModule],
    declarations: [
        ReportRepositoryComponent,
        ReportRepositoryDetailComponent,
        ReportRepositoryUpdateComponent,
        ReportRepositoryDeleteDialogComponent
    ]
})

export class ReportRepositoryModule { }