import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFraudInvestigationReport, NewFraudInvestigationReport } from '../fraud-investigation-report.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFraudInvestigationReport for edit and NewFraudInvestigationReportFormGroupInput for create.
 */
type FraudInvestigationReportFormGroupInput = IFraudInvestigationReport | PartialWithRequiredKeyOf<NewFraudInvestigationReport>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IFraudInvestigationReport | NewFraudInvestigationReport> = Omit<T, 'publicationDate'> & {
  publicationDate?: string | null;
};

type FraudInvestigationReportFormRawValue = FormValueOf<IFraudInvestigationReport>;

type NewFraudInvestigationReportFormRawValue = FormValueOf<NewFraudInvestigationReport>;

type FraudInvestigationReportFormDefaults = Pick<NewFraudInvestigationReport, 'id' | 'publicationDate' | 'comments' | 'objectiveComments'>;

type FraudInvestigationReportFormGroupContent = {
  id: FormControl<FraudInvestigationReportFormRawValue['id'] | NewFraudInvestigationReport['id']>;
  title: FormControl<FraudInvestigationReportFormRawValue['title']>;
  executiveSummary: FormControl<FraudInvestigationReportFormRawValue['executiveSummary']>;
  introductionAnnex: FormControl<FraudInvestigationReportFormRawValue['introductionAnnex']>;
  introductionAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['introductionAnnexContentType']>;
  introduction: FormControl<FraudInvestigationReportFormRawValue['introduction']>;
  comments: FormControl<FraudInvestigationReportFormRawValue['comments']>;
  newComment: FormControl<string | null>;
  objective: FormControl<FraudInvestigationReportFormRawValue['objective']>;
  objectiveAnnex: FormControl<FraudInvestigationReportFormRawValue['objectiveAnnex']>;
  objectiveAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['objectiveAnnexContentType']>;
  objectiveComments: FormControl<FraudInvestigationReportFormRawValue['objectiveComments']>;
  newObjectiveComment: FormControl<string | null>;
  scope: FormControl<FraudInvestigationReportFormRawValue['scope']>;
  scopeAnnex: FormControl<FraudInvestigationReportFormRawValue['scopeAnnex']>;
  scopeAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['scopeAnnexContentType']>;
  limitation: FormControl<FraudInvestigationReportFormRawValue['limitation']>;
  limitationAnnex: FormControl<FraudInvestigationReportFormRawValue['limitationAnnex']>;
  limitationAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['limitationAnnexContentType']>;
  methodology: FormControl<FraudInvestigationReportFormRawValue['methodology']>;
  methodologyAnnex: FormControl<FraudInvestigationReportFormRawValue['methodologyAnnex']>;
  methodologyAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['methodologyAnnexContentType']>;
  findingAndAnalysis: FormControl<FraudInvestigationReportFormRawValue['findingAndAnalysis']>;
  findingAndAnalysisAnnex: FormControl<FraudInvestigationReportFormRawValue['findingAndAnalysisAnnex']>;
  findingAndAnalysisAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['findingAndAnalysisAnnexContentType']>;
  conclusion: FormControl<FraudInvestigationReportFormRawValue['conclusion']>;
  conclusionAnnex: FormControl<FraudInvestigationReportFormRawValue['conclusionAnnex']>;
  conclusionAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['conclusionAnnexContentType']>;
  recommendation: FormControl<FraudInvestigationReportFormRawValue['recommendation']>;
  recommendationAnnex: FormControl<FraudInvestigationReportFormRawValue['recommendationAnnex']>;
  recommendationAnnexContentType: FormControl<FraudInvestigationReportFormRawValue['recommendationAnnexContentType']>;
  nameOfMembers: FormControl<FraudInvestigationReportFormRawValue['nameOfMembers']>;
  signature: FormControl<FraudInvestigationReportFormRawValue['signature']>;
  references: FormControl<FraudInvestigationReportFormRawValue['references']>;
  referencesContentType: FormControl<FraudInvestigationReportFormRawValue['referencesContentType']>;
  publicationDate: FormControl<FraudInvestigationReportFormRawValue['publicationDate']>;
  author: FormControl<FraudInvestigationReportFormRawValue['author']>;
  employee: FormControl<FraudInvestigationReportFormRawValue['employee']>;
  task: FormControl<FraudInvestigationReportFormRawValue['task']>;
  team: FormControl<FraudInvestigationReportFormRawValue['team']>;
  [key: string]: any;
};

