import { Component, OnInit } from '@angular/core';
import { IStatus } from './status.model';


import { Router } from '@angular/router';

import { Account } from 'app/core/auth/account.model';
//import { IWhistleBlowerReport } from app/entities/whistle-blower-report/whistle-blower-report.model
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { IWhistleBlowerReport, NewWhistleBlowerReport } from 'app/entities/whistle-blower-report/whistle-blower-report.model';
import { WhistleBlowerReportService } from 'app/entities/whistle-blower-report/service/whistle-blower-report.service';
//import { FormBuilder } from '@angular/forms';
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

  account: Account | null = null;

  whistleBlow: IWhistleBlowerReport[] | undefined | null = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tooltipConfig: NgbTooltipConfig,
    public whistleBlowerService: WhistleBlowerReportService,
  ) {}


  ngOnInit(): void {
    this.initWhistleBlowerForm();
    console.log('this is status', this.statusMessage);
  }

  //..................check status.................................


  initWhistleBlowerForm(): void {
    this.whistleBlowerForm = this.formBuilder.group({
      id: ['', Validators.required],
      fullName: [''],
      description: [''],
      gender: ['']
    });

    this.whistleBlowerForm.get('id')?.valueChanges.subscribe((id) => {
      this.getWhistleBlowerByID(id);
    });
  }

  getWhistleBlowerByID(id: string): void {
    this.whistleBlowerService.find(id).subscribe(
      (response) => {
        this.whistleBlower = response.body;
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
        description: this.whistleBlower.description,
        gender: this.whistleBlower.genderType
      });
    }
  }

//........................................................

  searchStatus(): void {
    if (this.applicationNumber) {
      // Simulate checking the database (replace this with actual database check)
      const database: { [key: string]: IStatus } = {
        '12345': { fullName: 'John Doe', serviceType: 'Type A', requestedDate: '2023-07-01', status: 'Processing' },
        '67890': { fullName: 'Jane Smith', serviceType: 'Type B', requestedDate: '2023-07-02', status: 'Completed' }
      };

      if (database[this.applicationNumber]) {
        this.applicationStatus = database[this.applicationNumber];
        this.statusMessage = undefined; // Clear status message if application found
      } else {
        this.statusMessage = 'Error has occurred while processing your request, please try again';
        this.applicationStatus = undefined; // Clear application status if not found
      }
    } else {
      this.statusMessage = 'Please enter an application number';
      this.applicationStatus = undefined; // Clear application status if input is empty
    }
  }

}
