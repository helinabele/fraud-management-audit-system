import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TeamFormService } from './team-form.service';
import { TeamService } from '../service/team.service';
import { ITeam } from '../team.model';
import { ITeamLead } from 'app/entities/team-lead/team-lead.model';
import { TeamLeadService } from 'app/entities/team-lead/service/team-lead.service';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ManagerialService } from 'app/entities/managerial/service/managerial.service';

import { TeamUpdateComponent } from './team-update.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Team Management Update Component', () => {
  let comp: TeamUpdateComponent;
  let fixture: ComponentFixture<TeamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teamFormService: TeamFormService;
  let teamService: TeamService;
  let teamLeadService: TeamLeadService;
  let managerialService: ManagerialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TeamUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
      schemas:[NO_ERRORS_SCHEMA],
    })
      .overrideTemplate(TeamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teamFormService = TestBed.inject(TeamFormService);
    teamService = TestBed.inject(TeamService);
    teamLeadService = TestBed.inject(TeamLeadService);
    managerialService = TestBed.inject(ManagerialService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TeamLead query and add missing value', () => {
      const team: ITeam = { id: 'CBA' };
      const teamLead: ITeamLead = { id: '2e860da2-e433-40bc-8988-1b574079abfd' };
      team.teamLead = teamLead;

      const teamLeadCollection: ITeamLead[] = [{ id: 'e7125fb8-1117-4c1f-ab8c-e809a08cb380' }];
      jest.spyOn(teamLeadService, 'query').mockReturnValue(of(new HttpResponse({ body: teamLeadCollection })));
      const additionalTeamLeads = [teamLead];
      const expectedCollection: ITeamLead[] = [...additionalTeamLeads, ...teamLeadCollection];
      jest.spyOn(teamLeadService, 'addTeamLeadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ team });
      comp.ngOnInit();

      expect(teamLeadService.query).toHaveBeenCalled();
      expect(teamLeadService.addTeamLeadToCollectionIfMissing).toHaveBeenCalledWith(
        teamLeadCollection,
        ...additionalTeamLeads.map(expect.objectContaining)
      );
      expect(comp.teamLeadsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Managerial query and add missing value', () => {
      const team: ITeam = { id: 'CBA' };
      const managers: IManagerial = { id: '954a42ad-3f35-43b9-a923-9fd017b9c735' };
      team.managers = managers;

      const managerialCollection: IManagerial[] = [{ id: 'f99824d0-1540-4cae-a071-dc535f49c69a' }];
      jest.spyOn(managerialService, 'query').mockReturnValue(of(new HttpResponse({ body: managerialCollection })));
      const additionalManagerials = [managers];
      const expectedCollection: IManagerial[] = [...additionalManagerials, ...managerialCollection];
      jest.spyOn(managerialService, 'addManagerialToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ team });
      comp.ngOnInit();

      expect(managerialService.query).toHaveBeenCalled();
      expect(managerialService.addManagerialToCollectionIfMissing).toHaveBeenCalledWith(
        managerialCollection,
        ...additionalManagerials.map(expect.objectContaining)
      );
      expect(comp.managerialsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const team: ITeam = { id: 'CBA' };
      const teamLead: ITeamLead = { id: '3d71e34b-3568-48fc-8449-aab11a837ea1' };
      team.teamLead = teamLead;
      const managers: IManagerial = { id: '8b344fe7-824d-454e-9173-71cabb2d8ec4' };
      team.managers = managers;

      activatedRoute.data = of({ team });
      comp.ngOnInit();

      expect(comp.teamLeadsSharedCollection).toContain(teamLead);
      expect(comp.managerialsSharedCollection).toContain(managers);
      expect(comp.team).toEqual(team);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeam>>();
      const team = { id: 'ABC' };
      jest.spyOn(teamFormService, 'getTeam').mockReturnValue(team);
      jest.spyOn(teamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ team });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: team }));
      saveSubject.complete();

      // THEN
      expect(teamFormService.getTeam).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(teamService.update).toHaveBeenCalledWith(expect.objectContaining(team));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeam>>();
      const team = { id: 'ABC' };
      jest.spyOn(teamFormService, 'getTeam').mockReturnValue({ id: null });
      jest.spyOn(teamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ team: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: team }));
      saveSubject.complete();

      // THEN
      expect(teamFormService.getTeam).toHaveBeenCalled();
      expect(teamService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeam>>();
      const team = { id: 'ABC' };
      jest.spyOn(teamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ team });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teamService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTeamLead', () => {
      it('Should forward to teamLeadService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(teamLeadService, 'compareTeamLead');
        comp.compareTeamLead(entity, entity2);
        expect(teamLeadService.compareTeamLead).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareManagerial', () => {
      it('Should forward to managerialService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(managerialService, 'compareManagerial');
        comp.compareManagerial(entity, entity2);
        expect(managerialService.compareManagerial).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
