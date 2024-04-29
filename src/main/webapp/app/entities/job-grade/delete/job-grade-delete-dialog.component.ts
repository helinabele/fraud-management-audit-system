import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobGrade } from '../job-grade.model';
import { JobGradeService } from '../service/job-grade.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './job-grade-delete-dialog.component.html',
})
export class JobGradeDeleteDialogComponent {
  jobGrade?: IJobGrade;

  constructor(protected jobGradeService: JobGradeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.jobGradeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