export type FraudInvestigationReportFormGroup = FormGroup<FraudInvestigationReportFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FraudInvestigationReportFormService {
  createFraudInvestigationReportFormGroup(
    fraudInvestigationReport: FraudInvestigationReportFormGroupInput = { id: null }
  ): FraudInvestigationReportFormGroup {
    const fraudInvestigationReportRawValue = this.convertFraudInvestigationReportToFraudInvestigationReportRawValue({
      ...this.getFormDefaults(),
      ...fraudInvestigationReport,
    });
    return new FormGroup<FraudInvestigationReportFormGroupContent>({
      id: new FormControl(
        { value: fraudInvestigationReportRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(fraudInvestigationReportRawValue.title, {
        validators: [Validators.required],
      }),
      executiveSummary: new FormControl(fraudInvestigationReportRawValue.executiveSummary),
      introductionAnnex: new FormControl(fraudInvestigationReportRawValue.introductionAnnex),
      introductionAnnexContentType: new FormControl(fraudInvestigationReportRawValue.introductionAnnexContentType),
      introduction: new FormControl(fraudInvestigationReportRawValue.introduction, {
        validators: [Validators.required],
      }),
      comments: new FormControl(fraudInvestigationReportRawValue.comments),
      newComment: new FormControl(null),
      objective: new FormControl(fraudInvestigationReportRawValue.objective, {
        validators: [Validators.required],
      }),
      objectiveAnnex: new FormControl(fraudInvestigationReportRawValue.objectiveAnnex),
      objectiveAnnexContentType: new FormControl(fraudInvestigationReportRawValue.objectiveAnnexContentType),
      objectiveComments: new FormControl(fraudInvestigationReportRawValue.objectiveComments),
      newObjectiveComment: new FormControl(null),
      scope: new FormControl(fraudInvestigationReportRawValue.scope),
      scopeAnnex: new FormControl(fraudInvestigationReportRawValue.scopeAnnex),
      scopeAnnexContentType: new FormControl(fraudInvestigationReportRawValue.scopeAnnexContentType),
      limitation: new FormControl(fraudInvestigationReportRawValue.limitation),
      limitationAnnex: new FormControl(fraudInvestigationReportRawValue.limitationAnnex),
      limitationAnnexContentType: new FormControl(fraudInvestigationReportRawValue.limitationAnnexContentType),
      methodology: new FormControl(fraudInvestigationReportRawValue.methodology, {
        validators: [Validators.required],
      }),
      methodologyAnnex: new FormControl(fraudInvestigationReportRawValue.methodologyAnnex),
      methodologyAnnexContentType: new FormControl(fraudInvestigationReportRawValue.methodologyAnnexContentType),
      findingAndAnalysis: new FormControl(fraudInvestigationReportRawValue.findingAndAnalysis),
      findingAndAnalysisAnnex: new FormControl(fraudInvestigationReportRawValue.findingAndAnalysisAnnex),
      findingAndAnalysisAnnexContentType: new FormControl(fraudInvestigationReportRawValue.findingAndAnalysisAnnexContentType),
      conclusion: new FormControl(fraudInvestigationReportRawValue.conclusion),
      conclusionAnnex: new FormControl(fraudInvestigationReportRawValue.conclusionAnnex),
      conclusionAnnexContentType: new FormControl(fraudInvestigationReportRawValue.conclusionAnnexContentType),
      recommendation: new FormControl(fraudInvestigationReportRawValue.recommendation),
      recommendationAnnex: new FormControl(fraudInvestigationReportRawValue.recommendationAnnex),
      recommendationAnnexContentType: new FormControl(fraudInvestigationReportRawValue.recommendationAnnexContentType),
      nameOfMembers: new FormControl(fraudInvestigationReportRawValue.nameOfMembers),
      signature: new FormControl(fraudInvestigationReportRawValue.signature),
      references: new FormControl(fraudInvestigationReportRawValue.references),
      referencesContentType: new FormControl(fraudInvestigationReportRawValue.referencesContentType),
      publicationDate: new FormControl(fraudInvestigationReportRawValue.publicationDate),
      author: new FormControl(fraudInvestigationReportRawValue.author),
      employee: new FormControl(fraudInvestigationReportRawValue.employee),
      task: new FormControl(fraudInvestigationReportRawValue.task),
      team: new FormControl(fraudInvestigationReportRawValue.team),
    });
  }

  getFraudInvestigationReport(form: FraudInvestigationReportFormGroup): IFraudInvestigationReport | NewFraudInvestigationReport {
    return this.convertFraudInvestigationReportRawValueToFraudInvestigationReport(
      form.getRawValue() as FraudInvestigationReportFormRawValue | NewFraudInvestigationReportFormRawValue
    );
  }

  resetForm(form: FraudInvestigationReportFormGroup, fraudInvestigationReport: FraudInvestigationReportFormGroupInput): void {
    const fraudInvestigationReportRawValue = this.convertFraudInvestigationReportToFraudInvestigationReportRawValue({
      ...this.getFormDefaults(),
      ...fraudInvestigationReport,
    });
    form.reset(
      {
        ...fraudInvestigationReportRawValue,
        id: { value: fraudInvestigationReportRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FraudInvestigationReportFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      publicationDate: currentTime,
      comments: [],
    };
  }

  private convertFraudInvestigationReportRawValueToFraudInvestigationReport(
    rawFraudInvestigationReport: FraudInvestigationReportFormRawValue | NewFraudInvestigationReportFormRawValue
  ): IFraudInvestigationReport | NewFraudInvestigationReport {
    return {
      ...rawFraudInvestigationReport,
      publicationDate: dayjs(rawFraudInvestigationReport.publicationDate, DATE_TIME_FORMAT),
    };
  }

  private convertFraudInvestigationReportToFraudInvestigationReportRawValue(
    fraudInvestigationReport: IFraudInvestigationReport | (Partial<NewFraudInvestigationReport> & FraudInvestigationReportFormDefaults)
  ): FraudInvestigationReportFormRawValue | PartialWithRequiredKeyOf<NewFraudInvestigationReportFormRawValue> {
    return {
      ...fraudInvestigationReport,
      publicationDate: fraudInvestigationReport.publicationDate
        ? fraudInvestigationReport.publicationDate.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
