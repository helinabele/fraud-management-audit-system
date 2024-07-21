import { Component, NgZone, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { WhistleBlowerReportFormService, WhistleBlowerReportFormGroup } from './whistle-blower-report-form.service';
import { IWhistleBlowerReport } from '../whistle-blower-report.model';
import { WhistleBlowerReportService } from '../service/whistle-blower-report.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { Gender } from 'app/entities/enumerations/gender.model';
import { IDivision } from 'app/entities/division/division.model';
import { IDepartment } from 'app/entities/department/department.model';
import { IBranch } from 'app/entities/branch/branch.model';
import { IRegion } from 'app/entities/region/region.model';
import { ICity } from 'app/entities/city/city.model';
import { ISubCity } from 'app/entities/sub-city/sub-city.model';
import { DivisionService } from 'app/entities/division/service/division.service';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { BranchService } from 'app/entities/branch/service/branch.service';
import { RegionService } from 'app/entities/region/service/region.service';
import { CityService } from 'app/entities/city/service/city.service';
import { SubCityService } from 'app/entities/sub-city/service/sub-city.service';

@Component({
  selector: 'jhi-whistle-blower-report-update',
  templateUrl: './whistle-blower-report-update.component.html',
  styleUrls: ['./whistle-blower-report-update.component.scss']
})
export class WhistleBlowerReportUpdateComponent implements OnInit {
  isSaving = false;
  whistleBlowerReport: IWhistleBlowerReport | null = null;
  genderValues = Object.keys(Gender);
  divisionsSharedCollection: IDivision[] = [];
  departmentsSharedCollection: IDepartment[] = [];
  branchesSharedCollection: IBranch[] = [];
  regionsSharedCollection: IRegion[] = [];
  citiesSharedCollection: ICity[] = [];
  subCitiesSharedCollection: ISubCity[] = [];
  // attachments: File[] = [];
  isDisabled = false;

  showDiv = {
    known: false,
    anonymous: false
  };

  editForm: WhistleBlowerReportFormGroup = this.whistleBlowerReportFormService.createWhistleBlowerReportFormGroup();
  isCbeEmployee = false;
  isFraudOccurCheckbox = false;
  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected whistleBlowerReportService: WhistleBlowerReportService,
    protected whistleBlowerReportFormService: WhistleBlowerReportFormService,
    protected activatedRoute: ActivatedRoute,
    protected divisionService: DivisionService,
    protected departmentService: DepartmentService,
    protected branchService: BranchService,
    protected regionService: RegionService,
    protected cityService: CityService,
    protected subCityService: SubCityService,
    private ngZone: NgZone
  ) { }

  compareDivision = (o1: IDivision | null, o2: IDivision | null): boolean => this.divisionService.compareDivision(o1, o2);

  compareDepartment = (o1: IDepartment | null, o2: IDepartment | null): boolean => this.departmentService.compareDepartment(o1, o2);

  compareBranch = (o1: IBranch | null, o2: IBranch | null): boolean => this.branchService.compareBranch(o1, o2);

  compareRegion = (o1: IRegion | null, o2: IRegion | null): boolean => this.regionService.compareRegion(o1, o2);

  compareCity = (o1: ICity | null, o2: ICity | null): boolean => this.cityService.compareCity(o1, o2);

  compareSubCity = (o1: ISubCity | null, o2: ISubCity | null): boolean => this.subCityService.compareSubCity(o1, o2);


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ whistleBlowerReport }) => {
      this.whistleBlowerReport = whistleBlowerReport;
      if (whistleBlowerReport) {
        this.updateForm(whistleBlowerReport);
      }
      this.loadRelationshipsOptions();
    });
  }

  toggleDisabled(): void {
    this.ngZone.runOutsideAngular(() => {
      // Run the code that modifies the 'disabled' property outside of Angular's change detection cycle
      this.isDisabled = !this.isDisabled;
    });
  }
  
  onChangeDivision(): void {
    this.editForm.controls.branch.setValue(null);
    this.getDepartment(this.editForm.controls.division.value?.id);
  }

  onChangeDepartment(): void {
    this.getBranch(this.editForm.controls.department.value?.id);
  }

  onChangeRegion(): void {
    this.editForm.controls.subCity.setValue(null);
    this.getCity(this.editForm.controls.region.value?.id);
  }

  onChangeCity(): void {
    this.getSubCity(this.editForm.controls.city.value?.id);
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  // setFileData(event: Event, index: number): void {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  // if (file) {
  //   this.attachments[index] = file;
  // }
  // }
  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('fraudMgtApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }
  // addAttachment(): void {
  //   const attachment: { file: File | undefined, contentType: string | null } = { file: undefined, contentType: null };
  //   // this.attachments.push(this.editForm.get('attachment'));
  // }

  // removeAttachment(index: number) {
  //   this.attachments.splice(index, 1);
  // }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const whistleBlowerReport = this.whistleBlowerReportFormService.getWhistleBlowerReport(this.editForm);
    if (whistleBlowerReport.id !== null) {
      this.subscribeToSaveResponse(this.whistleBlowerReportService.update(whistleBlowerReport));
    } else {
      this.subscribeToSaveResponse(this.whistleBlowerReportService.create(whistleBlowerReport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWhistleBlowerReport>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(whistleBlowerReport: IWhistleBlowerReport): void {
    this.whistleBlowerReport = whistleBlowerReport;
    this.whistleBlowerReportFormService.resetForm(this.editForm, whistleBlowerReport);
    this.divisionsSharedCollection = this.divisionService.addDivisionToCollectionIfMissing<IDivision>(
      this.divisionsSharedCollection,
      whistleBlowerReport.division
    );
    this.departmentsSharedCollection = this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(
      this.departmentsSharedCollection,
      whistleBlowerReport.department
    );
    this.branchesSharedCollection = this.branchService.addBranchToCollectionIfMissing<IBranch>(
      this.branchesSharedCollection,
      whistleBlowerReport.branch
    );
    this.regionsSharedCollection = this.regionService.addRegionToCollectionIfMissing<IRegion>(
      this.regionsSharedCollection,
      whistleBlowerReport.region
    );
    this.citiesSharedCollection = this.cityService.addCityToCollectionIfMissing<ICity>(
      this.citiesSharedCollection,
      whistleBlowerReport.city
    );
    this.subCitiesSharedCollection = this.subCityService.addSubCityToCollectionIfMissing<ISubCity>(
      this.subCitiesSharedCollection,
      whistleBlowerReport.subCity
    );
  }

  protected loadRelationshipsOptions(): void {
    this.getDivision();
    this.getRegion();
  }

  private getDivision(): void {
    this.divisionService
      .query()
      .pipe(map((res: HttpResponse<IDivision[]>) => res.body ?? []))
      .pipe(
        map((divisions: IDivision[]) =>
          this.divisionService.addDivisionToCollectionIfMissing<IDivision>(divisions, this.whistleBlowerReport?.division)
        )
      )
      .subscribe((divisions: IDivision[]) => (this.divisionsSharedCollection = divisions));
  }

  private getDepartment(divisonId: string | undefined): void {
    this.departmentService
      .query()
      .pipe(map((res: HttpResponse<IDepartment[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartment[]) =>
          this.departmentService.addDepartmentToCollectionIfMissing<IDepartment>(departments.filter(t => t.division?.id === divisonId!), this.whistleBlowerReport?.department)
        )
      )
      .subscribe((departments: IDepartment[]) => (this.departmentsSharedCollection = departments));
  }
  private getBranch(departmentId: string | undefined): void {
    this.branchService
      .query()
      .pipe(map((res: HttpResponse<IBranch[]>) => res.body ?? []))
      .pipe(
        map((branchs: IBranch[]) =>
          this.branchService.addBranchToCollectionIfMissing<IBranch>(
            branchs.filter(t => t.department?.id === departmentId), this.whistleBlowerReport?.branch)
        )
      )
      .subscribe((branchs: IBranch[]) => (this.branchesSharedCollection = branchs))
  }

  private getRegion(): void {
    this.regionService
      .query()
      .pipe(map((res: HttpResponse<IRegion[]>) => res.body ?? []))
      .pipe(
        map((regions: IRegion[]) => this.regionService.addRegionToCollectionIfMissing<IRegion>(regions, this.whistleBlowerReport?.region))
      )
      .subscribe((regions: IRegion[]) => (this.regionsSharedCollection = regions));
  }

  private getCity(regionId: string | undefined): void {
    this.cityService
      .query()
      .pipe(map((res: HttpResponse<ICity[]>) => res.body ?? []))
      .pipe(
        map((cities: ICity[]) => this.cityService.addCityToCollectionIfMissing<ICity>(
          cities.filter(t => t.region?.id === regionId), this.whistleBlowerReport?.city
        ))
      )
      .subscribe((cities: ICity[]) => (this.citiesSharedCollection = cities))
  }

  private getSubCity(cityId: string | undefined): void {
    this.subCityService
      .query()
      .pipe(map((res: HttpResponse<ISubCity[]>) => res.body ?? []))
      .pipe(
        map((subCities: ISubCity[]) => this.subCityService.addSubCityToCollectionIfMissing<ISubCity>(
          subCities.filter(t => t.city?.id === cityId), this.whistleBlowerReport?.subCity
        ))
      )
      .subscribe((subCities: ISubCity[]) => (this.subCitiesSharedCollection = subCities))
  }
}
