// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap } from 'rxjs/operators';
import { Observable, defer, of, forkJoin } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
// CRUD
import { QueryResultsModel, QueryParamsModel } from '../../_base/crud';
// Services
import { AuthService } from '../_services';
// State
import { AppState } from '../../reducers';
import {
    UsersActionToggleLoading,
    UsersPageToggleLoading
} from '../_actions/user.actions';

import {
    EmployeePageRequested, 
    EmployeePageLoaded
} from '../_actions/employee.actions'
import { EmployeeActionTypes } from '../_actions/employee.actions';

@Injectable()
export class EmployeeEffects {
    showPageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: true });
    hidePageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: false });

    showActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: false });


    @Effect()
    loadEmployeesPage$ = this.actions$
        .pipe(
            ofType<any>(EmployeeActionTypes.EmployeePageRequested),
            mergeMap(({ payload }) => {
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.auth.getAllEmployee();
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
                return requestToServer
            }),
            map(response => {
                console.log('response', response);
                // const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                return new EmployeePageLoaded({
                    users: response,
                    totalCount: response.length,
                    page: lastQuery
                });
            }),
        );

    @Effect()
    updateEmployee$ = this.actions$
        .pipe(
            ofType<any>(EmployeeActionTypes.EmployeeUpdated),
            mergeMap(({ payload }) => {
                console.log('payload', payload);
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.updateEmployee(payload.id, payload.user);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );


    @Effect()
    createEmployee$ = this.actions$
        .pipe(
            ofType<any>(EmployeeActionTypes.EmployeeCreated),
            mergeMap((payload) => {
                console.log('payload', payload);
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.createEmployee(payload.payload).pipe(
                    tap(res => {
                        console.log('ress', res);
                        // this.store.dispatch(new UserCreated({ user: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) { }
}
