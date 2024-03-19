import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { BranchFormService, BranchFormGroup } from './branch-form.service';
import { IBranch } from '../branch.model';
import { BranchService } from '../service/branch.service';
import { IDivision } from 'app/entities/division/division.model';
import { DivisionService } from 'app/entities/division/service/division.service';
import { IDepartment } from 'app/entities/department/department.model';
import { DepartmentService } from 'app/entities/department/service/department.service';

@Component({
  selector: 'jhi-branch-update',
  templateUrl: './branch-update.component.html',
})
export class BranchUpdateComponent implements OnInit {
  isSaving = false;
  branch: IBranch | null = null;

  divisionsSharedCollection: IDivision[] = [];
  departmentsSharedCollection: IDepartment[] = [];

  editForm: BranchFormGroup = this.branchFormService.createBranchFormGroup();

  constructor(
    protected branchService: BranchService,
    protected branchFormService: BranchFormService,
    protected divisionService: DivisionService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDivision = (o1: IDivision | null, o2: IDivision | null): boolean => this.divisionService.compareDivision(o1, o2);

  compareDepartment = (o1: IDepartment | null, o2: IDepartment | null): boolean => this.departmentService.compareDepartment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ branch }) => {
      this.branch = branch;
      if (branch) {
        this.updateForm(branch);
      }

      this.loadRelationshipsOptions();
    });
  }

  onChangeDivision(): void {
    this.getDepartment(this.editForm.controls.division.value?.id);
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const branch = this.branchFormService.getBranch(this.editForm);
    if (branch.id !== null) {
      this.subscribeToSaveResponse(this.branchService.update(branch));
    } else {
      this.subscribeToSaveResponse(this.branchService.create(branch));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranch>>): void {
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

  protected updateForm(branch: IBranch): void {
    this.branch = branch;
    this.branchFormService.resetForm(this.editForm, branch);

    this.divisionsSharedCollection = this.divisionService.addDivisionToCollectionIfMissing<IDivision>(
      this.divisionsSharedCollection,
      branch.division
    );
    this.departmentsSharedCollection = this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(
      this.departmentsSharedCollection,
      branch.department
    );
  }

  protected loadRelationshipsOptions(): void {
    this.divisionService
      .query()
      .pipe(map((res: HttpResponse<IDivision[]>) => res.body ?? []))
      .pipe(
        map((divisions: IDivision[]) => this.divisionService.addDivisionToCollectionIfMissing<IDivision>(divisions, this.branch?.division))
      )
      .subscribe((divisions: IDivision[]) => (this.divisionsSharedCollection = divisions));

    this.departmentService
      .query()
      .pipe(map((res: HttpResponse<IDepartment[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartment[]) =>
          this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(departments, this.branch?.department)
        )
      )
      .subscribe((departments: IDepartment[]) => (this.departmentsSharedCollection = departments));
  }

  private getDepartment(divisionId: string | undefined): void{
    this.departmentService
    .query()
    .pipe(map((res: HttpResponse<IDepartment[]>) => res.body ?? []))
    .pipe(
      map((departments: IDepartment[]) => 
      this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(departments.filter(t => t.division?.id ===divisionId), this.branch?.department)
      )
    )
    .subscribe((departments: IDepartment[]) => (this.departmentsSharedCollection = departments))
  }
  
}
