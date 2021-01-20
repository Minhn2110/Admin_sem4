import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API_ClaimConfig = `${environment.api_url}/configs/claim`;


@Injectable({
  providedIn: 'root'
})

export class ClaimService {
  constructor(private http: HttpClient) { }


  create(body: any): Observable<any> {
    return this.http.post<any>(API_ClaimConfig, body); 
  }

  // list(): Observable<any> {
  //   return this.http.get<any>(`${API_CAR}`);
  // }

  get(id): Observable<any> {
    return this.http.get<any>(`${API_ClaimConfig}/${id}`);
  }
  update(id, body: any): Observable<any> {
    return this.http.put<any>(`${API_ClaimConfig}/${id}`, body); 
  }
  
  
}