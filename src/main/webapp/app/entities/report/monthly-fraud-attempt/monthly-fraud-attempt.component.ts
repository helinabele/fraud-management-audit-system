import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFraudKnowledgeManagement } from 'app/entities/fraud-knowledge-management/fraud-knowledge-management.model';
import { FraudKnowledgeManagementService } from 'app/entities/fraud-knowledge-management/service/fraud-knowledge-management.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-monthly-fraud-attempt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monthly-fraud-attempt.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss'],
})
export class MonthlyFraudAttemptComponent implements OnInit {
fraudKnowledgeManagment?: IFraudKnowledgeManagement[];
isLoading = false;

filteredNameList: any[] = [];

caseFilter = '';
titleFilter = '';
actualFraudAmountFilter = '';
financialLossAmountFilter = '';
frequencyFilter = '';

  constructor(
    private fraudKnowledgeManagmentService: FraudKnowledgeManagementService
  ) { }

  ngOnInit(): void {
    this.fraudKnowledgeManagmentService.getFraudKnowledgeManagements()
    .subscribe(data => {
      this.fraudKnowledgeManagment = data
    })
  }

  load(): void{
    this.ngOnInit();
  }

  filteredResults(): void{
    if(this.fraudKnowledgeManagment){
      this.filteredNameList = this.fraudKnowledgeManagment.filter(report => 
        (!this.titleFilter || (report.fraudInvestigationReport?.title?.toLowerCase().includes(this.titleFilter.toLowerCase()))) &&
        (!this.actualFraudAmountFilter || (report.actualFraudAmount?.toLowerCase().includes(this.actualFraudAmountFilter.toLowerCase()))) &&
        (!this.financialLossAmountFilter || (report.financialLossAmount?.toString().includes(this.financialLossAmountFilter.toLowerCase())))
        )
    }else{
      this.fraudKnowledgeManagment = [];
    }
  }

clearResults(): void{
  this.caseFilter = '';
  this.titleFilter = '';
  this.actualFraudAmountFilter = '';
  this.financialLossAmountFilter = '';
  this.frequencyFilter = '';
  this.filteredResults();
}

}
