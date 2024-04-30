import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { JobGradeFormService, JobGradeFormGroup } from './job-grade-form.service';
import { IJobGrade } from '../job-grade.model';
import { JobGradeService } from '../service/job-grade.service';

@Component({
  selector: 'jhi-job-grade-update',
  templateUrl: './job-grade-update.component.html',
})
export class JobGradeUpdateComponent implements OnInit {
  isSaving = false;
  jobGrade: IJobGrade | null = null;

  editForm: JobGradeFormGroup = this.jobGradeFormService.createJobGradeFormGroup();

  constructor(
    protected jobGradeService: JobGradeService,
    protected jobGradeFormService: JobGradeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobGrade }) => {
      this.jobGrade = jobGrade;
      if (jobGrade) {
        this.updateForm(jobGrade);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobGrade = this.jobGradeFormService.getJobGrade(this.editForm);
    if (jobGrade.id !== null) {
      this.subscribeToSaveResponse(this.jobGradeService.update(jobGrade));
    } else {
      this.subscribeToSaveResponse(this.jobGradeService.create(jobGrade));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobGrade>>): void {
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

  protected updateForm(jobGrade: IJobGrade): void {
    this.jobGrade = jobGrade;
    this.jobGradeFormService.resetForm(this.editForm, jobGrade);
  }
}
