import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EmployeeFormService, EmployeeFormGroup } from './employee-form.service';
import { IEmployee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IDirector } from 'app/entities/director/director.model';
import { DirectorService } from 'app/entities/director/service/director.service';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ManagerialService } from 'app/entities/managerial/service/managerial.service';
import { ITeamLead } from 'app/entities/team-lead/team-lead.model';
import { TeamLeadService } from 'app/entities/team-lead/service/team-lead.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { Gender } from 'app/entities/enumerations/gender.model';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})

export class EmployeeUpdateComponent implements OnInit {
  isSaving = false;
  employee: IEmployee | null = null;
  genderValues = Object.keys(Gender);

  usersSharedCollection: IUser[] = [];
  directorsSharedCollection: IDirector[] = [];
  managerialsSharedCollection: IManagerial[] = [];
  teamLeadsSharedCollection: ITeamLead[] = [];
  teamsSharedCollection: ITeam[] = [];

  editForm: EmployeeFormGroup = this.employeeFormService.createEmployeeFormGroup();
  selectedEmployeePicture: File | null = null;
  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected employeeService: EmployeeService,
    protected employeeFormService: EmployeeFormService,
    protected userService: UserService,
    protected directorService: DirectorService,
    protected managerialService: ManagerialService,
    protected teamLeadService: TeamLeadService,
    protected teamService: TeamService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareDirector = (o1: IDirector | null, o2: IDirector | null): boolean => this.directorService.compareDirector(o1, o2);

  compareManagerial = (o1: IManagerial | null, o2: IManagerial | null): boolean => this.managerialService.compareManagerial(o1, o2);

  compareTeamLead = (o1: ITeamLead | null, o2: ITeamLead | null): boolean => this.teamLeadService.compareTeamLead(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
      if (employee) {
        this.updateForm(employee);
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  onChangeDateOfBirth(): void {
    const dateOfBirthControl = this.editForm.get('dateOfBirth');
    const ageControl = this.editForm.get('age');
  
    if (dateOfBirthControl && ageControl) {
      const dateOfBirthVal = dateOfBirthControl.value;
  
      if (dateOfBirthVal) {
        const today = new Date();
        const birthDate = new Date(dateOfBirthVal);
        let age = today.getFullYear() - birthDate.getFullYear();
  
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
  
        ageControl.setValue(age);
      }
    }
  }

  // onAddButtonClick(): void{
  //   const employeePictures = this.editForm.get('employeePictures') as FormArray;
  //   employeePictures.push(new FormControl(null));
  // }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.employeeFormService.getEmployee(this.editForm);
    if (employee.id !== null) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
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

  protected updateForm(employee: IEmployee): void {
    this.employee = employee;
    this.employeeFormService.resetForm(this.editForm, employee);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, employee.user);
    this.directorsSharedCollection = this.directorService.addDirectorToCollectionIfMissing<IDirector>(
      this.directorsSharedCollection,
      employee.director
    );
    this.managerialsSharedCollection = this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(
      this.managerialsSharedCollection,
      employee.manager
    );
    this.teamLeadsSharedCollection = this.teamLeadService.addTeamLeadToCollectionIfMissing<ITeamLead>(
      this.teamLeadsSharedCollection,
      employee.teamLead
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(this.teamsSharedCollection, employee.team);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.employee?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.directorService
      .query()
      .pipe(map((res: HttpResponse<IDirector[]>) => res.body ?? []))
      .pipe(
        map((directors: IDirector[]) =>
          this.directorService.addDirectorToCollectionIfMissing<IDirector>(directors, this.employee?.director)
        )
      )
      .subscribe((directors: IDirector[]) => (this.directorsSharedCollection = directors));

    this.managerialService
      .query()
      .pipe(map((res: HttpResponse<IManagerial[]>) => res.body ?? []))
      .pipe(
        map((managerials: IManagerial[]) =>
          this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(managerials, this.employee?.manager)
        )
      )
      .subscribe((managerials: IManagerial[]) => (this.managerialsSharedCollection = managerials));

    this.teamLeadService
      .query()
      .pipe(map((res: HttpResponse<ITeamLead[]>) => res.body ?? []))
      .pipe(
        map((teamLeads: ITeamLead[]) =>
          this.teamLeadService.addTeamLeadToCollectionIfMissing<ITeamLead>(teamLeads, this.employee?.teamLead)
        )
      )
      .subscribe((teamLeads: ITeamLead[]) => (this.teamLeadsSharedCollection = teamLeads));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.employee?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));
  }
}
