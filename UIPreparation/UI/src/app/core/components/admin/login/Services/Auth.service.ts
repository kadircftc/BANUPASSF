import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from 'app/core/services/alertify.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SharedService } from 'app/core/services/shared.service';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LoginUser } from '../model/login-user';
import { TokenModel } from '../model/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private claimsSubject = new BehaviorSubject<string[]>([]);
  claims$ = this.claimsSubject.asObservable();
  
  userName: string;
  isLoggin: boolean;
  decodedToken: any;
  userToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  private claimsLoaded = false;

  constructor(
    private httpClient: HttpClient,
    private storageService: LocalStorageService,
    private router: Router,
    private alertifyService: AlertifyService,
    private sharedService: SharedService
  ) {
    this.initializeAuth();
  }

  private async initializeAuth() {
    if (this.storageService.getToken() && this.loggedIn()) {
      this.setUserInfoFromToken();
      await this.loadClaims();
      this.sharedService.sendChangeUserNameEvent();
    }
  }

  private setUserInfoFromToken() {
    const token = this.storageService.getToken();
    if (token) {
      const decode = this.jwtHelper.decodeToken(token);
      const propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
      this.userName = decode[propUserName];
    }
  }

  async loadClaims(): Promise<void> {
    if (!this.claimsLoaded && this.storageService.getToken() && this.loggedIn()) {
      try {
        const claims = await this.httpClient.get<string[]>(environment.getApiUrl + "/operation-claims/cache").toPromise();
        this.claimsSubject.next(claims);
        this.claimsLoaded = true;
      } catch (error) {
        console.error('Claims yüklenirken hata:', error);
        this.claimsSubject.next([]);
      }
    }
  }

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");

    this.httpClient.post<TokenModel>(environment.getApiUrl + "/Auth/login", loginUser, { headers: headers })
      .subscribe(async data => {
        if (data.success) {
          this.storageService.setToken(data.data.token);
          this.storageService.setItem("refreshToken", data.data.refreshToken);
          this.claimsSubject.next(data.data.claims);
          this.claimsLoaded = true;

          this.setUserInfoFromToken();
          this.sharedService.sendChangeUserNameEvent();

          this.router.navigateByUrl("/dashboard");
          this.alertifyService.success(data.message);
        } else {
          this.alertifyService.warning("Kullanıcı adı veya şifre hatalı");
        }
       
      },error=>{
        this.alertifyService.error("Kullanıcı adı veya şifre hatalı");
      });
  }

  logOut() {
    this.storageService.removeToken();
    this.storageService.removeItem("lang");
    this.storageService.removeItem("refreshToken");
    this.claimsSubject.next([]);
    this.claimsLoaded = false;
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(this.storageService.getToken(), -120);
  }

  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.storageService.getToken()).userId;
  }

  claimGuard(claim: string): boolean {
     //this.loadClaims();
    if (!this.loggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    }

    const currentClaims = this.claimsSubject.getValue();
    return currentClaims.includes(claim);
  }

  getUserName(): string {
    return this.userName;
  }
}
