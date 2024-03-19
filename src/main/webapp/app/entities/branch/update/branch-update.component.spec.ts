import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BranchFormService } from './branch-form.service';
import { BranchService } from '../service/branch.service';
import { IBranch } from '../branch.model';
import { IDivision } from 'app/entities/division/division.model';
import { DivisionService } from 'app/entities/division/service/division.service';
import { IDepartment } from 'app/entities/department/department.model';
import { DepartmentService } from 'app/entities/department/service/department.service';

import { BranchUpdateComponent } from './branch-update.component';

describe('Branch Management Update Component', () => {
  let comp: BranchUpdateComponent;
  let fixture: ComponentFixture<BranchUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let branchFormService: BranchFormService;
  let branchService: BranchService;
  let divisionService: DivisionService;
  let departmentService: DepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BranchUpdateComponent],
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
      .overrideTemplate(BranchUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BranchUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    branchFormService = TestBed.inject(BranchFormService);
    branchService = TestBed.inject(BranchService);
    divisionService = TestBed.inject(DivisionService);
    departmentService = TestBed.inject(DepartmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Division query and add missing value', () => {
      const branch: IBranch = { id: 'CBA' };
      const division: IDivision = { id: '80c3b93f-2075-403b-8d7e-5e64f0e5a409' };
      branch.division = division;

      const divisionCollection: IDivision[] = [{ id: 'edef13fa-330e-452c-96a8-268c1435f755' }];
      jest.spyOn(divisionService, 'query').mockReturnValue(of(new HttpResponse({ body: divisionCollection })));
      const additionalDivisions = [division];
      const expectedCollection: IDivision[] = [...additionalDivisions, ...divisionCollection];
      jest.spyOn(divisionService, 'addDivisionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ branch });
      comp.ngOnInit();

      expect(divisionService.query).toHaveBeenCalled();
      expect(divisionService.addDivisionToCollectionIfMissing).toHaveBeenCalledWith(
        divisionCollection,
        ...additionalDivisions.map(expect.objectContaining)
      );
      expect(comp.divisionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Department query and add missing value', () => {
      const branch: IBranch = { id: 'CBA' };
      const department: IDepartment = { id: 'd953c3f0-6cb4-4ded-8d10-e9d62343895f' };
      branch.department = department;

      const departmentCollection: IDepartment[] = [{ id: '515badb0-8b3d-4940-bb03-ee60264abb23' }];
      jest.spyOn(departmentService, 'query').mockReturnValue(of(new HttpResponse({ body: departmentCollection })));
      const additionalDepartments = [department];
      const expectedCollection: IDepartment[] = [...additionalDepartments, ...departmentCollection];
      jest.spyOn(departmentService, 'addDepartmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ branch });
      comp.ngOnInit();

      expect(departmentService.query).toHaveBeenCalled();
      expect(departmentService.addDepartmentToCollectionIfMissing).toHaveBeenCalledWith(
        departmentCollection,
        ...additionalDepartments.map(expect.objectContaining)
      );
      expect(comp.departmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const branch: IBranch = { id: 'CBA' };
      const division: IDivision = { id: 'e7aaf54b-04ce-4898-9b51-65894697dd29' };
      branch.division = division;
      const department: IDepartment = { id: '676eda10-5aef-4b9f-b1b5-a174c485e75b' };
      branch.department = department;

      activatedRoute.data = of({ branch });
      comp.ngOnInit();

      expect(comp.divisionsSharedCollection).toContain(division);
      expect(comp.departmentsSharedCollection).toContain(department);
      expect(comp.branch).toEqual(branch);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBranch>>();
      const branch = { id: 'ABC' };
      jest.spyOn(branchFormService, 'getBranch').mockReturnValue(branch);
      jest.spyOn(branchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ branch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: branch }));
      saveSubject.complete();

      // THEN
      expect(branchFormService.getBranch).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(branchService.update).toHaveBeenCalledWith(expect.objectContaining(branch));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBranch>>();
      const branch = { id: 'ABC' };
      jest.spyOn(branchFormService, 'getBranch').mockReturnValue({ id: null });
      jest.spyOn(branchService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ branch: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: branch }));
      saveSubject.complete();

      // THEN
      expect(branchFormService.getBranch).toHaveBeenCalled();
      expect(branchService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBranch>>();
      const branch = { id: 'ABC' };
      jest.spyOn(branchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ branch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(branchService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDivision', () => {
      it('Should forward to divisionService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(divisionService, 'compareDivision');
        comp.compareDivision(entity, entity2);
        expect(divisionService.compareDivision).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDepartment', () => {
      it('Should forward to departmentService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(departmentService, 'compareDepartment');
        comp.compareDepartment(entity, entity2);
        expect(departmentService.compareDepartment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
