import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAssignTask, NewAssignTask } from '../assign-task.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssignTask for edit and NewAssignTaskFormGroupInput for create.
 */
type AssignTaskFormGroupInput = IAssignTask | PartialWithRequiredKeyOf<NewAssignTask>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAssignTask | NewAssignTask> = Omit<T, 'taskAssignmentDate' | 'taskStartDate' | 'taskEndDate'> & {
  taskAssignmentDate?: string | null;
  taskStartDate?: string | null;
  taskEndDate?: string | null;
};

type AssignTaskFormRawValue = FormValueOf<IAssignTask>;

type NewAssignTaskFormRawValue = FormValueOf<NewAssignTask>;

type AssignTaskFormDefaults = Pick<NewAssignTask, 'id' | 'taskAssignmentDate' | 'taskStartDate' | 'taskEndDate'>;

type AssignTaskFormGroupContent = {
  id: FormControl<AssignTaskFormRawValue['id'] | NewAssignTask['id']>;
  taskAssignmentDate: FormControl<AssignTaskFormRawValue['taskAssignmentDate']>;
  taskStartDate: FormControl<AssignTaskFormRawValue['taskStartDate']>;
  taskEndDate: FormControl<AssignTaskFormRawValue['taskEndDate']>;
  attachment: FormControl<AssignTaskFormRawValue['attachment']>;
  attachmentContentType: FormControl<AssignTaskFormRawValue['attachmentContentType']>;
  description: FormControl<AssignTaskFormRawValue['description']>;
  director: FormControl<AssignTaskFormRawValue['director']>;
  manager: FormControl<AssignTaskFormRawValue['manager']>;
  teamLead: FormControl<AssignTaskFormRawValue['teamLead']>;
  employee: FormControl<AssignTaskFormRawValue['employee']>;
  task: FormControl<AssignTaskFormRawValue['task']>;
  team: FormControl<AssignTaskFormRawValue['team']>;
  whistleBlowerReport: FormControl<AssignTaskFormRawValue['whistleBlowerReport']>;
};

export type AssignTaskFormGroup = FormGroup<AssignTaskFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssignTaskFormService {
  createAssignTaskFormGroup(assignTask: AssignTaskFormGroupInput = { id: null }): AssignTaskFormGroup {
    const assignTaskRawValue = this.convertAssignTaskToAssignTaskRawValue({
      ...this.getFormDefaults(),
      ...assignTask,
    });
    return new FormGroup<AssignTaskFormGroupContent>({
      id: new FormControl(
        { value: assignTaskRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      taskAssignmentDate: new FormControl(assignTaskRawValue.taskAssignmentDate),
      taskStartDate: new FormControl(assignTaskRawValue.taskStartDate),
      taskEndDate: new FormControl(assignTaskRawValue.taskEndDate),
      attachment: new FormControl(assignTaskRawValue.attachment),
      attachmentContentType: new FormControl(assignTaskRawValue.attachmentContentType),
      description: new FormControl(assignTaskRawValue.description),
      director: new FormControl(assignTaskRawValue.director),
      manager: new FormControl(assignTaskRawValue.manager),
      teamLead: new FormControl(assignTaskRawValue.teamLead),
      employee: new FormControl(assignTaskRawValue.employee),
      task: new FormControl(assignTaskRawValue.task),
      team: new FormControl(assignTaskRawValue.team),
      whistleBlowerReport: new FormControl(assignTaskRawValue.whistleBlowerReport),
    });
  }

  getAssignTask(form: AssignTaskFormGroup): IAssignTask | NewAssignTask {
    return this.convertAssignTaskRawValueToAssignTask(form.getRawValue() as AssignTaskFormRawValue | NewAssignTaskFormRawValue);
  }

  resetForm(form: AssignTaskFormGroup, assignTask: AssignTaskFormGroupInput): void {
    const assignTaskRawValue = this.convertAssignTaskToAssignTaskRawValue({ ...this.getFormDefaults(), ...assignTask });
    form.reset(
      {
        ...assignTaskRawValue,
        id: { value: assignTaskRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AssignTaskFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      taskAssignmentDate: currentTime,
      taskStartDate: currentTime,
      taskEndDate: currentTime,
    };
  }

  private convertAssignTaskRawValueToAssignTask(
    rawAssignTask: AssignTaskFormRawValue | NewAssignTaskFormRawValue
  ): IAssignTask | NewAssignTask {
    return {
      ...rawAssignTask,
      taskAssignmentDate: dayjs(rawAssignTask.taskAssignmentDate, DATE_TIME_FORMAT),
      taskStartDate: dayjs(rawAssignTask.taskStartDate, DATE_TIME_FORMAT),
      taskEndDate: dayjs(rawAssignTask.taskEndDate, DATE_TIME_FORMAT),
    };
  }

  private convertAssignTaskToAssignTaskRawValue(
    assignTask: IAssignTask | (Partial<NewAssignTask> & AssignTaskFormDefaults)
  ): AssignTaskFormRawValue | PartialWithRequiredKeyOf<NewAssignTaskFormRawValue> {
    return {
      ...assignTask,
      taskAssignmentDate: assignTask.taskAssignmentDate ? assignTask.taskAssignmentDate.format(DATE_TIME_FORMAT) : undefined,
      taskStartDate: assignTask.taskStartDate ? assignTask.taskStartDate.format(DATE_TIME_FORMAT) : undefined,
      taskEndDate: assignTask.taskEndDate ? assignTask.taskEndDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
