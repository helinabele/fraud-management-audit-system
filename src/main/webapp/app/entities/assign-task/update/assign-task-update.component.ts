import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { AssignTaskFormService, AssignTaskFormGroup } from './assign-task-form.service';
import { IAssignTask } from '../assign-task.model';
import { AssignTaskService } from '../service/assign-task.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDirector } from 'app/entities/director/director.model';
import { DirectorService } from 'app/entities/director/service/director.service';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ManagerialService } from 'app/entities/managerial/service/managerial.service';
import { ITeamLead } from 'app/entities/team-lead/team-lead.model';
import { TeamLeadService } from 'app/entities/team-lead/service/team-lead.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IWhistleBlowerReport } from 'app/entities/whistle-blower-report/whistle-blower-report.model';
import { WhistleBlowerReportService } from 'app/entities/whistle-blower-report/service/whistle-blower-report.service';
import { Authority } from 'app/config/authority.constants';
import { User } from 'app/admin/user-management/user-management.model';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-assign-task-update',
  templateUrl: './assign-task-update.component.html',
  styleUrls: ['../assign-task.component.scss'],
})
export class AssignTaskUpdateComponent implements OnInit {
  isSaving = false;
  assignTask: IAssignTask | null = null;
  directorsSharedCollection: IDirector[] = [];
  managerialsSharedCollection: IManagerial[] = [];
  teamLeadsSharedCollection: ITeamLead[] = [];
  employeesSharedCollection: IEmployee[] = [];
  tasksSharedCollection: ITask[] = [];
  teamsSharedCollection: ITeam[] = [];

  editForm: AssignTaskFormGroup = this.assignTaskFormService.createAssignTaskFormGroup();
  whistleBlowerReportId: string | undefined;
  fullName?: string;
  genderType?: string;
  attachmentContentType?: string;
  attachment?: string;
  emailAddress?: string;
  message?: string;
  whistleBlowerProperty: any;
  isChecked = false;
  role?: Authority;
  roleId?: string;
  account: any;

  teams: ITeam[] = [];
  selectedTeamId = 0;

  @Input() reports?: IWhistleBlowerReport[];
  selectedReport?: IWhistleBlowerReport | null;
  user?: User
  account1: Account | null = null;
getTitle: any;
getId:any;

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected assignTaskService: AssignTaskService,
    protected assignTaskFormService: AssignTaskFormService,
    protected directorService: DirectorService,
    protected managerialService: ManagerialService,
    protected teamLeadService: TeamLeadService,
    protected employeeService: EmployeeService,
    protected taskService: TaskService,
    protected teamService: TeamService,
    protected activatedRoute: ActivatedRoute,
    private whistleBlowerReportService: WhistleBlowerReportService,
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  compareDirector = (o1: IDirector | null, o2: IDirector | null): boolean => this.directorService.compareDirector(o1, o2);

  compareManagerial = (o1: IManagerial | null, o2: IManagerial | null): boolean => this.managerialService.compareManagerial(o1, o2);

