import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrivPagingResult } from 'app/core/models/privPaging';
import { Filter } from 'app/core/search-settings/global-filter';
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

  getBanuLogByPagingList(page:number,pageSize:number): Observable<PrivPagingResult<BanuLog>> {

    return this.httpClient.get<PrivPagingResult<BanuLog>>(environment.getApiUrl + '/BanuLogs/getbypaging?page='+page+'&pageSize='+pageSize)
  }
  getBanuLogByPagingListSecurity(page:number,pageSize:number): Observable<PrivPagingResult<BanuLog>> {

    return this.httpClient.get<PrivPagingResult<BanuLog>>(environment.getApiUrl + '/BanuLogs/getbypagingsecurity?page='+page+'&pageSize='+pageSize)
  }
  getBanuLogGlobalFilterList(filters:any,page:number,pageSize:number): Observable<PrivPagingResult<BanuLog>> {

    return this.httpClient.post<PrivPagingResult<BanuLog>>(environment.getApiUrl + `/BanuLogs/getGlobalFilterList?page=${page}&pageSize=${pageSize}`,filters)
  }
  getBanuLogGlobalFilterListSecurity(filters:any,page:number,pageSize:number): Observable<PrivPagingResult<BanuLog>> {

    return this.httpClient.post<PrivPagingResult<BanuLog>>(environment.getApiUrl + `/BanuLogs/getGlobalFilterListSecurity?page=${page}&pageSize=${pageSize}`,filters)
  }
  getBanuLogListToPdf(logList: any[]): Observable<Blob> {
    return this.httpClient.post<Blob>(`${environment.getApiUrl}/BanuLogs/getbylisttopdf`, logList, { responseType: 'blob' as 'json' });
  }
  getBanuLogFilterListToPdf(filters: Filter[]): Observable<HttpResponse<Blob>> {
    return this.httpClient.post<Blob>(
      `${environment.getApiUrl}/BanuLogs/getbyglobalpdf`, 
      filters, 
      {
        responseType: 'blob' as 'json', // Yanıtı blob olarak al
        observe: 'response' // Yanıt başlıklarını da al
      }
    );
  }
  getBanuLogFilterListToPdfSecurity(filters: Filter[]): Observable<HttpResponse<Blob>> {
    return this.httpClient.post<Blob>(
      `${environment.getApiUrl}/BanuLogs/getbyglobalpdfforSecurity`, 
      filters, 
      {
        responseType: 'blob' as 'json', // Yanıtı blob olarak al
        observe: 'response' // Yanıt başlıklarını da al
      }
    );
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