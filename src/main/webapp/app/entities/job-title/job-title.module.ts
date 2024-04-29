import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobTitleComponent } from './list/job-title.component';
import { JobTitleDetailComponent } from './detail/job-title-detail.component';
import { JobTitleUpdateComponent } from './update/job-title-update.component';
import { JobTitleDeleteDialogComponent } from './delete/job-title-delete-dialog.component';
import { JobTitleRoutingModule } from './route/job-title-routing.module';

@NgModule({
  imports: [SharedModule, JobTitleRoutingModule],
  declarations: [JobTitleComponent, JobTitleDetailComponent, JobTitleUpdateComponent, JobTitleDeleteDialogComponent],
})
export class JobTitleModule {}
