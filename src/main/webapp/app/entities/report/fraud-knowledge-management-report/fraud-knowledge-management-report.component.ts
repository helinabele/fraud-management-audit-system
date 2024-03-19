import { Component, OnInit } from '@angular/core';
import { IFraudKnowledgeManagement } from 'app/entities/fraud-knowledge-management/fraud-knowledge-management.model';
import { FraudKnowledgeManagementService } from 'app/entities/fraud-knowledge-management/service/fraud-knowledge-management.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FraudKnowledgeManagementSortField } from '../fraud-knowledge-management-sort-field.type';
import dayjs from 'dayjs';

@Component({
  selector: 'jhi-fraud-knowledge-management-report',
  standalone: true,
  templateUrl: './fraud-knowledge-management-report.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class FraudKnowledgeManagementReportComponent implements OnInit {
  fraudKnowledgeManagements?: IFraudKnowledgeManagement[];
  searchForm: FormGroup;
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  sortField: FraudKnowledgeManagementSortField = '';
  isLoading = false;

  filterdNameList: any[] = [];

  reportNumberFilter = '';
  fraudInvestigationReportFilter = '';
  fraudIncidentFilter = '';
  actualIncidentFilter = '';
  attemptIncidentFilter = '';
  unitFilter = '';
  incidentDateFilter = '';
  dateOfDetectionFilter = '';
  employeeFilter = '';
  fraudTypeFilter = '';

  public propertyMapping = {
    reportNumber: 1,
    fraudIncident: 2,
    actualIncident: 3,
    attemptIncident: 4,
    reasonForFailure: 5
  };

  constructor(
    private formBuilder: FormBuilder,
    private fraudKnowledgeManagementService: FraudKnowledgeManagementService
  ) {
    this.searchForm = this.formBuilder.group({
      search: [''],
      property: ['reportNumber']
    });
  }

  ngOnInit(): void {
    this.fraudKnowledgeManagementService
      .getFraudKnowledgeManagements()
      .subscribe(
        fraudKnowledgeManagements => {
          this.fraudKnowledgeManagements = fraudKnowledgeManagements;
          this.filteredResults();
        },
      );
  }

  load(): void {
    this.ngOnInit();
  }

  onPageChange(event: any): void {
    this.currentPage = Number(event.pageIndex) + 1;
    this.pageSize = event.pageSize;
    // this.search();
  }

  filteredResults(): void {
    this.filterdNameList = this.fraudKnowledgeManagements?.filter(report => 
      (!this.incidentDateFilter || 
        (report.incidentDate && 
          dayjs(report.incidentDate).isSame(this.incidentDateFilter) ||
          dayjs(report.incidentDate).isAfter(this.incidentDateFilter)))
      ) ?? []
  } 

  clearResults(): void {
    this.reportNumberFilter = '';
    this.fraudInvestigationReportFilter = '';
    this.fraudIncidentFilter = '';
    this.actualIncidentFilter = '';
    this.attemptIncidentFilter = '';
    this.unitFilter = '';
    this.incidentDateFilter = '';
    this.dateOfDetectionFilter = '';
    this.employeeFilter = '';
    this.fraudTypeFilter = '';
  }

}