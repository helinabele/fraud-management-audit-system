import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobTitle } from '../job-title.model';

@Component({
  selector: 'jhi-job-title-detail',
  templateUrl: './job-title-detail.component.html',
})
export class JobTitleDetailComponent implements OnInit {
  jobTitle: IJobTitle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobTitle }) => {
      this.jobTitle = jobTitle;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
