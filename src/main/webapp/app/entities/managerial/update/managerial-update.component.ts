import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ManagerialFormService, ManagerialFormGroup } from './managerial-form.service';
import { IManagerial } from '../managerial.model';
import { ManagerialService } from '../service/managerial.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IDirector } from 'app/entities/director/director.model';
import { DirectorService } from 'app/entities/director/service/director.service';

@Component({
  selector: 'jhi-managerial-update',
  templateUrl: './managerial-update.component.html',
})
export class ManagerialUpdateComponent implements OnInit {
  isSaving = false;
  managerial: IManagerial | null = null;

  usersSharedCollection: IUser[] = [];
  directorsSharedCollection: IDirector[] = [];

  editForm: ManagerialFormGroup = this.managerialFormService.createManagerialFormGroup();

  constructor(
    protected managerialService: ManagerialService,
    protected managerialFormService: ManagerialFormService,
    protected userService: UserService,
    protected directorService: DirectorService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareDirector = (o1: IDirector | null, o2: IDirector | null): boolean => this.directorService.compareDirector(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ managerial }) => {
      this.managerial = managerial;
      if (managerial) {
        this.updateForm(managerial);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const managerial = this.managerialFormService.getManagerial(this.editForm);
    if (managerial.id !== null) {
      this.subscribeToSaveResponse(this.managerialService.update(managerial));
    } else {
      this.subscribeToSaveResponse(this.managerialService.create(managerial));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IManagerial>>): void {
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

  protected updateForm(managerial: IManagerial): void {
    this.managerial = managerial;
    this.managerialFormService.resetForm(this.editForm, managerial);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, managerial.user);
    this.directorsSharedCollection = this.directorService.addDirectorToCollectionIfMissing<IDirector>(
      this.directorsSharedCollection,
      managerial.directors
    );
  }

  protected loadRelationshipsOptions(): void {
    const req = {
      page: 0,
      size: 10000
    }
    this.userService
      .query(req)
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.managerial?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.directorService
      .query(req)
      .pipe(map((res: HttpResponse<IDirector[]>) => res.body ?? []))
      .pipe(
        map((directors: IDirector[]) =>
          this.directorService.addDirectorToCollectionIfMissing<IDirector>(directors, this.managerial?.directors)
        )
      )
      .subscribe((directors: IDirector[]) => (this.directorsSharedCollection = directors));
  }
}
