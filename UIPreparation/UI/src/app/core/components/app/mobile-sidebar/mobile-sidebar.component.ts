import { Location } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../admin/login/Services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  claim?: string;
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
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent implements OnInit, OnDestroy {
  menuItems: RouteInfo[] = [];
  isOpen: boolean = false;
  location: Location;
  isMobile: boolean = false;
  private previousIsMobile: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    location: Location, 
    private router: Router,
    private authService: AuthService
  ) {
    this.location = location;
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 991;
    
    // Eğer mobile durumu değiştiyse menuItems'ı güncelle
    if (wasMobile !== this.isMobile) {
      this.initializeMenuItems();
      // Mobile'dan desktop'a geçişte sidebar'ı kapat
      if (!this.isMobile) {
        this.isOpen = false;
      }
    }
  }

  ngOnInit(): void {
    this.initializeMenuItems();
    
    // Route değişikliklerini dinle
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isMobile && this.isOpen) {
          this.isOpen = false;
        }
      });
  }

  private initializeMenuItems() {
    if (this.isMobile) {
      this.menuItems = [...ADMINROUTES, ...USERROUTES].filter(menuItem => 
        menuItem && (!menuItem.claim || this.checkClaim(menuItem.claim))
      );
    } else {
      this.menuItems = [];
    }
  }

  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.initializeMenuItems();
    }
  }

  trackByFn(index: number, item: RouteInfo): string {
    return item.path;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 