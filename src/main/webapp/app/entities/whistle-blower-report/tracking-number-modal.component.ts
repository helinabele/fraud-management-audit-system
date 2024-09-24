import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tracking-number-modal',
  templateUrl: './tracking-number-modal.component.html',
  styleUrls: ['./tracking-number-modal.component.scss']
})
export class TrackingNumberModalComponent {
  isCopied: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<TrackingNumberModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trackingNumber?: string },
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  copyToClipboard(trackingNumber: string): void {
    navigator.clipboard.writeText(trackingNumber).then(() => {
      this.isCopied = true;
      this.cd.detectChanges(); // Manually trigger change detection
      this.openSnackBar('Tracking number copied to clipboard!', 'Close');
      setTimeout(() => {
        this.isCopied = false;
        this.cd.detectChanges(); // Reset and trigger change detection
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
 /*  generateNewReport(): void {
    // Implement logic to generate a new report
    console.log('Generating a new report...');
    // Close the dialog if needed or perform additional actions
    this.onClose();
  } */
}
