import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWhistleBlowerReport, NewWhistleBlowerReport } from '../whistle-blower-report.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWhistleBlowerReport for edit and NewWhistleBlowerReportFormGroupInput for create.
 */
type WhistleBlowerReportFormGroupInput = IWhistleBlowerReport | PartialWithRequiredKeyOf<NewWhistleBlowerReport>;

type WhistleBlowerReportFormDefaults = Pick<NewWhistleBlowerReport, 'id'>;

type WhistleBlowerReportFormGroupContent = {
  id: FormControl<IWhistleBlowerReport['id'] | NewWhistleBlowerReport['id']>;
  fullName: FormControl<IWhistleBlowerReport['fullName']>;
  genderType: FormControl<IWhistleBlowerReport['genderType']>;
  emailAdress: FormControl<IWhistleBlowerReport['emailAdress']>;
  phone: FormControl<IWhistleBlowerReport['phone']>;
  organization: FormControl<IWhistleBlowerReport['organization']>;
  message: FormControl<IWhistleBlowerReport['message']>;
  attachment: FormControl<IWhistleBlowerReport['attachment']>;
  attachmentContentType: FormControl<IWhistleBlowerReport['attachmentContentType']>;
  position: FormControl<IWhistleBlowerReport['position']>;
  zone: FormControl<IWhistleBlowerReport['zone']>;
  description: FormControl<IWhistleBlowerReport['description']>;
  division: FormControl<IWhistleBlowerReport['division']>;
  divisionFraud: FormControl<IWhistleBlowerReport['division']>;
  department: FormControl<IWhistleBlowerReport['department']>;
  departmentFraud: FormControl<IWhistleBlowerReport['department']>;
  branch: FormControl<IWhistleBlowerReport['branch']>;
  branchFraud: FormControl<IWhistleBlowerReport['branch']>;
  region: FormControl<IWhistleBlowerReport['region']>;
  city: FormControl<IWhistleBlowerReport['city']>;
  subCity: FormControl<IWhistleBlowerReport['subCity']>;
};

export type WhistleBlowerReportFormGroup = FormGroup<WhistleBlowerReportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WhistleBlowerReportFormService {
  createWhistleBlowerReportFormGroup(whistleBlowerReport: WhistleBlowerReportFormGroupInput = { id: null }): WhistleBlowerReportFormGroup {
    const whistleBlowerReportRawValue = {
      ...this.getFormDefaults(),
      ...whistleBlowerReport,
    };
    return new FormGroup<WhistleBlowerReportFormGroupContent>({
      id: new FormControl(
        { value: whistleBlowerReportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fullName: new FormControl(whistleBlowerReportRawValue.fullName),
      genderType: new FormControl(whistleBlowerReportRawValue.genderType),
      emailAdress: new FormControl(whistleBlowerReportRawValue.emailAdress),
      phone: new FormControl(whistleBlowerReportRawValue.phone),
      organization: new FormControl(whistleBlowerReportRawValue.organization),
      message: new FormControl(whistleBlowerReportRawValue.message),
      attachment: new FormControl(whistleBlowerReportRawValue.attachment),
      attachmentContentType: new FormControl(whistleBlowerReportRawValue.attachmentContentType),
      position: new FormControl(whistleBlowerReportRawValue.position),
      zone: new FormControl(whistleBlowerReportRawValue.zone),
      description: new FormControl(whistleBlowerReportRawValue.description),
      division: new FormControl(whistleBlowerReportRawValue.division),
      divisionFraud: new FormControl(whistleBlowerReportRawValue.division),
      departmentFraud: new FormControl(whistleBlowerReportRawValue.division),
      department: new FormControl(whistleBlowerReportRawValue.department),
      branch: new FormControl(whistleBlowerReportRawValue.branch),
      branchFraud: new FormControl(whistleBlowerReportRawValue.branch),
      region: new FormControl(whistleBlowerReportRawValue.region),
      city: new FormControl(whistleBlowerReportRawValue.city),
      subCity: new FormControl(whistleBlowerReportRawValue.subCity),
    });
  }

  getWhistleBlowerReport(form: WhistleBlowerReportFormGroup): IWhistleBlowerReport | NewWhistleBlowerReport {
    return form.getRawValue() as IWhistleBlowerReport | NewWhistleBlowerReport;
  }

  resetForm(form: WhistleBlowerReportFormGroup, whistleBlowerReport: WhistleBlowerReportFormGroupInput): void {
    const whistleBlowerReportRawValue = { ...this.getFormDefaults(), ...whistleBlowerReport };
    form.reset(
      {
        ...whistleBlowerReportRawValue,
        id: { value: whistleBlowerReportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WhistleBlowerReportFormDefaults {
    return {
      id: null,
    };
  }
}
