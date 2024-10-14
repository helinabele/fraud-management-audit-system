import { Component, OnInit } from '@angular/core';
import { IWhistleBlowerReport } from 'app/entities/whistle-blower-report/whistle-blower-report.model';
import { WhistleBlowerReportService } from 'app/entities/whistle-blower-report/service/whistle-blower-report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  whistleBlowerForm: FormGroup | undefined;
  statusMessage?: string;
  whistleBlower: IWhistleBlowerReport | null | undefined = null;

  constructor(private formBuilder: FormBuilder, private whistleBlowerService: WhistleBlowerReportService) {}

  ngOnInit(): void {
    this.initWhistleBlowerForm();
  }

  initWhistleBlowerForm(): void {
    this.whistleBlowerForm = this.formBuilder.group({
      trackingNumber: ['', Validators.required]
    });
  }

  searchStatus(): void {
    if (this.whistleBlowerForm?.valid) {
        const trackingNumber = this.whistleBlowerForm.get('trackingNumber')?.value;

        this.whistleBlowerService.findByTrackingNumber(trackingNumber).subscribe(
            (response: IWhistleBlowerReport) => {
                console.log('API Response:', response);
                this.whistleBlower = response; // Populate the whistleBlower object
                this.statusMessage = undefined; // Clear status message if application found
            },
            (error: any) => {
                console.error('API Error:', error);
                this.statusMessage = 'No application found with that tracking number.';
                this.whistleBlower = undefined; // Clear whistleblower data if not found
            }
        );
    } else {
        this.statusMessage = 'Please enter a valid tracking number';
        this.whistleBlower = undefined; // Clear whistleblower data if input is empty or invalid
    }
}


  onSubmit(): void {
    this.searchStatus(); // Call the searchStatus method
  }
}
