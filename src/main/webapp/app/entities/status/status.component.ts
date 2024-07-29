import { Component, OnInit } from '@angular/core';
import { IStatus } from './status.model';

@Component({
  selector: 'jhi-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  applicationNumber: string | undefined;
  statusMessage: string | undefined;
  applicationStatus: IStatus | undefined;
  constructor() {}

  ngOnInit(): void {
    console.log('this is status', this.statusMessage);
  }

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
