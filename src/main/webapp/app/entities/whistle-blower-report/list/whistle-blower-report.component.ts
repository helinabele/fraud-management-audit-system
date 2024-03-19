import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWhistleBlowerReport } from '../whistle-blower-report.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, WhistleBlowerReportService } from '../service/whistle-blower-report.service';
import { WhistleBlowerReportDeleteDialogComponent } from '../delete/whistle-blower-report-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-whistle-blower-report',
  templateUrl: './whistle-blower-report.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss']
})
export class WhistleBlowerReportComponent implements OnInit {
  whistleBlowerReports?: IWhistleBlowerReport[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;
  selectedReport?: IWhistleBlowerReport;

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
    protected modalService: NgbModal
  ) { }

  trackId = (_index: number, item: IWhistleBlowerReport): string => this.whistleBlowerReportService.getWhistleBlowerReportIdentifier(item);

  ngOnInit(): void {
    this.isLoading = true;
    this.load();
  }

  onAssignButtonClick(whistleBlowerReport: IWhistleBlowerReport): void {
    this.whistleBlowerReportService.setSelectedReport(whistleBlowerReport);
    this.router.navigate(['/whistle-blower-report', whistleBlowerReport.id, 'assign']);

    // this.whistleBlowerReportService.assignReport(whistleBlowerReport.id).subscribe(
    //   () => {
    //     this.isAssigned = true;
    //     // Any additional logic or notifications after successful assignment can be handled here
    //   },
    //   (error: any) => {
    //     console.error('Error assigning report:', error);
    //     // Handle error if the assignment fails
    //   }
    // );
  }
  
  rejectWhistleBlower(){
    console.log('Whistle blower rejected');
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(whistleBlowerReport: IWhistleBlowerReport): void {
    const modalRef = this.modalService.open(WhistleBlowerReportDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.whistleBlowerReport = whistleBlowerReport;
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
        this.filterResults();
      },
    });
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

  // filterResults(): void {
  //   if (!this.searchQuery) {
  //     this.filteredNameList = this.whistleBlowerReports || []; // No search query, show all reports
  //   } else {
  //     this.filteredNameList = this.whistleBlowerReports?.filter(report =>
  //       (report.fullName && report.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
  //       (report.genderType && report.genderType.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
  //       (report.emailAdress && report.emailAdress.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
  //       (report.phone && report.phone.toString().includes(this.searchQuery.toLowerCase())) ||
  //       (report.organization && report.organization.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
  //       (report.message && report.message.toLowerCase().includes(this.searchQuery.toLowerCase()))
  //       // Include additional properties here
  //     ) || [];
  //   }
  // }
  
}
