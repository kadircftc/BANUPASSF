import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../admin/login/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  claim?: string;
}

export const ADMINROUTES: RouteInfo[] = [
  { path: '/user', title: 'Users', icon: 'how_to_reg', class: '', claim:"GetUsersQuery" },
  { path: '/group', title: 'Groups', icon:'groups', class: '',claim:"GetGroupsQuery" },
  { path: '/operationclaim', title: 'OperationClaim', icon:'local_police', class: '', claim:"GetOperationClaimsQuery"},
  { path: '/language', title: 'Languages', icon:'language', class: '', claim:"GetLanguagesQuery" },
  { path: '/translate', title: 'TranslateWords', icon: 'translate', class: '', claim: "GetTranslatesQuery" },
  { path: '/log', title: 'Logs', icon: 'update', class: '', claim: "GetLogDtoQuery" },
  { path: '/banu-log', title: 'Ziyaret İşlem Kayıtları', icon: 'update', class: '', claim: "GetUsersQuery" },
  { path: '/visit', title: 'Ziyaret İşlem Kayıtları', icon: 'update', class: '', claim: "GetUsersQuery" }
];

export const USERROUTES: RouteInfo[] = [ 
  { path: '/banu-logs', title: 'Admin Kullanıcı', icon: 'update', class: '', claim: "GetUsersQuery" },
  { path: '/security-transactions', title: 'Admin Kullanıcı', icon: 'update', class: '', claim: "GetUsersQuery" }
];

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss']
})
export class MobileSidebarComponent implements OnInit {
  menuItems: any[] = [];
  isOpen: boolean = false;
  location: Location;

  constructor(
    location: Location, 
    private router: Router,
    private authService: AuthService
  ) {
    this.location = location;
  }

  ngOnInit(): void {
    this.menuItems = [...ADMINROUTES, ...USERROUTES].filter(menuItem => 
      menuItem && (!menuItem.claim || this.checkClaim(menuItem.claim))
    );
  }

  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  }

  getTitle(): string {
    if (!this.menuItems) return 'Dashboard';
    
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    
    const matchingItem = this.menuItems.find(item => item.path === title);
    return matchingItem ? matchingItem.title : 'Dashboard';
  }
} 