import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFraudKnowledgeManagement } from '../fraud-knowledge-management.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, FraudKnowledgeManagementService } from '../service/fraud-knowledge-management.service';
import { FraudKnowledgeManagementDeleteDialogComponent } from '../delete/fraud-knowledge-management-delete-dialog.component';

@Component({
  selector: 'jhi-fraud-knowledge-management',
  templateUrl: './fraud-knowledge-management.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss'],
})
export class FraudKnowledgeManagementComponent implements OnInit {
  fraudKnowledgeManagements?: IFraudKnowledgeManagement[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  filteredNameList: any[] = [];

  reportNumberFilter = '';
  fraudIncidentFilter = '';
  actualIncidentFilter = '';
  attemptIncidentFilter = '';
  reasonForFailureFilter = '';
  unitFilter = '';
  incidentDateFilter = '';
  dateOfDetectionFilter = '';
  reasonForDelayFilter = '';
  projectCreationDateFilter = '';
  reportDateFilter = '';
  suspectedFraudsterFilter = '';
  financialLossAmountFilter = '';
  actualFraudAmountFilter = '';

  constructor(
    protected fraudKnowledgeManagementService: FraudKnowledgeManagementService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) { }

  trackId = (_index: number, item: IFraudKnowledgeManagement): string =>
    this.fraudKnowledgeManagementService.getFraudKnowledgeManagementIdentifier(item);

  ngOnInit(): void {
    this.load();
  }

  delete(fraudKnowledgeManagement: IFraudKnowledgeManagement): void {
    const modalRef = this.modalService.open(FraudKnowledgeManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fraudKnowledgeManagement = fraudKnowledgeManagement;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
        this.filteredResults();
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending);
  }

  /*   filteredResults(): void {
      if (this.fraudKnowledgeManagements) {
        this.filteredNameList = this.fraudKnowledgeManagements.filter(report =>
          (!this.reportNumberFilter || (report.reportNumber && report.reportNumber?.toLowerCase().includes(this.reportNumberFilter.toLowerCase()))) &&
          (!this.fraudIncidentFilter || (report.fraudIncident && report.fraudIncident?.toLowerCase().includes(this.fraudIncidentFilter.toLowerCase()))) &&
          (!this.actualIncidentFilter || (report.actualIncident && report.actualIncident?.toLowerCase().includes(this.actualIncidentFilter.toLowerCase()))) &&
          (!this.attemptIncidentFilter || (report.attemptIncident && report.attemptIncident?.toLowerCase().includes(this.attemptIncidentFilter.toLowerCase()))) &&
          (!this.reasonForFailureFilter || (report.reasonForFailure && report.reasonForFailure?.toLowerCase().includes(this.reasonForFailureFilter.toLowerCase()))) &&
          (!this.unitFilter || (report.unit && report.unit?.toLowerCase().includes(this.unitFilter.toLowerCase()))) &&
          (!this.incidentDateFilter || (report.incidentDate && report.incidentDate)) &&
          (!this.dateOfDetectionFilter || (report.dateOfDetection && report.dateOfDetection)) &&
          (!this.reasonForDelayFilter || (report.reasonForDelay && report.reasonForDelay)) &&
          (!this.projectCreationDateFilter || (report.projectCreationDate && report.projectCreationDate)) &&
          (!this.reportDateFilter || (report.reportDate && report.reportDate)) &&
          (!this.suspectedFraudsterFilter || (report.suspectedFraudster && report.suspectedFraudster)) &&
          (!this.financialLossAmountFilter || (report.financialLossAmount && report.financialLossAmount)) &&
          (!this.actualFraudAmountFilter || (report.actualFraudAmount && report.actualFraudAmount)))
      } else {
        this.fraudKnowledgeManagements = [];
      }
    }
   */

  filteredResults(): void {
    if (this.fraudKnowledgeManagements) {
      this.filteredNameList = this.fraudKnowledgeManagements.filter(report =>
        (!this.reportNumberFilter || report.reportNumber?.toString().toLowerCase().includes(this.reportNumberFilter.toLowerCase())) &&
        (!this.fraudIncidentFilter || report.fraudIncident?.toLowerCase().includes(this.fraudIncidentFilter.toLowerCase())) &&
        (!this.actualIncidentFilter || report.actualIncident?.toLowerCase().includes(this.actualIncidentFilter.toLowerCase())) &&
        (!this.attemptIncidentFilter || report.attemptIncident?.toLowerCase().includes(this.attemptIncidentFilter.toLowerCase())) &&
        (!this.reasonForFailureFilter || report.reasonForFailure?.toLowerCase().includes(this.reasonForFailureFilter.toLowerCase())) &&
        (!this.unitFilter || report.unit?.toLowerCase().includes(this.unitFilter.toLowerCase())) &&
        (!this.incidentDateFilter || report.incidentDate?.format('YYYY-MM-DD').includes(this.incidentDateFilter.toLowerCase())) &&
        (!this.dateOfDetectionFilter || report.dateOfDetection?.format('YYYY-MM-DD').includes(this.dateOfDetectionFilter.toLowerCase())) &&
        (!this.reasonForDelayFilter || report.reasonForDelay?.toLowerCase().includes(this.reasonForDelayFilter.toLowerCase())) &&
        (!this.projectCreationDateFilter || report.projectCreationDate?.format('YYYY-MM-DD').includes(this.projectCreationDateFilter.toLowerCase())) &&
        (!this.reportDateFilter || report.reportDate?.format('YYYY-MM-DD').includes(this.reportDateFilter.toLowerCase())) &&
        (!this.suspectedFraudsterFilter || report.suspectedFraudster?.toLowerCase().includes(this.suspectedFraudsterFilter.toLowerCase())) &&
        (!this.financialLossAmountFilter || report.financialLossAmount?.toString().toLowerCase().includes(this.financialLossAmountFilter.toLowerCase())) &&
        (!this.actualFraudAmountFilter || report.actualFraudAmount?.toString().toLowerCase().includes(this.actualFraudAmountFilter.toLowerCase()))
      );
    } else {
      this.filteredNameList = [];
    }
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.fraudKnowledgeManagements = dataFromBody;
  }

  protected fillComponentAttributesFromResponseBody(data: IFraudKnowledgeManagement[] | null): IFraudKnowledgeManagement[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(page?: number, predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.fraudKnowledgeManagementService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

}
