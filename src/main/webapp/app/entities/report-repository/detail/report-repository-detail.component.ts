import { Component, OnInit } from "@angular/core";
import { IReportRepository } from "../report-repository.model";
import { DataUtils } from "app/core/util/data-util.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'jhi-report-repository-detail',
    templateUrl: './report-repository-detail.component.html',
})
export class ReportRepositoryDetailComponent implements OnInit {
    reportRepository: IReportRepository | null = null;

    constructor(
        protected dataUtils: DataUtils,
        protected activatedRoute: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ reportRepository }) => {
            this.reportRepository = reportRepository;
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