import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TeamLeadFormService, TeamLeadFormGroup } from './team-lead-form.service';
import { ITeamLead } from '../team-lead.model';
import { TeamLeadService } from '../service/team-lead.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ManagerialService } from 'app/entities/managerial/service/managerial.service';

@Component({
  selector: 'jhi-team-lead-update',
  templateUrl: './team-lead-update.component.html',
})
export class TeamLeadUpdateComponent implements OnInit {
  isSaving = false;
  teamLead: ITeamLead | null = null;

  usersSharedCollection: IUser[] = [];
  managerialsSharedCollection: IManagerial[] = [];

  editForm: TeamLeadFormGroup = this.teamLeadFormService.createTeamLeadFormGroup();

  constructor(
    protected teamLeadService: TeamLeadService,
    protected teamLeadFormService: TeamLeadFormService,
    protected userService: UserService,
    protected managerialService: ManagerialService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareManagerial = (o1: IManagerial | null, o2: IManagerial | null): boolean => this.managerialService.compareManagerial(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teamLead }) => {
      this.teamLead = teamLead;
      if (teamLead) {
        this.updateForm(teamLead);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const teamLead = this.teamLeadFormService.getTeamLead(this.editForm);
    if (teamLead.id !== null) {
      this.subscribeToSaveResponse(this.teamLeadService.update(teamLead));
    } else {
      this.subscribeToSaveResponse(this.teamLeadService.create(teamLead));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeamLead>>): void {
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

  protected updateForm(teamLead: ITeamLead): void {
    this.teamLead = teamLead;
    this.teamLeadFormService.resetForm(this.editForm, teamLead);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, teamLead.user);
    this.managerialsSharedCollection = this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(
      this.managerialsSharedCollection,
      teamLead.managers
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
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.teamLead?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.managerialService
      .query(req)
      .pipe(map((res: HttpResponse<IManagerial[]>) => res.body ?? []))
      .pipe(
        map((managerials: IManagerial[]) =>
          this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(managerials, this.teamLead?.managers)
        )
      )
      .subscribe((managerials: IManagerial[]) => (this.managerialsSharedCollection = managerials));
  }
}
