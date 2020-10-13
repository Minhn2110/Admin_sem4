// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

const API_MENU_BYTOKEN = `${environment.api_url}/management/menus/byToken`


@Injectable()

export class MenuHorizontalService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService, private http: HttpClient) {
		this.loadMenu();
	}

	/**
	 * Load menu list
	 */
	loadMenu() {
		// get menu list
		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'header.items');
		this.menuList$.next(menuItems);
	}

	getMenu(): Observable<any> {
		const userToken = localStorage.getItem('token');
		const httpOptions = {
				headers: new HttpHeaders({
						Authorization: 'Bearer ' + userToken
				})
		};
		return this.http.get<any>(`${API_MENU_BYTOKEN}`, httpOptions);
}
}
