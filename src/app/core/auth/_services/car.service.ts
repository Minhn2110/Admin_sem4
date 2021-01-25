import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


const API_CAR = `${environment.api_url}/car-brand`;
const API_CAR_CONFIG = `${environment.api_url}/configs/car`;



@Injectable({
  providedIn: 'root'
})

export class CarService {
  constructor(private http: HttpClient) { }

  createCarBrand(body: any): Observable<any> {
    return this.http.post<any>(API_CAR, body); 
  }

  list(): Observable<any> {
    return this.http.get<any>(`${API_CAR}`);
  }

  get(code): Observable<any> {
    return this.http.get<any>(`${API_CAR}/${code}`);
  }
  update(code, body: any): Observable<any> {
    return this.http.put<any>(`${API_CAR}/${code}`, body); 
  }
  getCarConfig(): Observable<any> {
    return this.http.get<any>(`${API_CAR_CONFIG}/1`);
  } 
  updateCarConfig(body: any): Observable<any> {
    return this.http.put<any>(`${API_CAR_CONFIG}/1`, body); 
  }
}