import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { InternalEmployeeFormService, InternalEmployeeFormGroup } from './internal-employee-form.service';
import { IInternalEmployee } from '../internal-employee.model';
import { InternalEmployeeService } from '../service/internal-employee.service';
import { IJobGrade } from 'app/entities/job-grade/job-grade.model';
import { JobGradeService } from 'app/entities/job-grade/service/job-grade.service';
import { IJobTitle } from 'app/entities/job-title/job-title.model';
import { JobTitleService } from 'app/entities/job-title/service/job-title.service';

@Component({
  selector: 'jhi-internal-employee-update',
  templateUrl: './internal-employee-update.component.html',
})
export class InternalEmployeeUpdateComponent implements OnInit {
  isSaving = false;
  internalEmployee: IInternalEmployee | null = null;
  jobGradesSharedCollection: IJobGrade[] = [];
  jobTitlesSharedCollection: IJobTitle[] = [];
  editForm: InternalEmployeeFormGroup = this.internalEmployeeFormService.createInternalEmployeeFormGroup();

  constructor(
    protected internalEmployeeService: InternalEmployeeService,
    protected internalEmployeeFormService: InternalEmployeeFormService,
    protected activatedRoute: ActivatedRoute,
    private jobGradeService: JobGradeService,
    private jobTitleService: JobTitleService
  ) {}
  compareJobGrade = (o1: IJobGrade | null, o2: IJobGrade | null): boolean => this.jobGradeService.compareJobGrade(o1, o2);
  compareJobTitle = (o1: IJobTitle | null, o2: IJobTitle | null): boolean => this.jobTitleService.compareJobTitle(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ internalEmployee }) => {
      this.internalEmployee = internalEmployee;
      if (internalEmployee) {
        this.updateForm(internalEmployee);
      }
      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const internalEmployee = this.internalEmployeeFormService.getInternalEmployee(this.editForm);
    if (internalEmployee.id !== null) {
      this.subscribeToSaveResponse(this.internalEmployeeService.update(internalEmployee));
    } else {
      this.subscribeToSaveResponse(this.internalEmployeeService.create(internalEmployee));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInternalEmployee>>): void {
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

  protected updateForm(internalEmployee: IInternalEmployee): void {
    this.internalEmployee = internalEmployee;
    this.internalEmployeeFormService.resetForm(this.editForm, internalEmployee);
    this.jobGradesSharedCollection = this.jobGradeService.addJobGradeToCollectionIfMissing<IJobGrade>(
      this.jobGradesSharedCollection,
      internalEmployee.jobGrade
    );
    this.jobTitlesSharedCollection = this.jobTitleService.addJobTitleToCollectionIfMissing<IJobTitle>(
      this.jobTitlesSharedCollection,
      internalEmployee.jobTitle
    )
  }

  protected loadRelationshipsOptions(): void {
    this.jobGradeService
    .query()
    .pipe(map((res: HttpResponse<IJobGrade[]>) => res.body ?? []))
    .pipe(
      map((jobGrades: IJobGrade[]) =>
        this.jobGradeService.addJobGradeToCollectionIfMissing<IJobGrade>(jobGrades, this.internalEmployee?.jobGrade)
      )
    )
    .subscribe((jobGrades: IJobGrade[]) => (this.jobGradesSharedCollection = jobGrades));

    this.jobTitleService
    .query()
    .pipe(map((res: HttpResponse<IJobTitle[]>) => res.body ?? []))
    .pipe(
      map((jobTitles: IJobTitle[]) => 
      this.jobTitleService.addJobTitleToCollectionIfMissing<IJobTitle>(jobTitles, this.internalEmployee?.jobTitle)
    )
    )
    .subscribe((jobTitles: IJobTitle[]) => (this.jobTitlesSharedCollection = jobTitles));
  }
}
