import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubCity } from '../sub-city.model';
import { SubCityService } from '../service/sub-city.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './sub-city-delete-dialog.component.html',
})
export class SubCityDeleteDialogComponent {
  subCity?: ISubCity;

  constructor(protected subCityService: SubCityService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.subCityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
