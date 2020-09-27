// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { User } from '../_models/user.model';
// Models
import { QueryParamsModel } from '../../_base/crud';

export enum EmployeeActionTypes {
    EmployeeCreated = '[Employee] Department Created',
    EmployeePageRequested = '[Employee] Employee Page Requested',
    EmployeeUpdated = '[Employee] Employee Updated',
    EmployeePageLoaded = '[Employee] Employee Page Loaded',

}


export class EmployeeCreated implements Action {
    readonly type = EmployeeActionTypes.EmployeeCreated;
    constructor(public payload: any) { }
}



export class EmployeeUpdated implements Action {
    readonly type = EmployeeActionTypes.EmployeeUpdated;
    constructor(public payload: {
        id: number
        partialUser: Update<User>,
        user: User
    }) {     }
}


export class EmployeePageRequested implements Action {
    readonly type = EmployeeActionTypes.EmployeePageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}


export class EmployeePageLoaded implements Action {
    readonly type = EmployeeActionTypes.EmployeePageLoaded;
    constructor(public payload: { users: any[], totalCount: number, page: QueryParamsModel  }) { }
}


export type EmployeeActions = EmployeeCreated
| EmployeePageRequested
| EmployeeUpdated
| EmployeePageLoaded;

