// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AppState} from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    constructor(private store: Store<AppState>, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
        this.currentUser = this.currentUserSubject.asObservable();
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const currentUser = this.currentUserValue;
            if (currentUser) {
                // logged in so return true
                return true;
            }
    
            // not logged in so redirect to login page with the return url
            this.router.navigateByUrl('/auth/login');
            return false;
    }
}
