import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apiUrl = 'http://banu-pass-api:5000/api/v1/Languages/codes';

  constructor(private http: HttpClient) { }

  getLanguageCodes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
} 