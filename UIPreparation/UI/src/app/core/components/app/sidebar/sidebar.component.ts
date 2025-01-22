import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../admin/login/Services/auth.service';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    claim:string;
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
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  adminMenuItems: any[];
  userMenuItems: any[];

  constructor(private router:Router, private authService:AuthService,public translateService:TranslateService) {
    
  }

  ngOnInit() {
  
    this.adminMenuItems = ADMINROUTES.filter(menuItem => menuItem);
    this.userMenuItems = USERROUTES.filter(menuItem => menuItem);

    var lang=localStorage.getItem('lang') || 'tr-TR'
    this.translateService.use(lang);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  checkClaim(claim:string):boolean{
    return this.authService.claimGuard(claim)
  }
  ngOnDestroy() {
    if (!this.authService.loggedIn()) {
      localStorage.removeItem('token')
      this.authService.logOut();
      this.router.navigateByUrl("/login");
    }
  } 
 }

