// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { User } from '../_models/user.model';
// Models
import { QueryParamsModel } from '../../_base/crud';

export enum DepartmentActionTypes {
    DepartmentCreated = '[Department] Department Created',
    DepartmentPageRequested = '[Department] Department Page Requested',
    DepartmentUpdated = '[Department] Department Updated',
    DepartmentPageLoaded = '[Department] Department Page Loaded',
    DepartmentDeleted = '[Department] Department Deleted'

}


export class DepartmentCreated implements Action {
    readonly type = DepartmentActionTypes.DepartmentCreated;
    constructor(public payload: any) { }
}



export class DepartmentUpdated implements Action {
    readonly type = DepartmentActionTypes.DepartmentUpdated;
    constructor(public payload: {
        id: number
        partialUser: Update<User>,
        user: User
    }) {     }
}


export class DepartmentPageRequested implements Action {
    readonly type = DepartmentActionTypes.DepartmentPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}


export class DepartmentPageLoaded implements Action {
    readonly type = DepartmentActionTypes.DepartmentPageLoaded;
    constructor(public payload: { users: any[], totalCount: number, page: QueryParamsModel  }) { }
}

export class DepartmentDeleted implements Action {
    readonly type = DepartmentActionTypes.DepartmentDeleted;
    constructor(public payload: { id: number }) {}
}


export type DepartmentActions = 
  DepartmentCreated
| DepartmentPageRequested
| DepartmentUpdated
| DepartmentPageLoaded
| DepartmentDeleted;

