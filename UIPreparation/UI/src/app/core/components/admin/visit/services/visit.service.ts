import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Visit } from '../models/Visit';
import { MergeMultiVisit } from '../models/mergeMultiVisit';


@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private httpClient: HttpClient) { }


  getVisitList(): Observable<Visit[]> {

    return this.httpClient.get<Visit[]>(environment.getApiUrl + '/Visits/getall')
  }
  getVisitMergeMultiVisitList(date:string): Observable<MergeMultiVisit[]> {

    return this.httpClient.get<MergeMultiVisit[]>(environment.getApiUrl + '/Visits/GetVisitsWithMultiVisits'+'?date='+date)
  }
  getVisitById(id: number): Observable<Visit> {
    return this.httpClient.get<Visit>(environment.getApiUrl + '/Visits/getbyid?id='+id)
  }

  addVisit(visit: Visit): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/Visits/', visit, { responseType: 'text' });
  }

  updateVisit(visit: Visit): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/Visits/', visit, { responseType: 'text' });

  }

  deleteVisit(id: string) {
    return this.httpClient.request('delete', environment.getApiUrl + '/Visits/', { body: { id: id } });
  }

  rejectVisit(id: string, reasonForRejection: string) {
    const apiUrl = `${environment.getApiUrl}/Visits/rejectvisit`;
    const body = { id, reasonForRejection };
  
    return this.httpClient.put(apiUrl, body, { responseType: 'text' });
  }
  confirmVisit(id: string) {
    return this.httpClient.put(`${environment.getApiUrl}/VisitConfirms/confirmVisit?visitId=` + id, {}, { responseType: 'text' });
}


}