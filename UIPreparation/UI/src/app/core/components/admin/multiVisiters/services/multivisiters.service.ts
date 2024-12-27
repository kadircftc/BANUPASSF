import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { MultiVisiters } from '../models/MultiVisiters';


@Injectable({
  providedIn: 'root'
})
export class MultiVisitersService {

  constructor(private httpClient: HttpClient) { }


  getMultiVisitersList(): Observable<MultiVisiters[]> {

    return this.httpClient.get<MultiVisiters[]>(environment.getApiUrl + '/multiVisiterses/getall')
  }

  getMultiVisitersById(id: number): Observable<MultiVisiters> {
    return this.httpClient.get<MultiVisiters>(environment.getApiUrl + '/multiVisiterses/getbyid?id='+id)
  }

  addMultiVisiters(multiVisiters: MultiVisiters): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/multiVisiterses/', multiVisiters, { responseType: 'text' });
  }

  updateMultiVisiters(multiVisiters: MultiVisiters): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/multiVisiterses/', multiVisiters, { responseType: 'text' });

  }

  deleteMultiVisiters(id: string) {
    return this.httpClient.request('delete', environment.getApiUrl + '/multiVisiterses/', { body: { id: id } });
  }


}