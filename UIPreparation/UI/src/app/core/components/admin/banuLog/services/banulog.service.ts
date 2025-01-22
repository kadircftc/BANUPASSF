import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrivPagingResult } from 'app/core/models/privPaging';
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
  
  getBanuLogGlobalFilterList(filters:any,page:number,pageSize:number): Observable<PrivPagingResult<BanuLog>> {

    return this.httpClient.post<PrivPagingResult<BanuLog>>(environment.getApiUrl + `/BanuLogs/getGlobalFilterList?page=${page}&pageSize=${pageSize}`,filters)
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