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
  whistleBlowerReport: IWhistleBlowerReport | null | undefined = null;

  constructor(private formBuilder: FormBuilder, private whistleBlowerService: WhistleBlowerReportService) {}

  ngOnInit(): void {
    this.initWhistleBlowerForm();
  }

  initWhistleBlowerForm(): void {
    this.whistleBlowerForm = this.formBuilder.group({
      trackingNumber: ['', Validators.required]
    });
  }

/*   initWhistleBlowerForm(): void {
    this.whistleBlowerForm = this.formBuilder.group({
      id: ['', Validators.required],
      fullName: [''],
      description: [''],
      gender: ['']
    });

    this.whistleBlowerForm.get('id')?.valueChanges.subscribe((id) => {
      this.getWhistleBlowerByID(id);
    });
  } */

  getWhistleBlowerByID(id: string): void {
    this.whistleBlowerService.find(id).subscribe(
      (response) => {
        this.whistleBlowerReport = response.body;
        this.populateWhistleBlowerForm();
      },
      (error: any) => {
        console.error(`Error fetching whistle blower report:`, error);
      }
    );
  }
  populateWhistleBlowerForm(): void {
    if (this.whistleBlowerReport && this.whistleBlowerForm) {
      this.whistleBlowerForm.patchValue({
        fullName: this.whistleBlowerReport.fullName,
        description: this.whistleBlowerReport.description,
        gender: this.whistleBlowerReport.genderType
      });
    }
  }

//........................................................

  searchStatus(): void {
    if (this.whistleBlowerForm?.valid) {
        const trackingNumber = this.whistleBlowerForm.get('trackingNumber')?.value;

        this.whistleBlowerService.findByTrackingNumber(trackingNumber).subscribe(
            (response: IWhistleBlowerReport) => {
                console.log('API Response:', response);
                this.whistleBlowerReport = response; // Populate the whistleBlowerReport object
                this.statusMessage = undefined; // Clear status message if application found
            },
            (error: any) => {
                console.error('API Error:', error);
                this.statusMessage = 'No application found with that tracking number.';
                this.whistleBlowerReport = undefined; // Clear whistleBlowerReport data if not found
            }
        );
    } else {
        this.statusMessage = 'Please enter a valid tracking number';
        this.whistleBlowerReport = undefined; // Clear whistleBlowerReport data if input is empty or invalid
    }
}


  onSubmit(): void {
    this.searchStatus(); // Call the searchStatus method
  }
}