  compareTeamLead = (o1: ITeamLead | null, o2: ITeamLead | null): boolean => this.teamLeadService.compareTeamLead(o1, o2);

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareTask = (o1: ITask | null, o2: ITask | null): boolean => this.taskService.compareTask(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe(({ assignTask }) => {
  //     this.assignTask = assignTask;
  //     if (assignTask) {
  //       this.updateForm(assignTask);
  //     }
  //     this.whistleBlowerReportService.selectedReport$.subscribe(report => {
  //       this.selectedReport = report;
  //     });
  //     this.loadRelationshipsOptions();
  //   });
  // }
  ngOnInit(): void {
 
    this.activatedRoute.data.subscribe(({ assignTask }) => {
      this.assignTask = assignTask;
      if (assignTask) {
        this.updateForm(assignTask);
        this.loadMoreInfo(assignTask);
      }
      this.loadRelationshipsOptions(() => {
        this.loadPreviousTask();
        this.retrieveSelectedReport();
      });
    });

    this.activatedRoute.queryParams.subscribe(params => {
      const title = params['title'];
      if (title) {
        // Set the value of the 'task' form control to the title obtained from the route parameter
        this.editForm.patchValue({
          task: title
        });
      }
    });
  }

  loadMoreInfo(assignTask: any): void {
    if (assignTask.director?.id) {
      this.getManager(assignTask.director?.id);
    }
    if (assignTask.manager?.id) {
      this.getTeamLead(assignTask.manager?.id)
    }
  }

  assignTaskToTeam(): void {
    const foundTeam = this.teams.find((team) => team.id.toString() === this.selectedTeamId.toString());

    if (foundTeam) {
      const employees = foundTeam.employee;

      employees?.forEach((employee) => {
        this.sendNotification(Number(employee), "New task assigned");
      });

    }
  }

  sendNotification(employeeId: number, message: string): void {
    const notification = { employeeId, message };
    this.http.post('/api/notifications', notification).subscribe;
  }

  save(): void {
    this.isSaving = true;
    const assignTask = this.assignTaskFormService.getAssignTask(this.editForm);
    if (assignTask.id !== null) {
      this.subscribeToSaveResponse(this.assignTaskService.update(assignTask));
    } else {
      this.subscribeToSaveResponse(this.assignTaskService.create(assignTask));
    }
  }

  // identifyUserRole(): void {
  //   this.account = JSON.parse(localStorage.getItem('user') ?? '{}');
  //   if (this.account.authorities.includes(Authority.DIRECTOR)) {
  //     this.role = Authority.DIRECTOR;
  //     this.getDirector();
  //   } else if (this.account.authorities.includes(Authority.MANAGER)) {
  //     this.role = Authority.MANAGER;
  //     this.getManager();
  //   } else if (this.account.authorities.includes(Authority.TEAM_LEADER)) {
  //     this.role = Authority.TEAM_LEADER;
  //     this.getTeamLead();
  //   } else if (this.account.authorities.includes(Authority.AUDITOR)) {
  //     this.role = Authority.AUDITOR;
  //     this.getEmployee();
  //   }
  // }


  checkAuthority(values: any[]): void {
    this.roleId = values.find(t => t.user?.id === this.account.id)?.id;
  }

  loadPreviousTask(): void {
    const assignedTask = localStorage.getItem('assignedTask');
    if (assignedTask) {
      this.assignTask = JSON.parse(assignedTask);
    }
  }

  // handleWhistleBlowerProperty(): void {
  //   if (this.whistleBlowerProperty) {
  //   }
  // }

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
  onTeamSaved(team: ITeam): void {
    if (team) {
      this.teamsSharedCollection.push(team);
      this.editForm.get('team')?.setValue(team); // Optionally set the saved team as the selected value
    }
  }
  protected onAssignTask(assignTask: IAssignTask[]): IAssignTask[] {
    switch (this.role) {
      case Authority.DIRECTOR:
        assignTask = assignTask.filter(t => t.director?.id === this.roleId);
        break;
      case Authority.MANAGER:
        assignTask = assignTask.filter(t => t.manager?.id === this.roleId);
        break;
      case Authority.TEAM_LEADER:
        assignTask = assignTask.filter(t => t.teamLead?.id === this.roleId);
        break;
    }
    return assignTask;
  }

  protected getManager(directorId: string | undefined): void {
    this.managerialService
      .query()
      .pipe(map((res: HttpResponse<IManagerial[]>) => res.body ?? []))
      .pipe(
        map((managers: IManagerial[]) =>
          this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(managers, this.assignTask?.manager)
        )
      )
      .subscribe((managers: IManagerial[]) => (this.managerialsSharedCollection = managers.filter(t => t.directors?.id === directorId)));
  }
  protected getTeamLead(teamLeadId: string | undefined): void {
    this.teamLeadService
      .query()
      .pipe(map((res: HttpResponse<ITeamLead[]>) => res.body ?? []))
      .pipe(
        map((teamLeads: ITeamLead[]) =>
          this.teamLeadService.addTeamLeadToCollectionIfMissing<ITeamLead>(teamLeads, this.assignTask?.teamLead))
      )
      .subscribe((teamLeads: ITeamLead[]) => (this.teamLeadsSharedCollection = teamLeads.filter(t => t.managers?.id === teamLeadId)));
  }

  protected getEmployee(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .subscribe((employees: IEmployee[]) => {
        this.checkAuthority(employees);
      })
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssignTask>>): void {
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

  protected updateForm(assignTask: IAssignTask): void {
    this.assignTask = assignTask;
    this.assignTaskFormService.resetForm(this.editForm, assignTask);

    this.directorsSharedCollection = this.directorService.addDirectorToCollectionIfMissing<IDirector>(
      this.directorsSharedCollection,
      assignTask.director
    );
    this.managerialsSharedCollection = this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(
      this.managerialsSharedCollection,
      assignTask.manager
    );
    this.teamLeadsSharedCollection = this.teamLeadService.addTeamLeadToCollectionIfMissing<ITeamLead>(
      this.teamLeadsSharedCollection,
      assignTask.teamLead
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      assignTask.employee
    );
    this.tasksSharedCollection = this.taskService.addTaskToCollectionIfMissing<ITask>(this.tasksSharedCollection, assignTask.task);
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(this.teamsSharedCollection, assignTask.team);
  }

  protected loadRelationshipsOptions(callback: () => void): void {
    this.directorService
      .query()
      .pipe(map((res: HttpResponse<IDirector[]>) => res.body ?? []))
      .pipe(
        map((directors: IDirector[]) =>
          this.directorService.addDirectorToCollectionIfMissing<IDirector>(directors, this.assignTask?.director)
        )
      )
      .subscribe((directors: IDirector[]) => (this.directorsSharedCollection = directors));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.assignTask?.employee)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITask[]>) => res.body ?? []))
      .pipe(map((tasks: ITask[]) => this.taskService.addTaskToCollectionIfMissing<ITask>(tasks, this.assignTask?.task)))
      .subscribe((tasks: ITask[]) => (this.tasksSharedCollection = tasks));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.assignTask?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));

    this.cdRef.detectChanges();

    callback();
  }

  private retrieveSelectedReport(): void {
    const storedReport = localStorage.getItem('selectedReport');
    if (storedReport) {
      this.selectedReport = JSON.parse(storedReport);
    } else {
      this.whistleBlowerReportService.selectedReport$.subscribe(report => {
        // Clear the stored report before assigning a new report
        localStorage.removeItem('selectedReport');
        localStorage.removeItem('user');

        this.selectedReport = report;
        localStorage.setItem('selectedReport', JSON.stringify(report));
        localStorage.setItem('user', JSON.stringify(this.user));
      });
    }
  }

}
