import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmployee, NewEmployee } from '../employee.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployee for edit and NewEmployeeFormGroupInput for create.
 */
type EmployeeFormGroupInput = IEmployee | PartialWithRequiredKeyOf<NewEmployee>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEmployee | NewEmployee> = Omit<T, 'dateOfBirth'> & {
  dateOfBirth?: string | null;
};

type EmployeeFormRawValue = FormValueOf<IEmployee>;

type NewEmployeeFormRawValue = FormValueOf<NewEmployee>;

type EmployeeFormDefaults = Pick<NewEmployee, 'id' | 'dateOfBirth'>;

type EmployeeFormGroupContent = {
  id: FormControl<EmployeeFormRawValue['id'] | NewEmployee['id']>;
  employeeCode: FormControl<EmployeeFormRawValue['employeeCode']>;
  name: FormControl<EmployeeFormRawValue['name']>;
  genderType: FormControl<EmployeeFormRawValue['genderType']>;
  dateOfBirth: FormControl<EmployeeFormRawValue['dateOfBirth']>;
  age: FormControl<EmployeeFormRawValue['age']>;
  email: FormControl<EmployeeFormRawValue['email']>;
  employeePicture: FormControl<EmployeeFormRawValue['employeePicture']>;
  employeePictureContentType: FormControl<EmployeeFormRawValue['employeePictureContentType']>;
  user: FormControl<EmployeeFormRawValue['user']>;
  director: FormControl<EmployeeFormRawValue['director']>;
  manager: FormControl<EmployeeFormRawValue['manager']>;
  teamLead: FormControl<EmployeeFormRawValue['teamLead']>;
  team: FormControl<EmployeeFormRawValue['team']>;
};

export type EmployeeFormGroup = FormGroup<EmployeeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeeFormService {
  createEmployeeFormGroup(employee: EmployeeFormGroupInput = { id: null }): EmployeeFormGroup {
    const employeeRawValue = this.convertEmployeeToEmployeeRawValue({
      ...this.getFormDefaults(),
      ...employee,
    });
    return new FormGroup<EmployeeFormGroupContent>({
      id: new FormControl(
        { value: employeeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      employeeCode: new FormControl(employeeRawValue.employeeCode),
      name: new FormControl(employeeRawValue.name, {
        validators: [Validators.required],
      }),
      genderType: new FormControl(employeeRawValue.genderType),
      dateOfBirth: new FormControl(employeeRawValue.dateOfBirth),
      age: new FormControl({value: employeeRawValue.age, disabled: true}),
      email: new FormControl(employeeRawValue.email, {
        validators: [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')],
      }),
      employeePicture: new FormControl(employeeRawValue.employeePicture),
      employeePictureContentType: new FormControl(employeeRawValue.employeePictureContentType),
      user: new FormControl(employeeRawValue.user),
      director: new FormControl(employeeRawValue.director),
      manager: new FormControl(employeeRawValue.manager),
      teamLead: new FormControl(employeeRawValue.teamLead),
      team: new FormControl(employeeRawValue.team),
    });
  }

  getEmployee(form: EmployeeFormGroup): IEmployee | NewEmployee {
    return this.convertEmployeeRawValueToEmployee(form.getRawValue() as EmployeeFormRawValue | NewEmployeeFormRawValue);
  }

  resetForm(form: EmployeeFormGroup, employee: EmployeeFormGroupInput): void {
    const employeeRawValue = this.convertEmployeeToEmployeeRawValue({ ...this.getFormDefaults(), ...employee });
    form.reset(
      {
        ...employeeRawValue,
        id: { value: employeeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmployeeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateOfBirth: currentTime,
    };
  }

  private convertEmployeeRawValueToEmployee(rawEmployee: EmployeeFormRawValue | NewEmployeeFormRawValue): IEmployee | NewEmployee {
    return {
      ...rawEmployee,
      dateOfBirth: dayjs(rawEmployee.dateOfBirth, DATE_TIME_FORMAT),
    };
  }

  private convertEmployeeToEmployeeRawValue(
    employee: IEmployee | (Partial<NewEmployee> & EmployeeFormDefaults)
  ): EmployeeFormRawValue | PartialWithRequiredKeyOf<NewEmployeeFormRawValue> {
    return {
      ...employee,
      dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
