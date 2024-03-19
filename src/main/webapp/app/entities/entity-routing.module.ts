import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        data: { pageTitle: 'fraudMgtApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'director',
        data: { pageTitle: 'fraudMgtApp.director.home.title' },
        loadChildren: () => import('./director/director.module').then(m => m.DirectorModule),
      },
      {
        path: 'managerial',
        data: { pageTitle: 'fraudMgtApp.managerial.home.title' },
        loadChildren: () => import('./managerial/managerial.module').then(m => m.ManagerialModule),
      },
      {
        path: 'team-lead',
        data: { pageTitle: 'fraudMgtApp.teamLead.home.title' },
        loadChildren: () => import('./team-lead/team-lead.module').then(m => m.TeamLeadModule),
      },
      {
        path: 'task',
        data: { pageTitle: 'fraudMgtApp.task.home.title' },
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'assign-task',
        data: { pageTitle: 'fraudMgtApp.assignTask.home.title' },
        loadChildren: () => import('./assign-task/assign-task.module').then(m => m.AssignTaskModule),
      },
      {
        path: 'fraud-investigation-report',
        data: { pageTitle: 'fraudMgtApp.fraudInvestigationReport.home.title' },
        loadChildren: () =>
          import('./fraud-investigation-report/fraud-investigation-report.module').then(m => m.FraudInvestigationReportModule),
      },
      {
        path: 'findings',
        data: { pageTitle: 'fraudMgtApp.findings.home.title' },
        loadChildren: () => import('./findings/findings.module').then(m => m.FindingsModule),
      },
      {
        path: 'fraud-knowledge-management',
        data: { pageTitle: 'fraudMgtApp.fraudKnowledgeManagement.home.title' },
        loadChildren: () =>
          import('./fraud-knowledge-management/fraud-knowledge-management.module').then(m => m.FraudKnowledgeManagementModule),
      },
      {
        path: 'fraud-type',
        data: { pageTitle: 'fraudMgtApp.fraudType.home.title' },
        loadChildren: () => import('./fraud-type/fraud-type.module').then(m => m.FraudTypeModule),
      },
      {
        path: 'internal-employee',
        data: { pageTitle: 'fraudMgtApp.internalEmployee.home.title' },
        loadChildren: () => import('./internal-employee/internal-employee.module').then(m => m.InternalEmployeeModule),
      },
      {
        path: 'external-employee',
        data: { pageTitle: 'fraudMgtApp.externalEmployee.home.title' },
        loadChildren: () => import('./external-employee/external-employee.module').then(m => m.ExternalEmployeeModule),
      },
      {
        path: 'bank-account',
        data: { pageTitle: 'fraudMgtApp.bankAccount.home.title' },
        loadChildren: () => import('./bank-account/bank-account.module').then(m => m.BankAccountModule),
      },
      {
        path: 'bank-service',
        data: { pageTitle: 'fraudMgtApp.bankService.home.title' },
        loadChildren: () => import('./bank-service/bank-service.module').then(m => m.BankServiceModule),
      },
      {
        path: 'team',
        data: { pageTitle: 'fraudMgtApp.team.home.title' },
        loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
      },
      {
        path: 'whistle-blower-report',
        data: { pageTitle: 'fraudMgtApp.whistleBlowerReport.home.title' },
        loadChildren: () => import('./whistle-blower-report/whistle-blower-report.module').then(m => m.WhistleBlowerReportModule),
      },
      // {
      //   path: 'comment',
      //   data: { pageTitle: 'fraudMgt.comment.home.title' },
      //   loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule),
      // },
      {
        path: 'report',
        data: { pageTitle: 'fraudMgt.report.title' },
        loadChildren: () => import('./report/report.module').then(m => m.ReportRoutingModule),
      },
      {
        path: 'division',
        data: { pageTitle: 'fraudMgtApp.division.home.title' },
        loadChildren: () => import('./division/division.module').then(m => m.DivisionModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'fraudMgtApp.department.home.title' },
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'branch',
        data: { pageTitle: 'fraudMgtApp.branch.home.title' },
        loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule),
      },
      {
        path: 'region',
        data: { pageTitle: 'fraudMgtApp.region.home.title' },
        loadChildren: () => import('./region/region.module').then(m => m.RegionModule),
      },
      {
        path: 'city',
        data: { pageTitle: 'fraudMgtApp.city.home.title' },
        loadChildren: () => import('./city/city.module').then(m => m.CityModule),
      },
      {
        path: 'sub-city',
        data: { pageTitle: 'fraudMgtApp.subCity.home.title' },
        loadChildren: () => import('./sub-city/sub-city.module').then(m => m.SubCityModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
