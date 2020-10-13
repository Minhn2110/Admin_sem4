import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';

const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

const API_LOGIN = `${environment.api_url}/auth/authenticate`;
const API_REGISTER = `${environment.api_url}/auth/register`;
const API_GET_ALL_USER = `${environment.api_url}/management/users`;

const API_MENU = `${environment.api_url}/management/menus`;
const API_ROLE = `${environment.api_url}/management/roles`;



@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }
    // Authentication/Authorization
    login(username: string, password: string): Observable<User> {
        // return this.http.post<User>(API_USERS_URL, { email, password });
        return this.http.post<any>(API_LOGIN, { username, password });
    }

    getUserByToken(): Observable<User> {
        const userToken = localStorage.getItem(environment.authTokenKey);
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Authorization', 'Bearer ' + userToken);
        return this.http.get<User>(API_USERS_URL, { headers: httpHeaders });
    }

    register(user): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<any>(API_REGISTER, user);
    }

    createUser(_user: User): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userToken,
            })
        }; 
        httpOptions.headers =
            httpOptions.headers.set('Content-Type', 'application/json');
        return this.http.post(API_REGISTER, _user, httpOptions);
    }

    getAllUsers(search, pageNumber, pageSize, sortField, sortOrder): Observable<any> {
        const userToken = localStorage.getItem('token');
        console.log('userToken', userToken);
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.get<any>(`${API_GET_ALL_USER}/format?filter=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sortField},${sortOrder}`, httpOptions);
    }

    getAllMenus(): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.get<any>(`${API_MENU}`, httpOptions);
    }
    getMenu(id): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.get<any>(`${API_MENU}/${id}`, httpOptions);
    }
    

    createMenus(_menu: any): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.post<any>(`${API_MENU}`, _menu, httpOptions);
    }

    updateMenus(id, _menu: any): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.put<any>(`${API_MENU}/${id}`, _menu, httpOptions);
    }

    deleteMenu(id: any): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.delete<any>(`${API_MENU}/${id}`, httpOptions);
    }

    getAllRoles(): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.get<any>(API_ROLE, httpOptions);
    }

    createRole(role: any): Observable<Role> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.post<any>(`${API_ROLE}`, role, httpOptions);
    }
    getRoleById(roleId: number): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.get<any>(API_ROLE + `/${roleId}`, httpOptions);
    }

    updateRole(id, role: any): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + userToken
            })
        };
        return this.http.put<any>(`${API_ROLE}/${id}`, role, httpOptions);
    }

    updateUser(id, _user: User): Observable<any> {
        const userToken = localStorage.getItem('token');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userToken,
            })
        };
        httpOptions.headers =
            httpOptions.headers.set('Content-Type', 'application/json');
        return this.http.put(API_GET_ALL_USER + '/' + id, _user, httpOptions);
    }









    public requestPassword(email: string): Observable<any> {
        return this.http.get(API_USERS_URL + '/forgot?=' + email)
            .pipe(catchError(this.handleError('forgot-password', []))
            );
    }



    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(API_USERS_URL + `/${userId}`);
    }


    // DELETE => delete the user from the server
    deleteUser(userId: number) {
        const url = `${API_USERS_URL}/${userId}`;
        return this.http.delete(url);
    }

    // UPDATE => PUT: update the user on the server


    // CREATE =>  POST: add a new user to the server
    // createUser(user: User): Observable<User> {
    //     const httpHeaders = new HttpHeaders();
    //     httpHeaders.set('Content-Type', 'application/json');
    //     return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders });
    // }

    // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
    // items => filtered/sorted result
    findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, { headers: httpHeaders });
    }

    // Permission
    getAllPermissions(): Observable<Permission[]> {
        return this.http.get<Permission[]>(API_PERMISSION_URL);
    }

    getRolePermissions(roleId: number): Observable<Permission[]> {
        return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
    }

    // Roles
 

  

    // CREATE =>  POST: add a new role to the server


    // UPDATE => PUT: update the role on the server


    // DELETE => delete the role from the server
    deleteRole(roleId: number): Observable<Role> {
        const url = `${API_ROLES_URL}/${roleId}`;
        return this.http.delete<Role>(url);
    }

    // Check Role Before deletion
    isRoleAssignedToUsers(roleId: number): Observable<boolean> {
        return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
    }

    findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        // This code imitates server calls
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders });
    }

    /*
     * Handle Http operation that failed.
     * Let the app continue.
   *
   * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
}
