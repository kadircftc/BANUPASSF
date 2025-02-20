import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../components/admin/login/Services/auth.service";
import { AlertifyService } from "../services/alertify.service";

@Injectable({
  providedIn: 'root'
})
export class ClaimGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedClaim = route.data['claim'] as string;
    
    if (!expectedClaim) {
      return true; // If no claim is specified, allow access
    }

    if (this.authService.claimGuard(expectedClaim)) {
    
      return true;
    }

 
    this.router.navigate(['/dashboard']);       
    return false;
  }
}