import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ASC } from "app/config/navigation.constants";
import { UserRouteAccessService } from "app/core/auth/user-route-access.service";
import { ReportRepositoryComponent } from "../list/report-repository.component";
import { ReportRepositoryDetailComponent } from "../detail/report-repository-detail.component";
import { ReportRepositoryUpdateComponent } from "../update/report-repository-update.component";
import { ReportRepositoryRoutingResolveService } from "./report-repository-routing-resolve.service";

const reportRepositoryRoute: Routes = [
    {
        path: '',
        component: ReportRepositoryComponent,
        data: {
            defaultSort: 'id' + ASC,
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        component: ReportRepositoryDetailComponent,
        resolve: {
            reportRepository: ReportRepositoryRoutingResolveService,
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'new',
        component: ReportRepositoryUpdateComponent,
        resolve: {
            reportRepository: ReportRepositoryRoutingResolveService,
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReportRepositoryUpdateComponent,
        resolve: {
            reportRepository: ReportRepositoryRoutingResolveService,
        },
        canActivate: [UserRouteAccessService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(reportRepositoryRoute)],
    exports: [RouterModule],
})
export class ReportRepositoryRoutingModule { }