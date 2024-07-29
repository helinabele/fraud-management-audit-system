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

  images = [
    {
      src: '/content/images/cbe-hq-inside1.jpg',
      alt: 'Fraud Prevention - Inside 1',
      header: 'Report Fraud and Protect Your Business',
      body: 'Our secure and reliable platform allows you to report fraud and protect your business from financial losses and reputational damage.'
    },
    {
      src: '/content/images/cbe-hq-inside2.jpg',
      alt: 'Fraud Prevention - Inside 2',
      header: 'Report Fraud and Protect Your Business',
      body: 'Our secure and reliable platform allows you to report fraud and protect your business from financial losses and reputational damage.'
    },
    {
      src: '/content/images/cbe-hq.jpg',
      alt: 'Fraud Prevention - HQ',
      header: 'Report Fraud and Protect Your Business',
      body: 'Our secure and reliable platform allows you to report fraud and protect your business from financial losses and reputational damage.'
    }
  ];
  
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
