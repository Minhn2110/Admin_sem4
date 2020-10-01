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
import { DepartmentService } from '../_services';
// State
import { AppState } from '../../reducers';
import {
    UsersActionToggleLoading,
    UsersPageToggleLoading
} from '../_actions/user.actions';

import { DepartmentActionTypes, DepartmentPageRequested, DepartmentPageLoaded } from '../_actions/department.actions';

@Injectable()
export class DepartmentEffects {
    showPageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: true });
    hidePageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: false });

    showActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: false });


    @Effect()
    loadDepartmentsPage$ = this.actions$
        .pipe(
            ofType<any>(DepartmentActionTypes.DepartmentPageRequested),
            mergeMap(({ payload }) => {
                console.log('payload', payload);
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.service.getAllDepartment(payload.page.filter.username, payload.page.pageNumber, payload.page.pageSize, payload.page.sortField, payload.page.sortOrder);
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
                return requestToServer
            }),
            map(response => {
                console.log('response', response);
                // const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                return new DepartmentPageLoaded({
                    users: response[0].data,
                    totalCount: response[0].totalItems,
                    page: lastQuery
                });
            }),
        );

    @Effect()
    updateDepartment$ = this.actions$
        .pipe(
            ofType<any>(DepartmentActionTypes.DepartmentUpdated),
            mergeMap(({ payload }) => {
                console.log('payload', payload);
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.service.updateDepartment(payload.id, payload.user);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );


    @Effect()
    createDepartment$ = this.actions$
        .pipe(
            ofType<any>(DepartmentActionTypes.DepartmentCreated),
            mergeMap((payload) => {
                console.log('payload', payload);
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.service.createDepartment(payload.payload).pipe(
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
            ofType<any>(DepartmentActionTypes.DepartmentDeleted),
            mergeMap(({ payload }) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.service.deleteDepartment(payload.id);
            }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private service: DepartmentService, private store: Store<AppState>) { }
}
