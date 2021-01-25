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
    return this.http.get<any>(`${API_CONTRACT}?page=${page}&size=${size}`);
  }
}