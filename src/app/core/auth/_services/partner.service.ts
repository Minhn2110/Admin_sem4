import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_PARTNER = `${environment.api_url}/partner`;


@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(private http: HttpClient) { }

  createPartner(partner: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      })
    };
    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.post<any>(API_PARTNER, partner, httpOptions);
  }
  updatePartner(partner: any, id): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      })
    };
    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.put<any>(`${API_PARTNER}/${id}`, partner, httpOptions);
  }

  list(): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_PARTNER}`, httpOptions);
  }
  getById(id: Number): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_PARTNER}/${id}`, httpOptions);
  }
}