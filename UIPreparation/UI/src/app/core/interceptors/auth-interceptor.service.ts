import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenService } from '../components/admin/login/Services/token.service';
import { AlertifyService } from '../services/alertify.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private localStorage: LocalStorageService,
    private alertifyService: AlertifyService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addToken(req);

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return this.handle401Error(req, next);
          } else if (error.status === 403) {
            // Yetkisiz erişim
            this.handleLogout('Yetkisiz erişim. Lütfen tekrar giriş yapın.');
            return throwError(error);
          } else if (error.status === 0) {
            // Backend'e erişilemediğinde
            this.handleLogout('Sunucuya erişilemiyor. Lütfen daha sonra tekrar deneyin.');
            return throwError(error);
          }
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.localStorage.getToken();
    if (token) {
      // Token'ın geçerliliğini kontrol et (örn: JWT decode edip exp kontrolü)
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(tokenData.exp * 1000);
        
        if (expirationDate <= new Date()) {
          this.handleLogout('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
          return request;
        }
      } catch (e) {
        this.handleLogout('Geçersiz oturum. Lütfen tekrar giriş yapın.');
        return request;
      }

      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          if (token && token.success) {
            this.refreshTokenSubject.next(token.data.token);
            return next.handle(this.addToken(req));
          } else {
            this.handleLogout('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
            return throwError('Token yenileme başarısız');
          }
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.handleLogout('Oturum yenilenemedi. Lütfen tekrar giriş yapın.');
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(req));
        })
      );
    }
  }

  private handleLogout(message: string): void {
    // Sadece token ile ilgili verileri temizle
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('refreshToken');
    this.alertifyService.warning(message);
    this.router.navigate(['/login']);
  }
}
