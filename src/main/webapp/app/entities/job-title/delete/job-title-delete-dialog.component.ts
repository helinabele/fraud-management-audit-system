import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobTitle } from '../job-title.model';
import { JobTitleService } from '../service/job-title.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './job-title-delete-dialog.component.html',
})
export class JobTitleDeleteDialogComponent {
  jobTitle?: IJobTitle;

  constructor(protected jobTitleService: JobTitleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.jobTitleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
