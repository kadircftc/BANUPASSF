import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { LocalStorageService } from './local-storage.service';

interface TokenVerifyResponse {
  valid: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenMonitorService {
  private lastCheckTime = 0;
  private readonly CHECK_INTERVAL = 2000; // 2 saniye

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private alertifyService: AlertifyService,
    private http: HttpClient
  ) { }

  checkTokenValidity(): void {
    const currentTime = Date.now();
    if (currentTime - this.lastCheckTime < this.CHECK_INTERVAL) {
      return;
    }
    this.lastCheckTime = currentTime;

    const token = this.localStorage.getToken();
    if (!token) {
      return;
    }

    // Önce token'ın yapısal kontrolü
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenData.exp * 1000);
      
      if (expirationDate <= new Date()) {
        this.handleLogout('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
        return;
      }
    } catch (e) {
      this.handleLogout('Geçersiz oturum. Lütfen tekrar giriş yapın.');
      return;
    }

    // Token yapısal olarak geçerliyse, backend kontrolü yap
    this.checkBackendTokenValidity();
  }

  private checkBackendTokenValidity(): void {
    this.http.get<TokenVerifyResponse>(`${environment.getApiUrl}/auth/cx0_d_s91o2_xw24`).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Cache'de kullanıcı bulunamadı veya token geçersiz
          this.handleLogout(error.error?.message || 'Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapın.');
        } else if (error.status === 0) {
          // Backend'e erişilemediğinde sessiz kalabilir veya kullanıcıyı bilgilendirebilirsiniz
          console.warn('Backend bağlantısı kontrol edilemiyor');
        }
        return of(null);
      })
    ).subscribe(response => {
      if (response && !response.valid) {
        this.handleLogout(response.message || 'Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapın.');
      }
    });
  }

  private handleLogout(message: string): void {
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('refreshToken');
    this.alertifyService.warning(message);
    this.router.navigate(['/login']);
  }
} 