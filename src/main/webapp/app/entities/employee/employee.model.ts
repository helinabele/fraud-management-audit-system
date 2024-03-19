import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IDirector } from 'app/entities/director/director.model';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ITeamLead } from 'app/entities/team-lead/team-lead.model';
import { ITeam } from 'app/entities/team/team.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IEmployee {
  id: string;
  employeeCode?: string | null;
  name?: string | null;
  genderType?: Gender | null;
  dateOfBirth?: dayjs.Dayjs | null;
  age?: number | null;
  email?: string | null;
  employeePicture?: string | null;
  employeePictureContentType?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  director?: Pick<IDirector, 'id' | 'directorName'> | null;
  manager?: Pick<IManagerial, 'id' | 'managerialName'> | null;
  teamLead?: Pick<ITeamLead, 'id' | 'teamLeadName'> | null;
  team?: Pick<ITeam, 'id' | 'teamName'> | null;
  selected?: boolean;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
