import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/components/admin/login/Services/auth.service';
import { TokenMonitorService } from './core/services/token-monitor.service';

declare let browserRefresh: boolean;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  subscription: Subscription;
  isRefresh: boolean;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private tokenMonitor: TokenMonitorService
  ) {
    translate.setDefaultLang("tr-TR");
    translate.use("tr-TR");
    if (!this.authService.loggedIn()) {
      this.authService.logOut();
      this.router.navigateByUrl("/login");
    }

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  @HostListener('mousemove')
  onMouseMove() {
    if (this.authService.loggedIn()) {
      this.tokenMonitor.checkTokenValidity();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
