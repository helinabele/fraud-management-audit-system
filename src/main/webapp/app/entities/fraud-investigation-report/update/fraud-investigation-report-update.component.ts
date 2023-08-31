import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FraudInvestigationReportFormService, FraudInvestigationReportFormGroup } from './fraud-investigation-report-form.service';
import { IFraudInvestigationReport } from '../fraud-investigation-report.model';
import { FraudInvestigationReportService } from '../service/fraud-investigation-report.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';

@Component({
  selector: 'jhi-fraud-investigation-report-update',
  templateUrl: './fraud-investigation-report-update.component.html',
})
export class FraudInvestigationReportUpdateComponent implements OnInit {
  isSaving = false;
  fraudInvestigationReport: IFraudInvestigationReport | null = null;

  employeesSharedCollection: IEmployee[] = [];
  tasksSharedCollection: ITask[] = [];
  teamsSharedCollection: ITeam[] = [];

  editForm: FraudInvestigationReportFormGroup = this.fraudInvestigationReportFormService.createFraudInvestigationReportFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fraudInvestigationReportService: FraudInvestigationReportService,
    protected fraudInvestigationReportFormService: FraudInvestigationReportFormService,
    protected employeeService: EmployeeService,
    protected taskService: TaskService,
    protected teamService: TeamService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareTask = (o1: ITask | null, o2: ITask | null): boolean => this.taskService.compareTask(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraudInvestigationReport }) => {
      this.fraudInvestigationReport = fraudInvestigationReport;
      if (fraudInvestigationReport) {
        this.updateForm(fraudInvestigationReport);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
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
    const fraudInvestigationReport = this.fraudInvestigationReportFormService.getFraudInvestigationReport(this.editForm);
    if (fraudInvestigationReport.id !== null) {
      this.subscribeToSaveResponse(this.fraudInvestigationReportService.update(fraudInvestigationReport));
    } else {
      this.subscribeToSaveResponse(this.fraudInvestigationReportService.create(fraudInvestigationReport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFraudInvestigationReport>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(fraudInvestigationReport: IFraudInvestigationReport): void {
    this.fraudInvestigationReport = fraudInvestigationReport;
    this.fraudInvestigationReportFormService.resetForm(this.editForm, fraudInvestigationReport);

    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      fraudInvestigationReport.employee
    );
    this.tasksSharedCollection = this.taskService.addTaskToCollectionIfMissing<ITask>(
      this.tasksSharedCollection,
      fraudInvestigationReport.task
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(
      this.teamsSharedCollection,
      fraudInvestigationReport.team
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.fraudInvestigationReport?.employee)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITask[]>) => res.body ?? []))
      .pipe(map((tasks: ITask[]) => this.taskService.addTaskToCollectionIfMissing<ITask>(tasks, this.fraudInvestigationReport?.task)))
      .subscribe((tasks: ITask[]) => (this.tasksSharedCollection = tasks));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.fraudInvestigationReport?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));
  }
}
