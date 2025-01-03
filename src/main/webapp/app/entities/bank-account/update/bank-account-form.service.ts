import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBankAccount, NewBankAccount } from '../bank-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBankAccount for edit and NewBankAccountFormGroupInput for create.
 */
type BankAccountFormGroupInput = IBankAccount | PartialWithRequiredKeyOf<NewBankAccount>;

type BankAccountFormDefaults = Pick<NewBankAccount, 'id'>;

type BankAccountFormGroupContent = {
  id: FormControl<IBankAccount['id'] | NewBankAccount['id']>;
  bankName: FormControl<IBankAccount['bankName']>;
  description: FormControl<IBankAccount['description']>;
};

export type BankAccountFormGroup = FormGroup<BankAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BankAccountFormService {
  createBankAccountFormGroup(bankAccount: BankAccountFormGroupInput = { id: null }): BankAccountFormGroup {
    const bankAccountRawValue = {
      ...this.getFormDefaults(),
      ...bankAccount,
    };
    return new FormGroup<BankAccountFormGroupContent>({
      id: new FormControl(
        { value: bankAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      bankName: new FormControl(bankAccountRawValue.bankName, {
        validators: [Validators.required],
      }),
      description: new FormControl(bankAccountRawValue.description),
    });
  }

  getBankAccount(form: BankAccountFormGroup): IBankAccount | NewBankAccount {
    return form.getRawValue() as IBankAccount | NewBankAccount;
  }

  resetForm(form: BankAccountFormGroup, bankAccount: BankAccountFormGroupInput): void {
    const bankAccountRawValue = { ...this.getFormDefaults(), ...bankAccount };
    form.reset(
      {
        ...bankAccountRawValue,
        id: { value: bankAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BankAccountFormDefaults {
    return {
      id: null,
    };
  }
}
