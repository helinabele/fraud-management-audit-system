import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WhistleBlowerReportService } from "app/entities/whistle-blower-report/service/whistle-blower-report.service";
import { IWhistleBlowerReport } from "app/entities/whistle-blower-report/whistle-blower-report.model";

@Component({
    selector: 'jhi-whistle-blower-report',
    standalone: true,
    templateUrl: './whistle-blower-quarterly-report.component.html',
    styleUrls: ['../../whistle-blower-report.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class WhistleBlowerQuarterlyReportComponent implements OnInit {
    whistleBlowerReport?: IWhistleBlowerReport[];
    isLoading = false;
    nameFilter = '';
    genderFilter = '';
    emailFilter = '';
    phoneFilter = '';
    organizationFilter = '';

    filteredNameList: any[] = [];

    constructor(
        private whistleBlowerReportService: WhistleBlowerReportService
        ) { }

    ngOnInit(): void {
        this.whistleBlowerReportService
            .getwhistleBlowerReports()
            .subscribe(data => {
                this.whistleBlowerReport = data;
                this.filterResults();
            })
    }

    load(): void {
        this.ngOnInit();
    }

    filterResults(): void {
        this.filteredNameList = this.whistleBlowerReport?.filter(report =>
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
}