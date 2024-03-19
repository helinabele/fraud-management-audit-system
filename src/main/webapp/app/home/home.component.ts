import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import fraudTooltip from 'i18n/en/whistleBlowerReport.json';

import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbTooltipConfig]
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  
  tooltipText: string = fraudTooltip.fraudMgtApp.whistleBlowerReport.fraudTooltip;
    private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, 
    private router: Router,
    private tooltipConfig: NgbTooltipConfig,
    private translateService: TranslateService) {
      this.translateService.setDefaultLang('en');
      tooltipConfig.container = 'body';
    }

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        localStorage.setItem('user', JSON.stringify(account));
      });
  }

  getTooltipText(): string {
    return this.translateService.instant('fraudMgtApp.whistleBlowerReport.fraudTooltip') as string;
  }

  getComplientText(): string {
    return this.translateService.instant('fraudMgtApp.whistleBlowerReport.fraudComplienttip') as string;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
