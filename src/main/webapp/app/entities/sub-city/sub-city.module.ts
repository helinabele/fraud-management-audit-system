import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SubCityComponent } from './list/sub-city.component';
import { SubCityDetailComponent } from './detail/sub-city-detail.component';
import { SubCityUpdateComponent } from './update/sub-city-update.component';
import { SubCityDeleteDialogComponent } from './delete/sub-city-delete-dialog.component';
import { SubCityRoutingModule } from './route/sub-city-routing.module';

@NgModule({
  imports: [SharedModule, SubCityRoutingModule],
  declarations: [SubCityComponent, SubCityDetailComponent, SubCityUpdateComponent, SubCityDeleteDialogComponent],
})
export class SubCityModule {}
