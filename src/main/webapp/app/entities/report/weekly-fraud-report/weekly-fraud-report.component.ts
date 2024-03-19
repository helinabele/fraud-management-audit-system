import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFraudKnowledgeManagement } from 'app/entities/fraud-knowledge-management/fraud-knowledge-management.model';
import { FraudKnowledgeManagementService } from 'app/entities/fraud-knowledge-management/service/fraud-knowledge-management.service';

@Component({
  selector: 'jhi-weekly-fraud-report',
  standalone: true,
  templateUrl: './weekly-fraud-report.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})

export class WeeklyFraudReportComponent implements OnInit {
  fraudKnowledgeManagements?: IFraudKnowledgeManagement[];
  isLoading = false;
  nameFilter = '';
  addressFilter = '';
  causeFilter = '';
  fraudTypeFilter = '';

  filteredNameList: any[] = [];

  constructor(
    private fraudKnowledgeManagementService: FraudKnowledgeManagementService
  ) { }

  ngOnInit(): void {
    this.fraudKnowledgeManagementService
      .getFraudKnowledgeManagements()
      .subscribe(
        fraudKnowledgeManagements => {
          this.fraudKnowledgeManagements = fraudKnowledgeManagements;
          this.filterResults();
        },
      );
    // this.search();
  }

  load(): void {
    this.ngOnInit;
  }

  filterResults(): void {
    this.filteredNameList = this.fraudKnowledgeManagements?.filter(report =>
      (!this.causeFilter || (report.causeForAnIncident?.toLowerCase().includes(this.fraudTypeFilter.toLowerCase())))
    ) ?? [];
  }
}
