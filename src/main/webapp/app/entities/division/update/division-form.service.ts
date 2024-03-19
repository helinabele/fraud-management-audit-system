import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDivision, NewDivision } from '../division.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDivision for edit and NewDivisionFormGroupInput for create.
 */
type DivisionFormGroupInput = IDivision | PartialWithRequiredKeyOf<NewDivision>;

type DivisionFormDefaults = Pick<NewDivision, 'id'>;

type DivisionFormGroupContent = {
  id: FormControl<IDivision['id'] | NewDivision['id']>;
  divisionName: FormControl<IDivision['divisionName']>;
  description: FormControl<IDivision['description']>;
};

export type DivisionFormGroup = FormGroup<DivisionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DivisionFormService {
  createDivisionFormGroup(division: DivisionFormGroupInput = { id: null }): DivisionFormGroup {
    const divisionRawValue = {
      ...this.getFormDefaults(),
      ...division,
    };
    return new FormGroup<DivisionFormGroupContent>({
      id: new FormControl(
        { value: divisionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      divisionName: new FormControl(divisionRawValue.divisionName, {
        validators: [Validators.required],
      }),
      description: new FormControl(divisionRawValue.description),
    });
  }

  getDivision(form: DivisionFormGroup): IDivision | NewDivision {
    return form.getRawValue() as IDivision | NewDivision;
  }

  resetForm(form: DivisionFormGroup, division: DivisionFormGroupInput): void {
    const divisionRawValue = { ...this.getFormDefaults(), ...division };
    form.reset(
      {
        ...divisionRawValue,
        id: { value: divisionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DivisionFormDefaults {
    return {
      id: null,
    };
  }
}
