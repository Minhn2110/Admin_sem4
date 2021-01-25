import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_CUSTOMER = `${environment.api_url}/customer`;


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  list(filter, page, size, sort): Observable<any> {
    return this.http.get<any>(`${API_CUSTOMER}?page=${page}&size=${size}`);
  }
}