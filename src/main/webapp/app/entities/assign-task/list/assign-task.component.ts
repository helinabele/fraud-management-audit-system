import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAssignTask } from '../assign-task.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, AssignTaskService } from '../service/assign-task.service';
import { AssignTaskDeleteDialogComponent } from '../delete/assign-task-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { DirectorService } from 'app/entities/director/service/director.service';
import { TeamLeadService } from 'app/entities/team-lead/service/team-lead.service';
import { ManagerialService } from 'app/entities/managerial/service/managerial.service';
import { Authority } from 'app/config/authority.constants';
import { IDirector } from 'app/entities/director/director.model';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ITeamLead } from 'app/entities/team-lead/team-lead.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { IWhistleBlowerReport } from 'app/entities/whistle-blower-report/whistle-blower-report.model';

@Component({
  selector: 'jhi-assign-task',
  templateUrl: './assign-task.component.html',
})
export class AssignTaskComponent implements OnInit {
  assignTasks?: IAssignTask[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;
  assignTask: IAssignTask | null = null;
  account: any;
  role?: Authority;
  roleId?: string;
  whistleBlowerReport?: IWhistleBlowerReport;
  
  constructor(
    protected assignTaskService: AssignTaskService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
    private employeeService: EmployeeService,
    private directorService: DirectorService,
    private managerService: ManagerialService,
    private teamLeadService: TeamLeadService,
  ) { }

  trackId = (_index: number, item: IAssignTask): string => this.assignTaskService.getAssignTaskIdentifier(item);

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.whistleBlowerReport = navigation.extras.state.whistleBlowerReport;
    }
    console.log('WhistleBlowerReport ID:', this.whistleBlowerReport?.id);
    this.identifyUserRole();
    this.load();
  }

  identifyUserRole(): void {
    this.account = JSON.parse(localStorage.getItem('user') ?? '{}');
    if (this.account.authorities.includes(Authority.DIRECTOR)) {
      this.role = Authority.DIRECTOR;
      this.getDirector();
    } else if (this.account.authorities.includes(Authority.MANAGER)) {
      this.role = Authority.MANAGER;
      this.getManager();
    } else if (this.account.authorities.includes(Authority.TEAM_LEADER)) {
      this.role = Authority.TEAM_LEADER;
      this.getTeamLead();
    } else if (this.account.authorities.includes(Authority.AUDITOR)) {
      this.role = Authority.AUDITOR;
      this.getEmployee();
    }
  }
  getDirector(): void {
    this.directorService
      .query()
      .pipe(map((res: HttpResponse<IDirector[]>) => res.body ?? []))
      .subscribe((directors: IDirector[]) => {
        this.checkAuthority(directors);
      });
  }
  getManager(): void {
    this.managerService
      .query()
      .pipe(map((res: HttpResponse<IManagerial[]>) => res.body ?? []))
      .subscribe((managers: IManagerial[]) => {
        this.checkAuthority(managers);
      });
  }
  getTeamLead(): void {
    this.teamLeadService
      .query()
      .pipe(map((res: HttpResponse<ITeamLead[]>) => res.body ?? []))
      .subscribe((teamLeads: ITeamLead[]) => {
        this.checkAuthority(teamLeads);
      })
  }
  getEmployee(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .subscribe((employees: IEmployee[]) => {
        this.checkAuthority(employees);
      })
  }
  checkAuthority(values: any[]): void {
    this.roleId = values.find(t => t.user?.id === this.account.id)?.id;
    if (this.roleId) {
      this.load();
    }
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(assignTask: IAssignTask): void {
    const modalRef = this.modalService.open(AssignTaskDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.assignTask = assignTask;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending);
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
  
  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.assignTasks = this.onAssignTask(dataFromBody);
  }

  protected fillComponentAttributesFromResponseBody(data: IAssignTask[] | null): IAssignTask[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(page?: number, predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.assignTaskService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
