import { Component, OnInit } from '@angular/core';
import { WhistleBlowerReportService } from '../service/whistle-blower-report.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWhistleBlowerReport } from '../whistle-blower-report.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA, ITEM_REJECTED_EVENT } from 'app/config/navigation.constants';
import { EntityArrayResponseType } from '../service/whistle-blower-report.service';
import { DataUtils } from 'app/core/util/data-util.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-rejected-report',
  templateUrl: './rejected-report.component.html',
  // styleUrls: ['./rejected-report.component.css']
})
export class RejectedReportComponent implements OnInit {
  whistleBlowerReports?: IWhistleBlowerReport[];
  isLoading = false;
  predicate = 'id';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  isAssigned = false;
  searchQuery = '';

  filteredNameList: IWhistleBlowerReport[] = [];

  nameFilter = '';
  genderFilter = '';
  emailFilter = '';
  phoneFilter = '';
  organizationFilter = '';
 

  constructor(
    protected whistleBlowerReportService: WhistleBlowerReportService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
  ) { }
  trackId = (_index: number, item: IWhistleBlowerReport): string => this.whistleBlowerReportService.getWhistleBlowerReportIdentifier(item);


  ngOnInit(): void {
    this.loadRejectedReports();
  }

  loadRejectedReports(): void {
    this.whistleBlowerReportService.getRejectedReports().subscribe(
      (res: HttpResponse<IWhistleBlowerReport[]>) => {
        this.whistleBlowerReports = res.body || []; // Handle the response body
      },
      error => {
        console.error('Error loading rejected reports', error);
        // Handle error appropriately (e.g., show a message to the user)
      }
    );
  }
  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
        this.filterResults();
      },
    });
  }
  
  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending);
  }

  filterResults(): void {
    this.filteredNameList = this.whistleBlowerReports?.filter(report =>
      (!this.nameFilter || (report.fullName?.toLowerCase().includes(this.nameFilter.toLowerCase()))) &&
      (!this.genderFilter || (report.genderType?.toLowerCase().includes(this.genderFilter.toLowerCase()))) &&
      (!this.emailFilter || (report.emailAdress?.toLowerCase().includes(this.emailFilter.toLowerCase()))) &&
      (!this.phoneFilter || (report.phone?.toString().includes(this.phoneFilter.toLowerCase()))) &&
      (!this.organizationFilter || (report.organization?.toLowerCase().includes(this.organizationFilter.toLowerCase())))
    ) ?? [];
  }

  cancelSearch(): void {
    this.nameFilter = '';
    this.genderFilter = '';
    this.emailFilter = '';
    this.phoneFilter = '';
    this.organizationFilter = '';
    this.filterResults();
  }

  back(): void{
    window.history.back();
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
    this.whistleBlowerReports = dataFromBody;
  }

  protected fillComponentAttributesFromResponseBody(data: IWhistleBlowerReport[] | null): IWhistleBlowerReport[] {
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
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.whistleBlowerReportService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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
