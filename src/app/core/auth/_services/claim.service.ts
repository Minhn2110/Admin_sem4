import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API_ClaimConfig = `${environment.api_url}/configs/claim`;
const API_Claim = `${environment.api_url}/claims`;



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
  getClaimList(filter, page, size, sort): Observable<any> {
    return this.http.get<any>(`${API_Claim}?page=${page}&size=${size}`);
  }  
  getClaimInfo(code): Observable<any> {
    return this.http.get<any>(`${API_Claim}/${code}`);
  }
  changeStatisClaimInfo(body: any, id): Observable<any> {
    return this.http.post<any>(`${API_Claim}/status/${id}`, body); 
  }
  
  update(id, body: any): Observable<any> {
    return this.http.put<any>(`${API_ClaimConfig}/${id}`, body); 
  }
  
  
}