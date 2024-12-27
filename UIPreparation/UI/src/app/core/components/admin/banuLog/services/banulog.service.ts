import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BanuLog } from '../models/BanuLog';


@Injectable({
  providedIn: 'root'
})
export class BanuLogService {

  constructor(private httpClient: HttpClient) { }


  getBanuLogList(): Observable<BanuLog[]> {

    return this.httpClient.get<BanuLog[]>(environment.getApiUrl + '/BanuLogs/getall')
  }
  getBanuLogGlobalFilterList(filters:any): Observable<BanuLog[]> {

    return this.httpClient.post<BanuLog[]>(environment.getApiUrl + '/BanuLogs/getGlobalFilterList',filters)
  }

  getBanuLogListToPdf(logList: any[]): Observable<Blob> {
    return this.httpClient.post<Blob>(`${environment.getApiUrl}/BanuLogs/getbylisttopdf`, logList, { responseType: 'blob' as 'json' });
  }
  
  getBanuLogById(id: number): Observable<BanuLog> {
    return this.httpClient.get<BanuLog>(environment.getApiUrl + '/BanuLogs/getbyid?id='+id)
  }

  addBanuLog(banuLog: BanuLog): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/BanuLogs/', banuLog, { responseType: 'text' });
  }

  updateBanuLog(banuLog: BanuLog): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/BanuLogs/', banuLog, { responseType: 'text' });

  }

  deleteBanuLog(id: string) {
    return this.httpClient.request('delete', environment.getApiUrl + '/BanuLogs/', { body: { id: id } });
  }


}