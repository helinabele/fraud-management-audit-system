import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWhistleBlowerReport } from '../whistle-blower-report.model';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA, ITEM_REJECTED_EVENT } from 'app/config/navigation.constants';
import { EntityArrayResponseType, WhistleBlowerReportService } from '../service/whistle-blower-report.service';
import { WhistleBlowerReportDeleteDialogComponent } from '../delete/whistle-blower-report-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';
import { WhistleBlowerReportRejectDialogComponent } from '../reject/whistle-blower-report-reject-dialog.component';
import { ReportStatus } from 'app/entities/enumerations/report-status';

@Component({
  selector: 'jhi-whistle-blower-report',
  templateUrl: './whistle-blower-report.component.html',
  styleUrls: ['../../whistle-blower-report.component.scss']
})
export class WhistleBlowerReportComponent implements OnInit {
  whistleBlowerReports?: IWhistleBlowerReport[];
  whistleBlowerReport?: IWhistleBlowerReport;
  isLoading = false;
  rejectedReports?: IWhistleBlowerReport[] = [];
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
  ReportStatus = ReportStatus;
  
  constructor(
    protected whistleBlowerReportService: WhistleBlowerReportService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
  ) { }

  trackId = (_index: number, item: IWhistleBlowerReport): string => this.whistleBlowerReportService.getWhistleBlowerReportIdentifier(item);

  ngOnInit(): void {
    this.isLoading = true;
    this.load();

       // Retrieve the state with the selected whistleBlowerReport
       const navigation = this.router.getCurrentNavigation();
       const state = navigation?.extras?.state as { whistleBlowerReport: IWhistleBlowerReport };
   
       // Assign the selected report to the new whistleBlowerReport variable
       if (state?.whistleBlowerReport) {
         this.whistleBlowerReport = state.whistleBlowerReport;
       }
  }

  onAssignButtonClick(whistleBlowerReport: IWhistleBlowerReport): void {
   /*  this.whistleBlowerReportService.setSelectedReport(whistleBlowerReport);
    // this.router.navigate(['/whistle-blower-report', whistleBlowerReport.id, 'assign']);
    // Navigate to the 'assign task' page with report data in state
    this.router.navigate(['/whistle-blower-report', whistleBlowerReport.id, 'assign'], {
      state: { whistleBlowerReport }
    }); */
    this.whistleBlowerReportService.setSelectedReport(whistleBlowerReport);
    this.router.navigate(['/whistle-blower-report', whistleBlowerReport.id, 'assign'], {
      state: { whistleBlowerReport }
    });
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
  
  // rejectWhistleBlower(whistleBlowerReport: IWhistleBlowerReport): void {
  //   if (this.whistleBlowerReports) {
  //     const index = this.whistleBlowerReports.findIndex(item => item.id === whistleBlowerReport.id);
  //     if (index !== -1) {
  //       const rejectedReport = this.whistleBlowerReports.splice(index, 1)[0];
  //       this.rejectedReports = this.rejectedReports ?? [];
  //       this.rejectedReports.push(rejectedReport);
  //     }
  //   }
  // }

  // rejectWhistleBlower(whistleBlowerReport: IWhistleBlowerReport): void {
  //   const confirmed = confirm('Are you sure you want to reject this whistleBlowerReport report?');
  //   if (confirmed) {
  //     // Remove the item from the list
  //     if (this.whistleBlowerReports) {
  //       const index = this.whistleBlowerReports.findIndex(item => item.id === whistleBlowerReport.id);
  //       if (index !== -1) {
  //         const rejectedReport = this.whistleBlowerReports.splice(index, 1)[0];
  //         this.rejectedReports = this.rejectedReports ?? [];
  //         this.rejectedReports.push(rejectedReport);
  //       }
  //     }
  //   }
  // }

  rejectWhistleBlower(whistleBlowerReport: IWhistleBlowerReport): void {
    const modalRef = this.modalService.open(WhistleBlowerReportRejectDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.whistleBlowerReport = whistleBlowerReport;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_REJECTED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

 /*  rejectWhistleBlower(id: string): void {
    this.whistleBlowerReportService.rejectReport(id).subscribe(() => {
      const rejectedRep = this.whistleBlowerReports?.find(report => report.id === id);
      if(rejectedRep){
        this.rejectedReports?.push(rejectedRep);
        this.whistleBlowerReports?.filter(report => report.id !== id);
      }
    });
  } */

     // Method to update the report status
  updateReportStatus(reportId: string, newStatus: ReportStatus) {
    this.whistleBlowerReportService.updateStatus(reportId, newStatus).subscribe(
      response => {
        // Handle successful response
        console.log('Report status updated successfully:', response);
      },
      error => {
        // Handle error
        console.error('Error updating report status:', error);
      }
    );
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
