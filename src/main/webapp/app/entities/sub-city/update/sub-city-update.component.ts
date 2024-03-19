import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { SubCityFormService, SubCityFormGroup } from './sub-city-form.service';
import { ISubCity } from '../sub-city.model';
import { SubCityService } from '../service/sub-city.service';
import { ICity } from 'app/entities/city/city.model';
import { CityService } from 'app/entities/city/service/city.service';

@Component({
  selector: 'jhi-sub-city-update',
  templateUrl: './sub-city-update.component.html',
})
export class SubCityUpdateComponent implements OnInit {
  isSaving = false;
  subCity: ISubCity | null = null;

  citiesSharedCollection: ICity[] = [];

  editForm: SubCityFormGroup = this.subCityFormService.createSubCityFormGroup();

  constructor(
    protected subCityService: SubCityService,
    protected subCityFormService: SubCityFormService,
    protected cityService: CityService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCity = (o1: ICity | null, o2: ICity | null): boolean => this.cityService.compareCity(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subCity }) => {
      this.subCity = subCity;
      if (subCity) {
        this.updateForm(subCity);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subCity = this.subCityFormService.getSubCity(this.editForm);
    if (subCity.id !== null) {
      this.subscribeToSaveResponse(this.subCityService.update(subCity));
    } else {
      this.subscribeToSaveResponse(this.subCityService.create(subCity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubCity>>): void {
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

  protected updateForm(subCity: ISubCity): void {
    this.subCity = subCity;
    this.subCityFormService.resetForm(this.editForm, subCity);

    this.citiesSharedCollection = this.cityService.addCityToCollectionIfMissing<ICity>(this.citiesSharedCollection, subCity.city);
  }

  protected loadRelationshipsOptions(): void {
    this.cityService
      .query()
      .pipe(map((res: HttpResponse<ICity[]>) => res.body ?? []))
      .pipe(map((cities: ICity[]) => this.cityService.addCityToCollectionIfMissing<ICity>(cities, this.subCity?.city)))
      .subscribe((cities: ICity[]) => (this.citiesSharedCollection = cities));
  }
}
