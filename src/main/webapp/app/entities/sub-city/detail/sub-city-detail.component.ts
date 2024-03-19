import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubCity } from '../sub-city.model';

@Component({
  selector: 'jhi-sub-city-detail',
  templateUrl: './sub-city-detail.component.html',
})
export class SubCityDetailComponent implements OnInit {
  subCity: ISubCity | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subCity }) => {
      this.subCity = subCity;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
