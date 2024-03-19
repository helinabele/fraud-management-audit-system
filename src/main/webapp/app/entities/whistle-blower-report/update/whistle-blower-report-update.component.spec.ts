import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WhistleBlowerReportFormService } from './whistle-blower-report-form.service';
import { WhistleBlowerReportService } from '../service/whistle-blower-report.service';
import { IWhistleBlowerReport } from '../whistle-blower-report.model';
import { IDivision } from 'app/entities/division/division.model';
import { DivisionService } from 'app/entities/division/service/division.service';
import { IDepartment } from 'app/entities/department/department.model';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { IBranch } from 'app/entities/branch/branch.model';
import { BranchService } from 'app/entities/branch/service/branch.service';
import { IRegion } from 'app/entities/region/region.model';
import { RegionService } from 'app/entities/region/service/region.service';
import { ICity } from 'app/entities/city/city.model';
import { CityService } from 'app/entities/city/service/city.service';
import { ISubCity } from 'app/entities/sub-city/sub-city.model';
import { SubCityService } from 'app/entities/sub-city/service/sub-city.service';

import { WhistleBlowerReportUpdateComponent } from './whistle-blower-report-update.component';

describe('WhistleBlowerReport Management Update Component', () => {
  let comp: WhistleBlowerReportUpdateComponent;
  let fixture: ComponentFixture<WhistleBlowerReportUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let whistleBlowerReportFormService: WhistleBlowerReportFormService;
  let whistleBlowerReportService: WhistleBlowerReportService;
  let divisionService: DivisionService;
  let departmentService: DepartmentService;
  let branchService: BranchService;
  let regionService: RegionService;
  let cityService: CityService;
  let subCityService: SubCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WhistleBlowerReportUpdateComponent],
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
      .overrideTemplate(WhistleBlowerReportUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WhistleBlowerReportUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    whistleBlowerReportFormService = TestBed.inject(WhistleBlowerReportFormService);
    whistleBlowerReportService = TestBed.inject(WhistleBlowerReportService);
    divisionService = TestBed.inject(DivisionService);
    departmentService = TestBed.inject(DepartmentService);
    branchService = TestBed.inject(BranchService);
    regionService = TestBed.inject(RegionService);
    cityService = TestBed.inject(CityService);
    subCityService = TestBed.inject(SubCityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Division query and add missing value', () => {
      const whistleBlowerReport: IWhistleBlowerReport = { id: 'CBA' };
      const division: IDivision = { id: 'f18dfa0b-0458-4b4e-815a-6e30654f6aaf' };
      whistleBlowerReport.division = division;

      const divisionCollection: IDivision[] = [{ id: 'c5395ef6-1252-4d4c-93b6-b9f34dbe1889' }];
      jest.spyOn(divisionService, 'query').mockReturnValue(of(new HttpResponse({ body: divisionCollection })));
      const additionalDivisions = [division];
      const expectedCollection: IDivision[] = [...additionalDivisions, ...divisionCollection];
      jest.spyOn(divisionService, 'addDivisionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      expect(divisionService.query).toHaveBeenCalled();
      expect(divisionService.addDivisionToCollectionIfMissing).toHaveBeenCalledWith(
        divisionCollection,
        ...additionalDivisions.map(expect.objectContaining)
      );
      expect(comp.divisionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Department query and add missing value', () => {
      const whistleBlowerReport: IWhistleBlowerReport = { id: 'CBA' };
      const department: IDepartment = { id: 'c782af3f-e453-41b6-8800-b15fb9d81eb7' };
      whistleBlowerReport.department = department;

      const departmentCollection: IDepartment[] = [{ id: 'b14c9f51-8f86-4070-902b-149cdf6b5998' }];
      jest.spyOn(departmentService, 'query').mockReturnValue(of(new HttpResponse({ body: departmentCollection })));
      const additionalDepartments = [department];
      const expectedCollection: IDepartment[] = [...additionalDepartments, ...departmentCollection];
      jest.spyOn(departmentService, 'addDepartmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      expect(departmentService.query).toHaveBeenCalled();
      expect(departmentService.addDepartmentToCollectionIfMissing).toHaveBeenCalledWith(
        departmentCollection,
        ...additionalDepartments.map(expect.objectContaining)
      );
      expect(comp.departmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Branch query and add missing value', () => {
      const whistleBlowerReport: IWhistleBlowerReport = { id: 'CBA' };
      const branch: IBranch = { id: '3ee0608a-0441-43f9-af9c-d896c84c638d' };
      whistleBlowerReport.branch = branch;

      const branchCollection: IBranch[] = [{ id: '22391449-9e5f-4622-a5dc-ce10a8df2132' }];
      jest.spyOn(branchService, 'query').mockReturnValue(of(new HttpResponse({ body: branchCollection })));
      const additionalBranches = [branch];
      const expectedCollection: IBranch[] = [...additionalBranches, ...branchCollection];
      jest.spyOn(branchService, 'addBranchToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      expect(branchService.query).toHaveBeenCalled();
      expect(branchService.addBranchToCollectionIfMissing).toHaveBeenCalledWith(
        branchCollection,
        ...additionalBranches.map(expect.objectContaining)
      );
      expect(comp.branchesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Region query and add missing value', () => {
      const whistleBlowerReport: IWhistleBlowerReport = { id: 'CBA' };
      const region: IRegion = { id: '5fa721bf-9d20-4791-b964-97d95f37da6a' };
      whistleBlowerReport.region = region;

      const regionCollection: IRegion[] = [{ id: '9bed82e2-e7e7-483e-9f41-de491aa7a20f' }];
      jest.spyOn(regionService, 'query').mockReturnValue(of(new HttpResponse({ body: regionCollection })));
      const additionalRegions = [region];
      const expectedCollection: IRegion[] = [...additionalRegions, ...regionCollection];
      jest.spyOn(regionService, 'addRegionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      expect(regionService.query).toHaveBeenCalled();
      expect(regionService.addRegionToCollectionIfMissing).toHaveBeenCalledWith(
        regionCollection,
        ...additionalRegions.map(expect.objectContaining)
      );
      expect(comp.regionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call City query and add missing value', () => {
      const whistleBlowerReport: IWhistleBlowerReport = { id: 'CBA' };
      const city: ICity = { id: '680bbd73-9a77-42f9-a4e0-bd68b89fee8d' };
      whistleBlowerReport.city = city;

      const cityCollection: ICity[] = [{ id: '661983d6-b5d6-40d5-97d1-04db055afb2b' }];
      jest.spyOn(cityService, 'query').mockReturnValue(of(new HttpResponse({ body: cityCollection })));
      const additionalCities = [city];
      const expectedCollection: ICity[] = [...additionalCities, ...cityCollection];
      jest.spyOn(cityService, 'addCityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      expect(cityService.query).toHaveBeenCalled();
      expect(cityService.addCityToCollectionIfMissing).toHaveBeenCalledWith(
        cityCollection,
        ...additionalCities.map(expect.objectContaining)
      );
      expect(comp.citiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SubCity query and add missing value', () => {
      const whistleBlowerReport: IWhistleBlowerReport = { id: 'CBA' };
      const subCity: ISubCity = { id: '603a2ba7-c255-4665-8d07-54e2f5fe323d' };
      whistleBlowerReport.subCity = subCity;

      const subCityCollection: ISubCity[] = [{ id: '00e233f7-d7ad-4fc9-a27d-fc9d753713cd' }];
      jest.spyOn(subCityService, 'query').mockReturnValue(of(new HttpResponse({ body: subCityCollection })));
      const additionalSubCities = [subCity];
      const expectedCollection: ISubCity[] = [...additionalSubCities, ...subCityCollection];
      jest.spyOn(subCityService, 'addSubCityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      expect(subCityService.query).toHaveBeenCalled();
      expect(subCityService.addSubCityToCollectionIfMissing).toHaveBeenCalledWith(
        subCityCollection,
        ...additionalSubCities.map(expect.objectContaining)
      );
      expect(comp.subCitiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const whistleBlowerReport: IWhistleBlowerReport = { id: 'CBA' };
      const division: IDivision = { id: '6d6618a6-65c4-4f4a-8cdc-d48dadd655d8' };
      whistleBlowerReport.division = division;
      const department: IDepartment = { id: 'e6591383-d541-4cbf-8dda-c94e970d0530' };
      whistleBlowerReport.department = department;
      const branch: IBranch = { id: 'f390359c-7afe-46df-b9f8-174c913f0fc5' };
      whistleBlowerReport.branch = branch;
      const region: IRegion = { id: '67822242-a978-45fc-82cf-901d97386e95' };
      whistleBlowerReport.region = region;
      const city: ICity = { id: 'fc797398-acb1-4915-b40a-2b855d59ceeb' };
      whistleBlowerReport.city = city;
      const subCity: ISubCity = { id: '44d05697-5065-4fb3-8a1d-6a1a42adb293' };
      whistleBlowerReport.subCity = subCity;

      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      expect(comp.divisionsSharedCollection).toContain(division);
      expect(comp.departmentsSharedCollection).toContain(department);
      expect(comp.branchesSharedCollection).toContain(branch);
      expect(comp.regionsSharedCollection).toContain(region);
      expect(comp.citiesSharedCollection).toContain(city);
      expect(comp.subCitiesSharedCollection).toContain(subCity);
      expect(comp.whistleBlowerReport).toEqual(whistleBlowerReport);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWhistleBlowerReport>>();
      const whistleBlowerReport = { id: 'ABC' };
      jest.spyOn(whistleBlowerReportFormService, 'getWhistleBlowerReport').mockReturnValue(whistleBlowerReport);
      jest.spyOn(whistleBlowerReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: whistleBlowerReport }));
      saveSubject.complete();

      // THEN
      expect(whistleBlowerReportFormService.getWhistleBlowerReport).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(whistleBlowerReportService.update).toHaveBeenCalledWith(expect.objectContaining(whistleBlowerReport));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWhistleBlowerReport>>();
      const whistleBlowerReport = { id: 'ABC' };
      jest.spyOn(whistleBlowerReportFormService, 'getWhistleBlowerReport').mockReturnValue({ id: null });
      jest.spyOn(whistleBlowerReportService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ whistleBlowerReport: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: whistleBlowerReport }));
      saveSubject.complete();

      // THEN
      expect(whistleBlowerReportFormService.getWhistleBlowerReport).toHaveBeenCalled();
      expect(whistleBlowerReportService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWhistleBlowerReport>>();
      const whistleBlowerReport = { id: 'ABC' };
      jest.spyOn(whistleBlowerReportService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ whistleBlowerReport });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(whistleBlowerReportService.update).toHaveBeenCalled();
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

    describe('compareBranch', () => {
      it('Should forward to branchService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(branchService, 'compareBranch');
        comp.compareBranch(entity, entity2);
        expect(branchService.compareBranch).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRegion', () => {
      it('Should forward to regionService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(regionService, 'compareRegion');
        comp.compareRegion(entity, entity2);
        expect(regionService.compareRegion).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCity', () => {
      it('Should forward to cityService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(cityService, 'compareCity');
        comp.compareCity(entity, entity2);
        expect(cityService.compareCity).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSubCity', () => {
      it('Should forward to subCityService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(subCityService, 'compareSubCity');
        comp.compareSubCity(entity, entity2);
        expect(subCityService.compareSubCity).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
