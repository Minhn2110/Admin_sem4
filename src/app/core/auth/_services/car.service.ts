import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API_CAR = `${environment.api_url}/car-brand`;


@Injectable({
  providedIn: 'root'
})

export class CarService {
  constructor(private http: HttpClient) { }

  createCarBrand(body: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken, 
      }) 
    }; 
    return this.http.post<any>(API_CAR, body, httpOptions); 
  }

  list(): Observable<any> {
    return this.http.get<any>(`${API_CAR}`);
  }

  get(code): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_CAR}/${code}`, httpOptions);
  }
  update(code, body: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken, 
      }) 
    }; 
    return this.http.put<any>(`${API_CAR}/${code}`, body, httpOptions); 
  }
  
  
}