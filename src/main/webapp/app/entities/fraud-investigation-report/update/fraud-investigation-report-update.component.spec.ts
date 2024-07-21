import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FraudInvestigationReportFormService } from './fraud-investigation-report-form.service';
import { FraudInvestigationReportService } from '../service/fraud-investigation-report.service';
import { IFraudInvestigationReport } from '../fraud-investigation-report.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';

import { FraudInvestigationReportUpdateComponent } from './fraud-investigation-report-update.component';

describe('FraudInvestigationReport Management Update Component', () => {
  let comp: FraudInvestigationReportUpdateComponent;
  let fixture: ComponentFixture<FraudInvestigationReportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fraudInvestigationReportFormService: FraudInvestigationReportFormService;
  let fraudInvestigationReportService: FraudInvestigationReportService;
  let employeeService: EmployeeService;
  let taskService: TaskService;
  let teamService: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FraudInvestigationReportUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FraudInvestigationReportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FraudInvestigationReportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fraudInvestigationReportFormService = TestBed.inject(FraudInvestigationReportFormService);
    fraudInvestigationReportService = TestBed.inject(FraudInvestigationReportService);
    employeeService = TestBed.inject(EmployeeService);
    taskService = TestBed.inject(TaskService);
    teamService = TestBed.inject(TeamService);

    comp = fixture.componentInstance;
  });

 /*  describe('ngOnInit', () => {
    it('Should call Employee query and add missing value', () => {
      const fraudInvestigationReport: IFraudInvestigationReport = { id: 'CBA' };
      const employee: IEmployee = { id: 'fd75d883-f122-4af9-b3e7-3c0ffcb2357d' };
      fraudInvestigationReport.employee = employee;

      const employeeCollection: IEmployee[] = [{ id: '228e2645-4dad-48db-b99a-b97a43981a14' }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [employee];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fraudInvestigationReport });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    }); */

    it('Should call Task query and add missing value', () => {
      const fraudInvestigationReport: IFraudInvestigationReport = { id: 'CBA' };
      const task: ITask = { id: '59830e0b-7cfb-4f44-bca6-4ec0fd4dedd6' };
      fraudInvestigationReport.task = task;

      const taskCollection: ITask[] = [{ id: '1284ce28-2eef-49bf-9347-cac2f5db85fa' }];
      jest.spyOn(taskService, 'query').mockReturnValue(of(new HttpResponse({ body: taskCollection })));
      const additionalTasks = [task];
      const expectedCollection: ITask[] = [...additionalTasks, ...taskCollection];
      jest.spyOn(taskService, 'addTaskToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fraudInvestigationReport });
      comp.ngOnInit();

      expect(taskService.query).toHaveBeenCalled();
      expect(taskService.addTaskToCollectionIfMissing).toHaveBeenCalledWith(
        taskCollection,
        ...additionalTasks.map(expect.objectContaining)
      );
      expect(comp.tasksSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const fraudInvestigationReport: IFraudInvestigationReport = { id: 'CBA' };
      const team: ITeam = { id: '0b1e6d79-c56c-4f90-81be-912c969466e9' };
      fraudInvestigationReport.team = team;

      const teamCollection: ITeam[] = [{ id: 'a11c2135-7443-47e4-b326-07fe5cd74285' }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ fraudInvestigationReport });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining)
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

/*     it('Should update editForm', () => {
      const fraudInvestigationReport: IFraudInvestigationReport = { id: 'CBA' };
      const employee: IEmployee = { id: '281e3f37-1c8e-4210-8d63-354de11e76f4' };
      fraudInvestigationReport.employee = employee;
      const task: ITask = { id: '91858ec5-cf88-4389-a295-1d6e70b4dbcf' };
      fraudInvestigationReport.task = task;
      const team: ITeam = { id: '83d3eb71-81fc-48ba-9f1f-671025f3d836' };
      fraudInvestigationReport.team = team;

      activatedRoute.data = of({ fraudInvestigationReport });
      comp.ngOnInit();

      expect(comp.employeesSharedCollection).toContain(employee);
      expect(comp.tasksSharedCollection).toContain(task);
      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.fraudInvestigationReport).toEqual(fraudInvestigationReport);
    });
  }); */

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFraudInvestigationReport>>();
      const fraudInvestigationReport = { id: 'ABC' };
      jest.spyOn(fraudInvestigationReportFormService, 'getFraudInvestigationReport').mockReturnValue(fraudInvestigationReport);
      jest.spyOn(fraudInvestigationReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fraudInvestigationReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fraudInvestigationReport }));
      saveSubject.complete();

      // THEN
      expect(fraudInvestigationReportFormService.getFraudInvestigationReport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fraudInvestigationReportService.update).toHaveBeenCalledWith(expect.objectContaining(fraudInvestigationReport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFraudInvestigationReport>>();
      const fraudInvestigationReport = { id: 'ABC' };
      jest.spyOn(fraudInvestigationReportFormService, 'getFraudInvestigationReport').mockReturnValue({ id: null });
      jest.spyOn(fraudInvestigationReportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fraudInvestigationReport: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fraudInvestigationReport }));
      saveSubject.complete();

      // THEN
      expect(fraudInvestigationReportFormService.getFraudInvestigationReport).toHaveBeenCalled();
      expect(fraudInvestigationReportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFraudInvestigationReport>>();
      const fraudInvestigationReport = { id: 'ABC' };
      jest.spyOn(fraudInvestigationReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fraudInvestigationReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fraudInvestigationReportService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEmployee', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTask', () => {
      it('Should forward to taskService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(taskService, 'compareTask');
        comp.compareTask(entity, entity2);
        expect(taskService.compareTask).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTeam', () => {
      it('Should forward to teamService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(teamService, 'compareTeam');
        comp.compareTeam(entity, entity2);
        expect(teamService.compareTeam).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
