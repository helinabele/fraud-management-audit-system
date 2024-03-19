import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TeamComponent } from './list/team.component';
import { TeamDetailComponent } from './detail/team-detail.component';
import { TeamUpdateComponent } from './update/team-update.component';
import { TeamDeleteDialogComponent } from './delete/team-delete-dialog.component';
import { TeamRoutingModule } from './route/team-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, TeamRoutingModule, NgMultiSelectDropDownModule.forRoot(), CommonModule, ReactiveFormsModule],
  declarations: [TeamComponent, TeamDetailComponent, TeamUpdateComponent, TeamDeleteDialogComponent],
})
export class TeamModule {}
