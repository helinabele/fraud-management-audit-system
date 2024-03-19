import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DirectorFormService, DirectorFormGroup } from './director-form.service';
import { IDirector } from '../director.model';
import { DirectorService } from '../service/director.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-director-update',
  templateUrl: './director-update.component.html',
})
export class DirectorUpdateComponent implements OnInit {
  isSaving = false;
  director: IDirector | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: DirectorFormGroup = this.directorFormService.createDirectorFormGroup();

  constructor(
    protected directorService: DirectorService,
    protected directorFormService: DirectorFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ director }) => {
      this.director = director;
      if (director) {
        this.updateForm(director);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const director = this.directorFormService.getDirector(this.editForm);
    if (director.id !== null) {
      this.subscribeToSaveResponse(this.directorService.update(director));
    } else {
      this.subscribeToSaveResponse(this.directorService.create(director));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDirector>>): void {
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

  protected updateForm(director: IDirector): void {
    this.director = director;
    this.directorFormService.resetForm(this.editForm, director);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, director.user);
  }

  protected loadRelationshipsOptions(): void {
    const req = {
      page: 0,
      size: 10000,
    }
    this.userService
      .query(req)
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.director?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
