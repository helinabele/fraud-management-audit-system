import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFraudKnowledgeManagement } from 'app/entities/fraud-knowledge-management/fraud-knowledge-management.model';
import { FraudKnowledgeManagementService } from 'app/entities/fraud-knowledge-management/service/fraud-knowledge-management.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FraudKnowledgeManagementSortField } from '../fraud-knowledge-management-sort-field.type';

@Component({
  selector: 'jhi-outstanding-quarterly-summary-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './outstanding-quarterly-summary-report.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss'],
})
export class OutstandingQuarterlySummaryReportComponent implements OnInit {
  outstandingFraud?: IFraudKnowledgeManagement[];
  searchForm: FormGroup;
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  sortField: FraudKnowledgeManagementSortField = '';
  isLoading = false;

  filteredNameList: any[] = [];

  nameFilter = '';
  actualIncidentFilter = '';

  constructor(
    private formBuilder: FormBuilder,
    private outstandingFraudsService: FraudKnowledgeManagementService,

  ) {
    this.searchForm = this.formBuilder.group({
      search: [''],
      property: ['reportNumber']
    });
  }

  ngOnInit(): void {
    this.outstandingFraudsService
      .getFraudKnowledgeManagements()
      .subscribe(data => {
        this.outstandingFraud = data
      })
  }
/*   search(): void {
    const search = this.searchForm.value.search;
    const property = this.searchForm.value.property;
    this.outstandingFraudsService
      .searchFraudKnowledgeManagements(search, property, this.currentPage - 1, this.pageSize.toString())
      .subscribe((response) => {
        this.outstandingFraud = response.content;
        this.totalItems = response.totalElements;
      });
  } 
  cancelSearch(): void {
    this.searchForm.reset();
    this.search();
  }*/

  load(): void {
    this.ngOnInit();
  }

  filteredResults(): void{
    if(this.outstandingFraud){
      this.filteredNameList = this.outstandingFraud.filter(report => 
        (!this.nameFilter || (report.unit?.toLowerCase().includes(this.nameFilter.toLowerCase()))) &&
        (!this.actualIncidentFilter || (report.actualIncident?.toLowerCase().includes(this.actualIncidentFilter.toLowerCase()))));
    } else{
      this.filteredNameList = [];
    }
  }

  clearResults(): void{
    this.nameFilter = '';
    this.filteredResults();
  }

}
