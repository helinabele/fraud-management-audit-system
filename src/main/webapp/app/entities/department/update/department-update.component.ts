import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DepartmentFormService, DepartmentFormGroup } from './department-form.service';
import { IDepartment } from '../department.model';
import { DepartmentService } from '../service/department.service';
import { IDivision } from 'app/entities/division/division.model';
import { DivisionService } from 'app/entities/division/service/division.service';

@Component({
  selector: 'jhi-department-update',
  templateUrl: './department-update.component.html',
})
export class DepartmentUpdateComponent implements OnInit {
  isSaving = false;
  department: IDepartment | null = null;

  divisionsSharedCollection: IDivision[] = [];

  editForm: DepartmentFormGroup = this.departmentFormService.createDepartmentFormGroup();

  constructor(
    protected departmentService: DepartmentService,
    protected departmentFormService: DepartmentFormService,
    protected divisionService: DivisionService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDivision = (o1: IDivision | null, o2: IDivision | null): boolean => this.divisionService.compareDivision(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      if (department) {
        this.updateForm(department);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.departmentFormService.getDepartment(this.editForm);
    if (department.id !== null) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartment>>): void {
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

  protected updateForm(department: IDepartment): void {
    this.department = department;
    this.departmentFormService.resetForm(this.editForm, department);

    this.divisionsSharedCollection = this.divisionService.addDivisionToCollectionIfMissing<IDivision>(
      this.divisionsSharedCollection,
      department.division
    );
  }

  protected loadRelationshipsOptions(): void {
    this.divisionService
      .query()
      .pipe(map((res: HttpResponse<IDivision[]>) => res.body ?? []))
      .pipe(
        map((divisions: IDivision[]) =>
          this.divisionService.addDivisionToCollectionIfMissing<IDivision>(divisions, this.department?.division)
        )
      )
      .subscribe((divisions: IDivision[]) => (this.divisionsSharedCollection = divisions));
  }
}
