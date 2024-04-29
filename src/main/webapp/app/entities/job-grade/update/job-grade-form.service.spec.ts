import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../job-grade.test-samples';
import { JobGradeFormService } from './job-grade-form.service';


describe('JobGrade Form Service', () => {
  let service: JobGradeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobGradeFormService);
  });

  describe('Service methods', () => {
    describe('createJobGradeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createJobGradeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            jobGradeName: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing IJobGrade should create a new form with FormGroup', () => {
        const formGroup = service.createJobGradeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            jobGradeName: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getJobGrade', () => {
      it('should return NewJobGrade for default JobGrade initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createJobGradeFormGroup(sampleWithNewData);

        const jobGrade = service.getJobGrade(formGroup) as any;

        expect(jobGrade).toMatchObject(sampleWithNewData);
      });

      it('should return NewJobGrade for empty JobGrade initial value', () => {
        const formGroup = service.createJobGradeFormGroup();

        const jobGrade = service.getJobGrade(formGroup) as any;

        expect(jobGrade).toMatchObject({});
      });

      it('should return IJobGrade', () => {
        const formGroup = service.createJobGradeFormGroup(sampleWithRequiredData);

        const jobGrade = service.getJobGrade(formGroup) as any;

        expect(jobGrade).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IJobGrade should not enable id FormControl', () => {
        const formGroup = service.createJobGradeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewJobGrade should disable id FormControl', () => {
        const formGroup = service.createJobGradeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
