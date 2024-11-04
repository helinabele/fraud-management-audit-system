import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbTooltipConfig } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Account } from "app/core/auth/account.model";
import { AccountService } from "app/core/auth/account.service";

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [NgbTooltipConfig]
  })
  export class DashboardComponent implements OnInit{
    account: Account | null = null;

    constructor(private accountService: AccountService,
        private router: Router,
        private tooltipConfig: NgbTooltipConfig,
        private translateService: TranslateService) {
        this.translateService.setDefaultLang('en');
        tooltipConfig.container = 'body';
      }
    
      ngOnInit(): void {
       /*  this.accountService.identity().subscribe(() => {
          if (this.accountService.isAuthenticated()) {
            this.router.navigate(['']);
          }
        }); */
      }
    }