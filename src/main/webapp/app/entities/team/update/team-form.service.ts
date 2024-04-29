import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITeam, NewTeam } from '../team.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeam for edit and NewTeamFormGroupInput for create.
 */
type TeamFormGroupInput = ITeam | PartialWithRequiredKeyOf<NewTeam>;

type TeamFormDefaults = Pick<NewTeam, 'id' | 'isCreator'>;

type TeamFormGroupContent = {
  id: FormControl<ITeam['id'] | NewTeam['id']>;
  teamName: FormControl<ITeam['teamName']>;
  description: FormControl<ITeam['description']>;
  managerialId: FormControl<ITeam['managerialId']>;
  isCreator: FormControl<ITeam['isCreator']>;
  teamLead: FormControl<ITeam['teamLead']>;
  managers: FormControl<ITeam['managers']>;
  employee: FormControl<ITeam['employee']>;
};

export type TeamFormGroup = FormGroup<TeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeamFormService {
  createTeamFormGroup(team: TeamFormGroupInput = { id: null }): TeamFormGroup {
    const teamRawValue = {
      ...this.getFormDefaults(),
      ...team,
    };
    return new FormGroup<TeamFormGroupContent>({
      id: new FormControl(
        { value: teamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      teamName: new FormControl(teamRawValue.teamName),
      description: new FormControl(teamRawValue.description),
      managerialId: new FormControl(teamRawValue.managerialId),
      isCreator: new FormControl(teamRawValue.isCreator),
      teamLead: new FormControl(teamRawValue.teamLead),
      managers: new FormControl(teamRawValue.managers),
      employee: new FormControl(teamRawValue.employee),
    });
  }

  getTeam(form: TeamFormGroup): ITeam | NewTeam {
    return form.getRawValue() as ITeam | NewTeam;
  }

  resetForm(form: TeamFormGroup, team: TeamFormGroupInput): void {
    const teamRawValue = { ...this.getFormDefaults(), ...team };
    form.reset(
      {
        ...teamRawValue,
        id: { value: teamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TeamFormDefaults {
    return {
      id: null,
      isCreator: false,
    };
  }
}
