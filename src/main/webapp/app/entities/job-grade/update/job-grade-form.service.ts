import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IJobGrade, NewJobGrade } from '../job-grade.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobGrade for edit and NewJobGradeFormGroupInput for create.
 */
type JobGradeFormGroupInput = IJobGrade | PartialWithRequiredKeyOf<NewJobGrade>;

type JobGradeFormDefaults = Pick<NewJobGrade, 'id'>;

type JobGradeFormGroupContent = {
  id: FormControl<IJobGrade['id'] | NewJobGrade['id']>;
  jobGradeName: FormControl<IJobGrade['jobGradeName']>;
  description: FormControl<IJobGrade['description']>;
};

export type JobGradeFormGroup = FormGroup<JobGradeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobGradeFormService {
  createJobGradeFormGroup(jobGrade: JobGradeFormGroupInput = { id: null }): JobGradeFormGroup {
    const jobGradeRawValue = {
      ...this.getFormDefaults(),
      ...jobGrade,
    };
    return new FormGroup<JobGradeFormGroupContent>({
      id: new FormControl(
        { value: jobGradeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      jobGradeName: new FormControl(jobGradeRawValue.jobGradeName, {
        validators: [Validators.required],
      }),
      description: new FormControl(jobGradeRawValue.description),
    });
  }

  getJobGrade(form: JobGradeFormGroup): IJobGrade | NewJobGrade {
    return form.getRawValue() as IJobGrade | NewJobGrade;
  }

  resetForm(form: JobGradeFormGroup, jobGrade: JobGradeFormGroupInput): void {
    const jobGradeRawValue = { ...this.getFormDefaults(), ...jobGrade };
    form.reset(
      {
        ...jobGradeRawValue,
        id: { value: jobGradeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): JobGradeFormDefaults {
    return {
      id: null,
    };
  }
}
