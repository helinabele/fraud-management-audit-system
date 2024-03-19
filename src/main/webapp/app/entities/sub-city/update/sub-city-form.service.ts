import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISubCity, NewSubCity } from '../sub-city.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISubCity for edit and NewSubCityFormGroupInput for create.
 */
type SubCityFormGroupInput = ISubCity | PartialWithRequiredKeyOf<NewSubCity>;

type SubCityFormDefaults = Pick<NewSubCity, 'id'>;

type SubCityFormGroupContent = {
  id: FormControl<ISubCity['id'] | NewSubCity['id']>;
  subCityName: FormControl<ISubCity['subCityName']>;
  description: FormControl<ISubCity['description']>;
  city: FormControl<ISubCity['city']>;
};

export type SubCityFormGroup = FormGroup<SubCityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SubCityFormService {
  createSubCityFormGroup(subCity: SubCityFormGroupInput = { id: null }): SubCityFormGroup {
    const subCityRawValue = {
      ...this.getFormDefaults(),
      ...subCity,
    };
    return new FormGroup<SubCityFormGroupContent>({
      id: new FormControl(
        { value: subCityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      subCityName: new FormControl(subCityRawValue.subCityName, {
        validators: [Validators.required],
      }),
      description: new FormControl(subCityRawValue.description),
      city: new FormControl(subCityRawValue.city),
    });
  }

  getSubCity(form: SubCityFormGroup): ISubCity | NewSubCity {
    return form.getRawValue() as ISubCity | NewSubCity;
  }

  resetForm(form: SubCityFormGroup, subCity: SubCityFormGroupInput): void {
    const subCityRawValue = { ...this.getFormDefaults(), ...subCity };
    form.reset(
      {
        ...subCityRawValue,
        id: { value: subCityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SubCityFormDefaults {
    return {
      id: null,
    };
  }
}
