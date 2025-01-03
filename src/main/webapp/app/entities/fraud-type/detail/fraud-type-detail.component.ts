import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFraudType } from '../fraud-type.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-fraud-type-detail',
  templateUrl: './fraud-type-detail.component.html',
})
export class FraudTypeDetailComponent implements OnInit {
  fraudType: IFraudType | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraudType }) => {
      this.fraudType = fraudType;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
