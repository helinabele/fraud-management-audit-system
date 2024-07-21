import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TeamFormService, TeamFormGroup } from './team-form.service';
import { ITeam } from '../team.model';
import { TeamService } from '../service/team.service';
import { ITeamLead } from 'app/entities/team-lead/team-lead.model';
import { TeamLeadService } from 'app/entities/team-lead/service/team-lead.service';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ManagerialService } from 'app/entities/managerial/service/managerial.service';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { IEmployee } from 'app/entities/employee/employee.model';

@Component({
  selector: 'jhi-team-update',
  templateUrl: './team-update.component.html',
})
export class TeamUpdateComponent implements OnInit {
  isSaving = false;
  team: ITeam | null = null;
  employee: IEmployee[] | undefined | null = [];
  teamLeadsSharedCollection: ITeamLead[] = [];
  managerialsSharedCollection: IManagerial[] = [];
  employeesSharedCollection: IEmployee[] = [];
  selectedEmployeeIds: string[] = [];
  editForm: TeamFormGroup = this.teamFormService.createTeamFormGroup();

  selectedEmployees: IEmployee[] = [];
  selectedItems: any[] = [];
    dropdownSettings = {};

  constructor(
    protected teamService: TeamService,
    protected teamFormService: TeamFormService,
    protected teamLeadService: TeamLeadService,
    protected managerialService: ManagerialService,
    protected activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  compareTeamLead = (o1: ITeamLead | null, o2: ITeamLead | null): boolean => this.teamLeadService.compareTeamLead(o1, o2);

  compareManagerial = (o1: IManagerial | null, o2: IManagerial | null): boolean => this.managerialService.compareManagerial(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.team = team;
      if (team) {
        this.updateForm(team);
      }
      this.loadRelationshipsOptions();
      this.loadEmployees();
      this.setSelectedEmployees();
    });
  }

  previousState(): void {
    window.history.back();
  }
  loadEmployees(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .subscribe((employees: IEmployee[]) => {
        this.employee = employees;
        this.setSelectedEmployees();
      });
  }
  setSelectedEmployees(): void {
    if (this.team && this.employee) {
      const selectedEmployeeIds = this.team.employee?.map(employee => employee.id) ?? [];
      this.selectedEmployees = this.employee.filter(employee => selectedEmployeeIds.includes(employee.id));
      this.selectedItems = this.selectedEmployees.map(employee => employee.id);
    }
  }
  save(): void {
    this.isSaving = true;
    const team = this.teamFormService.getTeam(this.editForm);
    if (team.id !== null) {
      this.subscribeToSaveResponse(this.teamService.update(team));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(team));
    }
  }



  /*   selectEmployee(employee: IEmployee): void {
      const index = this.selectedEmployees.findIndex((emp) => emp.id === employee.id);
      if (index === -1) {
        this.selectedEmployees.push(employee);
      } else {
        this.selectedEmployees.splice(index, 1);
      }
    } */

  trackTeamLeadById(index: number, item: ITeamLead): string {
    return item.id;
  }

  trackManagerialById(index: number, item: IManagerial): string {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee): string {
    return item.id;
  }

  // onEmployeeSelect(employee: IEmployee): void {
  //   const existingEmployee = this.selectedEmployees?.find((emp) => emp.id === employee.id);
  //   if (!existingEmployee) {
  //     this.selectedEmployees?.push({ id: employee.id, name: employee.name });
  //   }
  // }

  // onEmployeeRemove(employee: IEmployee): void {
  //   const employeeIndex = this.selectedEmployees?.findIndex((emp) => emp.id === employee.id);
  //   if (employeeIndex !== -1) {
  //     this.selectedEmployees?.splice(employeeIndex, 1);
  //   }
  // }

  getCheckedValue(event: Event): boolean {
    const target = event.target as HTMLInputElement;
    return target.checked;
  }

  /*   onEmployeeChange(checked: boolean, employee: IEmployee): void {
      if (checked) {
        // Add the employee to the selectedEmployees array
        this.selectedEmployees.push(employee);
      } else {
        // Remove the employee from the selectedEmployees array
        const index = this.selectedEmployees.findIndex((emp) => emp.id === employee.id);
        if (index !== -1) {
          this.selectedEmployees.splice(index, 1);
        }
      }
    } */

    onEmployeeChange(event: Event): void {
      const selectedOptions = Array.from((event.target as HTMLSelectElement).selectedOptions);
      const selectedEmployeeIds: string[] = selectedOptions.map((option: HTMLOptionElement) => option.value);
    
      // Use the selectedEmployeeIds array
      // console.log(selectedEmployeeIds);
      // Use a logging mechanism instead of console.log()
    }

  protected getEmployees(): void {
    this.employeeService.query().subscribe(empl => {
      this.employee = empl.body;
    })
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>): void {
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

  protected updateForm(team: ITeam): void {
    this.team = team;
    this.teamFormService.resetForm(this.editForm, team);
  
    this.teamLeadsSharedCollection = this.teamLeadService.addTeamLeadToCollectionIfMissing<ITeamLead>(
      this.teamLeadsSharedCollection,
      team.teamLead
    );
  
    this.managerialsSharedCollection = this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(
      this.managerialsSharedCollection,
      team.managers
    );
  
    if (team.employee) {
      if (Array.isArray(team.employee)) {
        team.employee.forEach(employee => {
          this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
            this.employeesSharedCollection,
            employee
          );
        });
      } else {
        this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
          this.employeesSharedCollection,
          team.employee
        );
      }
    }
  
    this.selectedEmployees = team.employee ?? [];
  }
  

  protected loadRelationshipsOptions(): void {
    this.teamLeadService
      .query()
      .pipe(map((res: HttpResponse<ITeamLead[]>) => res.body ?? []))
      .pipe(
        map((teamLeads: ITeamLead[]) => this.teamLeadService.addTeamLeadToCollectionIfMissing<ITeamLead>(teamLeads, this.team?.teamLead))
      )
      .subscribe((teamLeads: ITeamLead[]) => (this.teamLeadsSharedCollection = teamLeads));

    this.managerialService
      .query()
      .pipe(map((res: HttpResponse<IManagerial[]>) => res.body ?? []))
      .pipe(
        map((managerials: IManagerial[]) =>
          this.managerialService.addManagerialToCollectionIfMissing<IManagerial>(managerials, this.team?.managers)
        )
      )
      .subscribe((managerials: IManagerial[]) => (this.managerialsSharedCollection = managerials));
  }
}
