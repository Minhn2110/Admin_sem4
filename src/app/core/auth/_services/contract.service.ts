import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API_CONTRACT = `${environment.api_url}/contract`;


@Injectable({
  providedIn: 'root'
})

export class ContractService {
  constructor(private http: HttpClient) { }

  list(filter, page, size, sort): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken 
      })
    };
    return this.http.get<any>(`${API_CONTRACT}?page=${page}&size=${size}`, httpOptions);
  }
}