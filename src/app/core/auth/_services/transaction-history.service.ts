import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_TRANSACTION_HISTORY = `${environment.api_url}/transaction-history`;


@Injectable({
  providedIn: 'root'
})

export class TransactionHistoryService {
  constructor(private http: HttpClient) { }

  list(filter, page, size, sort): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_TRANSACTION_HISTORY}?page=${page}&size=${size}`, httpOptions);
  }
}