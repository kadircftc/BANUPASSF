import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../admin/login/Services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    claim: string;
}

export const ADMINROUTES: RouteInfo[] = [
  { path: '/user', title: 'Users', icon: 'people', class: '', claim:"GetUsersQuery" },
  { path: '/group', title: 'Groups', icon: 'group_work', class: '', claim:"GetGroupsQuery" },
  { path: '/operationclaim', title: 'OperationClaim', icon: 'security', class: '', claim:"GetOperationClaimsQuery"},
  { path: '/language', title: 'Languages', icon: 'translate', class: '', claim:"GetLanguagesQuery" },
  { path: '/translate', title: 'TranslateWords', icon: 'language', class: '', claim: "GetTranslatesQuery" },
  { path: '/banu-log', title: 'Ana Raporlama İşlemleri', icon: 'assignment', class: '', claim: "GetUsersQuery" },
  { path: '/visit', title: 'Ziyaret Kayıtları', icon: 'event_note', class: '', claim: "GetUsersQuery" }
];

export const USERROUTES: RouteInfo[] = [ 
  { path: '/banu-logs', title: 'Güvenlik Rapor İşlemleri', icon: 'admin_panel_settings', class: '', claim: "GetBanuLogsForSecurityQuery" },
  { path: '/security-transactions', title: 'Güvenlik Ziyaret İşlemleri', icon: 'security', class: '', claim: "GetVisitsMultiVisitsQuery" },
  { path: '/visit-add', title: 'Ziyaret Talebi', icon: 'add_circle', class: '', claim: "VehicleEntranceCommand" }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  adminMenuItems: RouteInfo[] = [];
  userMenuItems: RouteInfo[] = [];
  private claimsSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    public translateService: TranslateService
  ) {}

  async ngOnInit() {
    await this.authService.loadClaims();
    
    this.claimsSubscription = this.authService.claims$.subscribe(() => {
      this.updateMenuItems();
    });

    var lang = localStorage.getItem('lang') || 'tr-TR';
    this.translateService.use(lang);
  }

  private updateMenuItems() {
    this.adminMenuItems = ADMINROUTES.filter(menuItem => 
      menuItem && this.checkClaim(menuItem.claim)
    );
    
    this.userMenuItems = USERROUTES.filter(menuItem => 
      menuItem && this.checkClaim(menuItem.claim)
    );
  }

  isMobileMenu() {
    return $(window).width() <= 991;
  }

  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);  
  }

  ngOnDestroy() {
    if (this.claimsSubscription) {
      this.claimsSubscription.unsubscribe();
    }
    if (!this.authService.loggedIn()) {
      localStorage.removeItem('token')
      this.authService.logOut();
      this.router.navigateByUrl("/login");
    }
  }
}

