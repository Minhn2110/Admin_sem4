import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_EMPLOYEE = `${environment.api_url}/management/employees`;

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) { }

  createEmployee(employee: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
        })
    };
    httpOptions.headers =
        httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.post<any>(API_EMPLOYEE, employee, httpOptions);
}

  updateEmployee(id, employee: any): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      })
    };
    httpOptions.headers =
      httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.put(API_EMPLOYEE + '/' + id, employee, httpOptions);
  }

  deleteEmployee(id): Observable<any> {
    const userToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      })
    };
    httpOptions.headers =
      httpOptions.headers.set('Content-Type', 'application/json');
    return this.http.delete(API_EMPLOYEE + '/' + id, httpOptions);
  }


  getAllEmployee(search, pageNumber, pageSize, sortField, sortOrder): Observable<any> {
    console.log(pageSize);
    const userToken = localStorage.getItem('token');
    console.log('userToken', userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + userToken
      })
    };
    return this.http.get<any>(`${API_EMPLOYEE}/format?filter=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sortField},${sortOrder}`, httpOptions);
  }
}

// http://localhost:8080/api/v1/management/employees/format?filter=employee01&&pageNumber=0&&pageSize=2&&sort=phone,asc&&sort=birthday,desc