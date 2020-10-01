
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_DEPARTMENT = `${environment.api_url}/management/departments`;

@Injectable()
export class DepartmentService {

  constructor(private http: HttpClient) { }

  createDepartment(department: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      })
    };
    httpOptions.headers =
      httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.post<any>(API_DEPARTMENT, department, httpOptions);
  }

  updateDepartment(id, employee: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      })
    };
    httpOptions.headers =
      httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.put(API_DEPARTMENT + '/' + id, employee, httpOptions);
  }

  deleteDepartment(id): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      })
    };
    httpOptions.headers =
      httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.delete(API_DEPARTMENT + '/' + id, httpOptions);
  }


  getAllDepartment(search, pageNumber, pageSize, sortField, sortOrder): Observable<any> {
    console.log(pageSize);
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_DEPARTMENT}/format?filter=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sortField},${sortOrder}`, httpOptions);
  }

  getAllDepartments(): Observable<any> {
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_DEPARTMENT}`, httpOptions);
  }



}