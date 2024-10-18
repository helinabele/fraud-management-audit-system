import dayjs from 'dayjs/esm';
import { IDirector } from 'app/entities/director/director.model';
import { IManagerial } from 'app/entities/managerial/managerial.model';
import { ITeamLead } from 'app/entities/team-lead/team-lead.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { ITask } from 'app/entities/task/task.model';
import { ITeam } from 'app/entities/team/team.model';
import { IWhistleBlowerReport } from '../whistle-blower-report/whistle-blower-report.model';

export interface IAssignTask {
  id: string;
  taskAssignmentDate?: dayjs.Dayjs | null;
  taskStartDate?: dayjs.Dayjs | null;
  taskEndDate?: dayjs.Dayjs | null;
  attachment?: string | null;
  attachmentContentType?: string | null;
  description?: string | null;
  director?: Pick<IDirector, 'id' | 'directorName'> | null;
  manager?: Pick<IManagerial, 'id' | 'managerialName'> | null;
  teamLead?: Pick<ITeamLead, 'id' | 'teamLeadName'> | null;
  employee?: Pick<IEmployee, 'id' | 'name'> | null;
  task?: Pick<ITask, 'id' | 'title'> | null;
  team?: Pick<ITeam, 'id' | 'teamName'> | null;
  whistleBlowerReport?: IWhistleBlowerReport | null;
}

export type NewAssignTask = Omit<IAssignTask, 'id'> & { id: null };
