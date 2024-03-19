import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SubCityFormService } from './sub-city-form.service';
import { SubCityService } from '../service/sub-city.service';
import { ISubCity } from '../sub-city.model';
import { ICity } from 'app/entities/city/city.model';
import { CityService } from 'app/entities/city/service/city.service';

import { SubCityUpdateComponent } from './sub-city-update.component';

describe('SubCity Management Update Component', () => {
  let comp: SubCityUpdateComponent;
  let fixture: ComponentFixture<SubCityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let subCityFormService: SubCityFormService;
  let subCityService: SubCityService;
  let cityService: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SubCityUpdateComponent],
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
      .overrideTemplate(SubCityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubCityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    subCityFormService = TestBed.inject(SubCityFormService);
    subCityService = TestBed.inject(SubCityService);
    cityService = TestBed.inject(CityService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call City query and add missing value', () => {
      const subCity: ISubCity = { id: 'CBA' };
      const city: ICity = { id: '7a788a00-7067-4455-8cf3-393b788239af' };
      subCity.city = city;

      const cityCollection: ICity[] = [{ id: '37508f48-bcb7-436a-a69b-d493579cb6e9' }];
      jest.spyOn(cityService, 'query').mockReturnValue(of(new HttpResponse({ body: cityCollection })));
      const additionalCities = [city];
      const expectedCollection: ICity[] = [...additionalCities, ...cityCollection];
      jest.spyOn(cityService, 'addCityToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ subCity });
      comp.ngOnInit();

      expect(cityService.query).toHaveBeenCalled();
      expect(cityService.addCityToCollectionIfMissing).toHaveBeenCalledWith(
        cityCollection,
        ...additionalCities.map(expect.objectContaining)
      );
      expect(comp.citiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const subCity: ISubCity = { id: 'CBA' };
      const city: ICity = { id: '85ffaddd-db53-4ed8-ab44-5c87f9743672' };
      subCity.city = city;

      activatedRoute.data = of({ subCity });
      comp.ngOnInit();

      expect(comp.citiesSharedCollection).toContain(city);
      expect(comp.subCity).toEqual(subCity);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubCity>>();
      const subCity = { id: 'ABC' };
      jest.spyOn(subCityFormService, 'getSubCity').mockReturnValue(subCity);
      jest.spyOn(subCityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subCity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subCity }));
      saveSubject.complete();

      // THEN
      expect(subCityFormService.getSubCity).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(subCityService.update).toHaveBeenCalledWith(expect.objectContaining(subCity));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubCity>>();
      const subCity = { id: 'ABC' };
      jest.spyOn(subCityFormService, 'getSubCity').mockReturnValue({ id: null });
      jest.spyOn(subCityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subCity: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subCity }));
      saveSubject.complete();

      // THEN
      expect(subCityFormService.getSubCity).toHaveBeenCalled();
      expect(subCityService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubCity>>();
      const subCity = { id: 'ABC' };
      jest.spyOn(subCityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subCity });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(subCityService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCity', () => {
      it('Should forward to cityService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(cityService, 'compareCity');
        comp.compareCity(entity, entity2);
        expect(cityService.compareCity).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
