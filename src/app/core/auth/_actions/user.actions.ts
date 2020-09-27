// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { User } from '../_models/user.model';
// Models
import { QueryParamsModel } from '../../_base/crud';

export enum UserActionTypes {
    AllUsersRequested = '[Users Module] All Users Requested',
    AllUsersLoaded = '[Users API] All Users Loaded',
    DepartmentCreated = '[Department] Department Created',
    UserOnServerCreated = '[Edit User Component] User On Server Created',
    UserCreated = '[Edit User Dialog] User Created',
    UserUpdated = '[Edit User Dialog] User Updated',
    UserDeleted = '[Users List Page] User Deleted',
    UsersPageRequested = '[Users List Page] ',
    UsersPageLoaded = '[Users API] Users Page Loaded',
    UsersPageCancelled = '[Users API] Users Page Cancelled',
    UsersPageToggleLoading = '[Users] Users Page Toggle Loading',
    UsersActionToggleLoading = '[Users] Users Action Toggle Loading',

}

export class DepartmentCreated implements Action {
    readonly type = UserActionTypes.DepartmentCreated;
    constructor(public payload: any) { }
}

export class UserOnServerCreated implements Action {
    readonly type = UserActionTypes.UserOnServerCreated;
    constructor(public payload: { user: User }) { }
}

export class UserCreated implements Action {
    readonly type = UserActionTypes.UserCreated;
    constructor(public payload: { user: User }) { }
}


export class UserUpdated implements Action {
    readonly type = UserActionTypes.UserUpdated;
    constructor(public payload: {
        id: number
        partialUser: Update<User>,
        user: User
    }) {     }
}


export class UserDeleted implements Action {
    readonly type = UserActionTypes.UserDeleted;
    constructor(public payload: { id: number }) {}
}

export class UsersPageRequested implements Action {
    readonly type = UserActionTypes.UsersPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}


export class UsersPageLoaded implements Action {
    readonly type = UserActionTypes.UsersPageLoaded;
    constructor(public payload: { users: any[], totalCount: number, page: QueryParamsModel  }) { }
}



export class UsersPageCancelled implements Action {
    readonly type = UserActionTypes.UsersPageCancelled;
}

export class UsersPageToggleLoading implements Action {
    readonly type = UserActionTypes.UsersPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class UsersActionToggleLoading implements Action {
    readonly type = UserActionTypes.UsersActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type UserActions = UserCreated
| UserUpdated
| UserDeleted
| UserOnServerCreated
| UsersPageLoaded
| UsersPageCancelled
| UsersPageToggleLoading
| UsersPageRequested
| UsersActionToggleLoading
| DepartmentCreated;

