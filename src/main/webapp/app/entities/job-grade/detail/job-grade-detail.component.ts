import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobGrade } from '../job-grade.model';

@Component({
  selector: 'jhi-job-grade-detail',
  templateUrl: './job-grade-detail.component.html',
})
export class JobGradeDetailComponent implements OnInit {
  jobGrade: IJobGrade | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobGrade }) => {
      this.jobGrade = jobGrade;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
