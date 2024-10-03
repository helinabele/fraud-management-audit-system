import { Component, OnInit } from '@angular/core';
import { IStatus } from './status.model';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { IWhistleBlowerReport } from 'app/entities/whistle-blower-report/whistle-blower-report.model';
import { WhistleBlowerReportService } from 'app/entities/whistle-blower-report/service/whistle-blower-report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
    applicationNumber: string | undefined;
    statusMessage: string | undefined;
    applicationStatus: IStatus | undefined;

    whistleBlowerForm: FormGroup | undefined | null;
    whistleBlower: IWhistleBlowerReport | undefined | null = null;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private tooltipConfig: NgbTooltipConfig,
        public whistleBlowerService: WhistleBlowerReportService
    ) {}

    ngOnInit(): void {
        this.initWhistleBlowerForm();
    }

    initWhistleBlowerForm(): void {
        this.whistleBlowerForm = this.formBuilder.group({
            trackingNumber: ['', Validators.required],
            fullName: [''],
            description: [''],
            gender: ['']
        });

        this.whistleBlowerForm.get('trackingNumber')?.valueChanges.subscribe((trackingNumber) => {
            this.getWhistleBlowerByTrackingNumber(trackingNumber);
        });
    }

    getWhistleBlowerByTrackingNumber(trackingNumber: string): void {
        this.whistleBlowerService.findByTrackingNumber(trackingNumber).subscribe(
            (response: IWhistleBlowerReport) => {
                this.whistleBlower = response;
                this.populateWhistleBlowerForm();
            },
            (error: any) => {
                console.error(`Error fetching whistle blower report:`, error);
            }
        );
    }

    populateWhistleBlowerForm(): void {
        if (this.whistleBlower && this.whistleBlowerForm) {
            this.whistleBlowerForm.patchValue({
                fullName: this.whistleBlower.fullName,
                description: this.whistleBlower.message,
                gender: this.whistleBlower.genderType
            });
        }
    }

    searchStatus(): void {
        if (this.whistleBlowerForm?.valid) {
            this.applicationNumber = this.whistleBlowerForm.get('trackingNumber')?.value;

            if (this.applicationNumber) {
                this.whistleBlowerService.findByTrackingNumber(this.applicationNumber).subscribe(
                    (response: IWhistleBlowerReport) => {
                        this.whistleBlower = response; // Populate the whistleBlower with fetched data
                        this.populateWhistleBlowerForm(); // Populate the form with the retrieved data
                        this.statusMessage = undefined; // Clear status message if application found
                    },
                    (error: any) => {
                        this.statusMessage = 'No application found with that tracking number.';
                        this.whistleBlower = undefined; // Clear whistle blower data if not found
                    }
                );
            } else {
                this.statusMessage = 'Please enter a valid tracking number';
                this.whistleBlower = undefined; // Clear whistle blower data if input is empty
            }
        } else {
            this.statusMessage = 'Please enter a valid tracking number';
            this.whistleBlower = undefined; // Clear whistle blower data if input is empty or invalid
        }
    }

    onSubmit(): void {
        this.searchStatus(); // Call the existing searchStatus method
    }
}