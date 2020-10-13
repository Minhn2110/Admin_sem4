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
import { AuthService } from '../../../core/auth/_services';
// State
import { AppState } from '../../../core/reducers';
import {
    UserActionTypes,
    UsersPageRequested,
    UsersPageLoaded,
    UserCreated,
    UserDeleted,
    UserUpdated,
    UserOnServerCreated,
    UsersActionToggleLoading,
    UsersPageToggleLoading, DepartmentCreated,
} from '../_actions/user.actions';

@Injectable()
export class UserEffects {
    showPageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: true });
    hidePageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: false });

    showActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: false });

    @Effect()
    loadUsersPage$ = this.actions$
        .pipe(
            ofType<UsersPageRequested>(UserActionTypes.UsersPageRequested),
            mergeMap(({ payload }) => {
                this.store.dispatch(this.showPageLoadingDistpatcher);
                const requestToServer = this.auth.getAllUsers(payload.page.filter.username, payload.page.pageNumber, payload.page.pageSize, payload.page.sortField, payload.page.sortOrder);
                const lastQuery = of(payload.page);
                return forkJoin(requestToServer, lastQuery);
                // return requestToServer
            }),
            map(response => {
                console.log('response', response);
                // const result: QueryResultsModel = response[0];
                const lastQuery: QueryParamsModel = response[1];
                return new UsersPageLoaded({
                    users: response[0].data,
                    totalCount: response[0].totalItems,
                    page: lastQuery
                });
            }),
        );


    @Effect()
    deleteUser$ = this.actions$
        .pipe(
            ofType<UserDeleted>(UserActionTypes.UserDeleted),
            mergeMap(({ payload }) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.deleteUser(payload.id);
            }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateUser$ = this.actions$
        .pipe(
            ofType<UserUpdated>(UserActionTypes.UserUpdated),
            mergeMap(({ payload }) => {
                console.log('payload', payload);
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.updateUser(payload.id, payload.user);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );


    @Effect()
    createUser$ = this.actions$
        .pipe(
            ofType<UserOnServerCreated>(UserActionTypes.UserOnServerCreated),
            mergeMap(({ payload }) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.auth.createUser(payload.user).pipe(
                    tap(res => {
                        this.store.dispatch(new UserCreated({ user: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    // @Effect()
    // createDepartment$ = this.actions$
    //     .pipe(
    //         ofType<any>(UserActionTypes.DepartmentCreated),
    //         mergeMap((payload) => {
    //             console.log('payload', payload.payload.name);
    //             // debugger
    //             this.store.dispatch(this.showActionLoadingDistpatcher);
    //             return this.auth.createDepartment(payload.payload).pipe(
    //                 tap(res => {
    //                     console.log('ress', res);
    //                     // this.store.dispatch(new UserCreated({ user: res }));
    //                 })
    //             );
    //         }),
    //         map(() => {
    //             return this.hideActionLoadingDistpatcher;
    //         }),
    //     );

    constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) { }
}
