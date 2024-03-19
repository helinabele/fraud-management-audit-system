import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../whistle-blower-report.test-samples';

import { WhistleBlowerReportFormService } from './whistle-blower-report-form.service';

describe('WhistleBlowerReport Form Service', () => {
  let service: WhistleBlowerReportFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhistleBlowerReportFormService);
  });

  describe('Service methods', () => {
    describe('createWhistleBlowerReportFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWhistleBlowerReportFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fullName: expect.any(Object),
            genderType: expect.any(Object),
            emailAdress: expect.any(Object),
            phone: expect.any(Object),
            organization: expect.any(Object),
            message: expect.any(Object),
            attachment: expect.any(Object),
            position: expect.any(Object),
            zone: expect.any(Object),
            description: expect.any(Object),
            division: expect.any(Object),
            department: expect.any(Object),
            branch: expect.any(Object),
            region: expect.any(Object),
            city: expect.any(Object),
            subCity: expect.any(Object),
          })
        );
      });

      it('passing IWhistleBlowerReport should create a new form with FormGroup', () => {
        const formGroup = service.createWhistleBlowerReportFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fullName: expect.any(Object),
            genderType: expect.any(Object),
            emailAdress: expect.any(Object),
            phone: expect.any(Object),
            organization: expect.any(Object),
            message: expect.any(Object),
            attachment: expect.any(Object),
            position: expect.any(Object),
            zone: expect.any(Object),
            description: expect.any(Object),
            division: expect.any(Object),
            department: expect.any(Object),
            branch: expect.any(Object),
            region: expect.any(Object),
            city: expect.any(Object),
            subCity: expect.any(Object),
          })
        );
      });
    });

    describe('getWhistleBlowerReport', () => {
      it('should return NewWhistleBlowerReport for default WhistleBlowerReport initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWhistleBlowerReportFormGroup(sampleWithNewData);

        const whistleBlowerReport = service.getWhistleBlowerReport(formGroup) as any;

        expect(whistleBlowerReport).toMatchObject(sampleWithNewData);
      });

      it('should return NewWhistleBlowerReport for empty WhistleBlowerReport initial value', () => {
        const formGroup = service.createWhistleBlowerReportFormGroup();

        const whistleBlowerReport = service.getWhistleBlowerReport(formGroup) as any;

        expect(whistleBlowerReport).toMatchObject({});
      });

      it('should return IWhistleBlowerReport', () => {
        const formGroup = service.createWhistleBlowerReportFormGroup(sampleWithRequiredData);

        const whistleBlowerReport = service.getWhistleBlowerReport(formGroup) as any;

        expect(whistleBlowerReport).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWhistleBlowerReport should not enable id FormControl', () => {
        const formGroup = service.createWhistleBlowerReportFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWhistleBlowerReport should disable id FormControl', () => {
        const formGroup = service.createWhistleBlowerReportFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
