import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sub-city.test-samples';

import { SubCityFormService } from './sub-city-form.service';

describe('SubCity Form Service', () => {
  let service: SubCityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCityFormService);
  });

  describe('Service methods', () => {
    describe('createSubCityFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSubCityFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subCityName: expect.any(Object),
            description: expect.any(Object),
            city: expect.any(Object),
          })
        );
      });

      it('passing ISubCity should create a new form with FormGroup', () => {
        const formGroup = service.createSubCityFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            subCityName: expect.any(Object),
            description: expect.any(Object),
            city: expect.any(Object),
          })
        );
      });
    });

    describe('getSubCity', () => {
      it('should return NewSubCity for default SubCity initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSubCityFormGroup(sampleWithNewData);

        const subCity = service.getSubCity(formGroup) as any;

        expect(subCity).toMatchObject(sampleWithNewData);
      });

      it('should return NewSubCity for empty SubCity initial value', () => {
        const formGroup = service.createSubCityFormGroup();

        const subCity = service.getSubCity(formGroup) as any;

        expect(subCity).toMatchObject({});
      });

      it('should return ISubCity', () => {
        const formGroup = service.createSubCityFormGroup(sampleWithRequiredData);

        const subCity = service.getSubCity(formGroup) as any;

        expect(subCity).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISubCity should not enable id FormControl', () => {
        const formGroup = service.createSubCityFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSubCity should disable id FormControl', () => {
        const formGroup = service.createSubCityFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
