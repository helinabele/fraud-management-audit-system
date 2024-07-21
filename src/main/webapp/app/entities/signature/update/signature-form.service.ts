import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISignature, NewSignature } from '../signature.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISignature for edit and NewSignatureFormGroupInput for create.
 */
type SignatureFormGroupInput = ISignature | PartialWithRequiredKeyOf<NewSignature>;

type SignatureFormDefaults = Pick<NewSignature, 'id'>;

type SignatureFormGroupContent = {
  id: FormControl<ISignature['id'] | NewSignature['id']>;
  signatureName: FormControl<ISignature['signatureName']>;
  signature: FormControl<ISignature['signature']>;
  signatureContentType: FormControl<ISignature['signatureContentType']>;
  description: FormControl<ISignature['description']>;
};

export type SignatureFormGroup = FormGroup<SignatureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SignatureFormService {
  createSignatureFormGroup(signature: SignatureFormGroupInput = { id: null }): SignatureFormGroup {
    const signatureRawValue = {
      ...this.getFormDefaults(),
      ...signature,
    };
    return new FormGroup<SignatureFormGroupContent>({
      id: new FormControl(
        { value: signatureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      signatureName: new FormControl(signatureRawValue.signatureName),
      signature: new FormControl(signatureRawValue.signature),
      signatureContentType: new FormControl(signatureRawValue.signatureContentType),
      description: new FormControl(signatureRawValue.description)
    });
  }

  getSignature(form: SignatureFormGroup): ISignature | NewSignature {
    return form.getRawValue() as ISignature | NewSignature;
  }

  resetForm(form: SignatureFormGroup, signature: SignatureFormGroupInput): void {
    const signatureRawValue = { ...this.getFormDefaults(), ...signature };
    form.reset(
      {
        ...signatureRawValue,
        id: { value: signatureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SignatureFormDefaults {
    return {
      id: null,
    };
  }
}
