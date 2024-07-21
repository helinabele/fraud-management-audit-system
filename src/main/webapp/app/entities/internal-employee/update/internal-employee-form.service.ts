import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInternalEmployee, NewInternalEmployee } from '../internal-employee.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInternalEmployee for edit and NewInternalEmployeeFormGroupInput for create.
 */
type InternalEmployeeFormGroupInput = IInternalEmployee | PartialWithRequiredKeyOf<NewInternalEmployee>;

type InternalEmployeeFormDefaults = Pick<NewInternalEmployee, 'id'>;

type InternalEmployeeFormGroupContent = {
  id: FormControl<IInternalEmployee['id'] | NewInternalEmployee['id']>;
  name: FormControl<IInternalEmployee['name']>;
  position: FormControl<IInternalEmployee['position']>;
  grade: FormControl<IInternalEmployee['grade']>;
  experience: FormControl<IInternalEmployee['experience']>;
  branch: FormControl<IInternalEmployee['branch']>;
  jobGrade: FormControl<IInternalEmployee['jobGrade']>;
  jobTitle: FormControl<IInternalEmployee['jobTitle']>;
};

export type InternalEmployeeFormGroup = FormGroup<InternalEmployeeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InternalEmployeeFormService {
  createInternalEmployeeFormGroup(internalEmployee: InternalEmployeeFormGroupInput = { id: null }): InternalEmployeeFormGroup {
    const internalEmployeeRawValue = {
      ...this.getFormDefaults(),
      ...internalEmployee,
    };
    return new FormGroup<InternalEmployeeFormGroupContent>({
      id: new FormControl(
        { value: internalEmployeeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(internalEmployeeRawValue.name, {
        validators: [Validators.required],
      }),
      position: new FormControl(internalEmployeeRawValue.position, {
        validators: [Validators.required],
      }),
      grade: new FormControl(internalEmployeeRawValue.grade),
      experience: new FormControl(internalEmployeeRawValue.experience),
      branch: new FormControl(internalEmployeeRawValue.branch),
      jobGrade: new FormControl(internalEmployeeRawValue.jobGrade),
      jobTitle: new FormControl(internalEmployeeRawValue.jobTitle),
    });
  }

  getInternalEmployee(form: InternalEmployeeFormGroup): IInternalEmployee | NewInternalEmployee {
    return form.getRawValue() as IInternalEmployee | NewInternalEmployee;
  }

  resetForm(form: InternalEmployeeFormGroup, internalEmployee: InternalEmployeeFormGroupInput): void {
    const internalEmployeeRawValue = { ...this.getFormDefaults(), ...internalEmployee };
    form.reset(
      {
        ...internalEmployeeRawValue,
        id: { value: internalEmployeeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InternalEmployeeFormDefaults {
    return {
      id: null,
    };
  }
}
