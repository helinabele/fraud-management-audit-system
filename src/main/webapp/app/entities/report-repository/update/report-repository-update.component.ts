import { Component, OnInit } from "@angular/core";
import { IReportRepository } from "../report-repository.model";
import { DataUtils, FileLoadError } from "app/core/util/data-util.service";
import { ActivatedRoute } from "@angular/router";
import { ReportRepositoryService } from "../service/report-repository.service";
import { ReportRepositoryFormGroup, ReportRepositoryFormService } from "./report-repository-form.service";
import { AlertError } from "app/shared/alert/alert-error.model";
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { Observable, finalize } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Component({
    selector: 'jhi-report-repository-update',
    templateUrl: './report-repository-update.component.html'
})
export class ReportRepositoryUpdateComponent implements OnInit {
    isSaving = false;
    reportRepository: IReportRepository | null = null;

    editForm: ReportRepositoryFormGroup = this.reportRepositoryFormService.createReportRepositoryFormGroup();

    constructor(
        protected dataUtils: DataUtils,
        protected eventManager: EventManager,
        protected reportRepositoryService: ReportRepositoryService,
        protected reportRepositoryFormService: ReportRepositoryFormService,
        protected activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ reportRepository }) => {
            this.reportRepository = reportRepository;
            if (reportRepository) {
                this.updateForm(reportRepository);
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
        const reportRepository = this.reportRepositoryFormService.getReportRepository(this.editForm);
        if (reportRepository.id !== null) {
            this.subscribeToSaveResponse(this.reportRepositoryService.update(reportRepository));
        } else {
            this.subscribeToSaveResponse(this.reportRepositoryService.create(reportRepository));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportRepository>>): void {
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
    protected updateForm(reportRepository: IReportRepository): void {
        this.reportRepository = reportRepository;
        this.reportRepositoryFormService.resetForm(this.editForm, reportRepository);
    }
}