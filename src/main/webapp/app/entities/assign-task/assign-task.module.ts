import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AssignTaskComponent } from './list/assign-task.component';
import { AssignTaskDetailComponent } from './detail/assign-task-detail.component';
import { AssignTaskUpdateComponent } from './update/assign-task-update.component';
import { AssignTaskDeleteDialogComponent } from './delete/assign-task-delete-dialog.component';
import { AssignTaskRoutingModule } from './route/assign-task-routing.module';

@NgModule({
  imports: [SharedModule, AssignTaskRoutingModule],
  declarations: [AssignTaskComponent, AssignTaskDetailComponent, AssignTaskUpdateComponent, AssignTaskDeleteDialogComponent],
})
export class AssignTaskModule {}
