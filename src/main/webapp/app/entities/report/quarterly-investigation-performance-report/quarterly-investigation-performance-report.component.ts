import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFraudKnowledgeManagement } from 'app/entities/fraud-knowledge-management/fraud-knowledge-management.model';
import { FraudKnowledgeManagementService } from 'app/entities/fraud-knowledge-management/service/fraud-knowledge-management.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'jhi-quarterly-investigation-performance-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quarterly-investigation-performance-report.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss'],
})
export class QuarterlyInvestigationPerformanceReportComponent implements OnInit {
  fraudKnowledgeManagements?: IFraudKnowledgeManagement[];
  startDate?: Date;
  endDate?: Date;
  searchText: any;
  selectedReport: string | undefined;
  public searchFilter: any = '';
  noReports = `<tr><td colspan="3">No reports found.</td></tr>`;
  fraudTypeCounts: { [key: string]: number } = {};
  isLoading = false;

  filteredNameList: any[] = [];

  fraudTypeFilter = '';
  frequency = '';

  constructor(
    private fraudKnowledgeMgtService: FraudKnowledgeManagementService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
      this.fraudKnowledgeMgtService
      .getFraudKnowledgeManagements()
      .subscribe(
        fraudKnowledgeManagements => {
          this.fraudKnowledgeManagements = fraudKnowledgeManagements;
          this.filterResults();
        },
      );
  }

  // getFraudKnowledgeMgt(): void {
  //   if (this.startDate && this.endDate) {
  //     this.fraudKnowledgeMgtService.getFraudKnowledgeManagementsByDateRange(this.startDate, this.endDate)
  //       .subscribe(datas => {
  //         // Create a new array with only unique fraud knowledge management records
  //         const uniqueFraudKnowledgeManagements = datas.reduce((acc: IFraudKnowledgeManagement[], curr: IFraudKnowledgeManagement) => {
  //           const isDuplicate = acc.some((item: IFraudKnowledgeManagement) => item.fraudInvestigationReport?.title === curr.fraudInvestigationReport?.title);
  //           if (!isDuplicate) {
  //             acc.push(curr);
  //           }
  //           return acc;
  //         }, []);
  //         this.fraudKnowledgeManagements = uniqueFraudKnowledgeManagements;
  //         this.fraudTypeCounts = this.calculateFraudTypeCounts(uniqueFraudKnowledgeManagements);
  //       });
  //   } else {
  //     this.fraudKnowledgeMgtService.getFraudKnowledgeManagements()
  //       .subscribe(datas => {
  //         // Create a new array with only unique fraud knowledge management records
  //         const uniqueFraudKnowledgeManagements = datas.reduce((acc: IFraudKnowledgeManagement[], curr: IFraudKnowledgeManagement) => {
  //           const isDuplicate = acc.some((item: IFraudKnowledgeManagement) => item.fraudInvestigationReport?.title === curr.fraudInvestigationReport?.title);
  //           if (!isDuplicate) {
  //             acc.push(curr);
  //           }
  //           return acc;
  //         }, []);
  //         this.fraudKnowledgeManagements = uniqueFraudKnowledgeManagements;
  //         this.fraudTypeCounts = this.calculateFraudTypeCounts(uniqueFraudKnowledgeManagements);
  //       });
  //   }
  // }

  calculateFraudTypeCounts(uniqueFraudKnowledgeManagements: IFraudKnowledgeManagement[]): { [key: string]: number } {
    const fraudTypeCounts: { [key: string]: number } = {};

    // Loop through each fraud knowledge management record
    uniqueFraudKnowledgeManagements.forEach(fraudKnowledgeManagement => {

      // Get the fraud type from the fraud investigation report, if it exists
      const fraudInvestigationReport = fraudKnowledgeManagement.fraudInvestigationReport;
      const fraudType = fraudInvestigationReport?.title;

      // If the fraud type already exists in the fraudTypeCounts object, increment the count
      if (fraudType && Object.prototype.hasOwnProperty.call(fraudTypeCounts, fraudType)) {
        fraudTypeCounts[fraudType] += 1;
      }
      // Otherwise, add the fraud type to the fraudTypeCounts object with a count of 1
      else if (fraudType) {
        fraudTypeCounts[fraudType] = 1;
      }
    });

    return fraudTypeCounts;
  }

  submitFilter(): void {
    // handle form submission here
    // console.log("Form submitted:", this.startDate, this.endDate, this.searchText);
  }

  load(): void {
    this.ngOnInit();
  }

  filterResults(): void {
    if (this.fraudKnowledgeManagements) {
      this.filteredNameList = this.fraudKnowledgeManagements.filter(report =>
        (!this.fraudTypeFilter || report.fraudInvestigationReport?.title)
      );
    } else {
      this.filteredNameList = [];
    }
  }

  clearResults(): void {
    this.fraudTypeFilter = '';
    
  }
}