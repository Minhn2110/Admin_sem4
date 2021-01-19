import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_PRODUCT_CATEGORY = `${environment.api_url}/product_category`;
const API_PRODUCT = `${environment.api_url}/product`;


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_PRODUCT}`, httpOptions);
  }

  createProduct(product: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken, 
      }) 
    }; 
    // httpOptions.headers = httpOptions.headers.set('Content-Type', 'multipart/form-data'); 
    return this.http.post<any>(API_PRODUCT, product, httpOptions); 
  }
  getProduct(code): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_PRODUCT}/${code}`, httpOptions);
  }
  editProduct(id, product: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.put<any>(`${API_PRODUCT}/id/${id}`, product, httpOptions);
  }
}