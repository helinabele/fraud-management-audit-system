import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IReportRepository, NewReportRepository } from '../report-repository.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReportRepository for edit and NewReportRepositoryFormGroupInput for create.
 */
type ReportRepositoryFormGroupInput = IReportRepository | PartialWithRequiredKeyOf<NewReportRepository>;

type ReportRepositoryFormDefaults = Pick<NewReportRepository, 'id'>;

type ReportRepositoryFormGroupContent = {
  id: FormControl<IReportRepository['id'] | NewReportRepository['id']>;
  reportRepositoryName: FormControl<IReportRepository['reportRepositoryName']>;
  attachment: FormControl<IReportRepository['attachment']>;
  attachmentContentType: FormControl<IReportRepository['attachmentContentType']>;
  description: FormControl<IReportRepository['description']>;
};

export type ReportRepositoryFormGroup = FormGroup<ReportRepositoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReportRepositoryFormService {
  createReportRepositoryFormGroup(reportRepository: ReportRepositoryFormGroupInput = { id: null }): ReportRepositoryFormGroup {
    const reportRepositoryRawValue = {
      ...this.getFormDefaults(),
      ...reportRepository,
    };
    return new FormGroup<ReportRepositoryFormGroupContent>({
      id: new FormControl(
        { value: reportRepositoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportRepositoryName: new FormControl(reportRepositoryRawValue.reportRepositoryName),
      attachment: new FormControl(reportRepositoryRawValue.attachment),
      attachmentContentType: new FormControl(reportRepositoryRawValue.attachmentContentType),
      description: new FormControl(reportRepositoryRawValue.description)
    });
  }

  getReportRepository(form: ReportRepositoryFormGroup): IReportRepository | NewReportRepository {
    return form.getRawValue() as IReportRepository | NewReportRepository;
  }

  resetForm(form: ReportRepositoryFormGroup, reportRepository: ReportRepositoryFormGroupInput): void {
    const reportRepositoryRawValue = { ...this.getFormDefaults(), ...reportRepository };
    form.reset(
      {
        ...reportRepositoryRawValue,
        id: { value: reportRepositoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ReportRepositoryFormDefaults {
    return {
      id: null,
    };
  }
}
