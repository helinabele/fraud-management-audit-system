import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobGradeComponent } from './list/job-grade.component';
import { JobGradeDetailComponent } from './detail/job-grade-detail.component';
import { JobGradeUpdateComponent } from './update/job-grade-update.component';
import { JobGradeDeleteDialogComponent } from './delete/job-grade-delete-dialog.component';
import { JobGradeRoutingModule } from './route/job-grade-routing.module';

@NgModule({
  imports: [SharedModule, JobGradeRoutingModule],
  declarations: [JobGradeComponent, JobGradeDetailComponent, JobGradeUpdateComponent, JobGradeDeleteDialogComponent],
})
export class JobGradeModule {}
