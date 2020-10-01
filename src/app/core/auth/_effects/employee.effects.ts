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
import { EmployeeService } from '../_services';
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
                console.log('payload', payload);
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.service.getAllEmployee(payload.page.filter.username, payload.page.pageNumber, payload.page.pageSize, payload.page.sortField, payload.page.sortOrder);
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
                return requestToServer
            }),
            map(response => {
                console.log('response', response);
                // const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                return new EmployeePageLoaded({
                    users: response[0].data,
                    totalCount: response[0].totalItems,
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
                return this.service.updateEmployee(payload.id, payload.user);
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
                return this.service.createEmployee(payload.payload).pipe(
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

    @Effect()
    deleteUser$ = this.actions$
        .pipe(
            ofType<any>(EmployeeActionTypes.EmployeeDeleted),
            mergeMap(({ payload }) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.service.deleteEmployee(payload.id);
            }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private service: EmployeeService, private store: Store<AppState>) { }
}
