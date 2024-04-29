import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IJobTitle, NewJobTitle } from '../job-title.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IJobTitle for edit and NewJobTitleFormGroupInput for create.
 */
type JobTitleFormGroupInput = IJobTitle | PartialWithRequiredKeyOf<NewJobTitle>;

type JobTitleFormDefaults = Pick<NewJobTitle, 'id'>;

type JobTitleFormGroupContent = {
  id: FormControl<IJobTitle['id'] | NewJobTitle['id']>;
  jobTitleName: FormControl<IJobTitle['jobTitleName']>;
  description: FormControl<IJobTitle['description']>;
};

export type JobTitleFormGroup = FormGroup<JobTitleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class JobTitleFormService {
  createJobTitleFormGroup(jobTitle: JobTitleFormGroupInput = { id: null }): JobTitleFormGroup {
    const jobTitleRawValue = {
      ...this.getFormDefaults(),
      ...jobTitle,
    };
    return new FormGroup<JobTitleFormGroupContent>({
      id: new FormControl(
        { value: jobTitleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      jobTitleName: new FormControl(jobTitleRawValue.jobTitleName, {
        validators: [Validators.required],
      }),
      description: new FormControl(jobTitleRawValue.description),
    });
  }

  getJobTitle(form: JobTitleFormGroup): IJobTitle | NewJobTitle {
    return form.getRawValue() as IJobTitle | NewJobTitle;
  }

  resetForm(form: JobTitleFormGroup, jobTitle: JobTitleFormGroupInput): void {
    const jobTitleRawValue = { ...this.getFormDefaults(), ...jobTitle };
    form.reset(
      {
        ...jobTitleRawValue,
        id: { value: jobTitleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): JobTitleFormDefaults {
    return {
      id: null,
    };
  }
}
