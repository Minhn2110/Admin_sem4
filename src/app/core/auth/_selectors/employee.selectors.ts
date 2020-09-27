// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { EmployeeState } from '../_reducers/employee.reducers';
import { each } from 'lodash';
import { User } from '../_models/user.model';


export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectEmployeeById = (userId: number) => createSelector(
  selectEmployeeState,
    usersState => usersState.entities[userId]
);

export const selectEmployeesPageLoading = createSelector(
  selectEmployeeState,
    usersState => {
        return usersState.listLoading;
    }
);

export const selectEmployeesActionLoading = createSelector(
  selectEmployeeState,
    usersState => usersState.actionsloading
);

export const selectLastCreatedEmployeeId = createSelector(
  selectEmployeeState,
    usersState => usersState.lastCreatedUserId
);

export const selectEmployeesPageLastQuery = createSelector(
  selectEmployeeState,
    usersState => usersState.lastQuery
);

export const selectEmployeesInStore = createSelector(
  selectEmployeeState,
    usersState => {
        const items: any[] = [];
        each(usersState.entities, element => {
            items.push(element);
        });
        const httpExtension = new HttpExtenstionsModel();
        const result: any[] = httpExtension.sortArray(items, usersState.lastQuery.sortField, usersState.lastQuery.sortOrder);
        return new QueryResultsModel(result, usersState.totalCount, '');
    }
);

export const selectEmployeesShowInitWaitingMessage = createSelector(
  selectEmployeeState,
    usersState => usersState.showInitWaitingMessage
);

export const selectHasEmployeesInStore = createSelector(
  selectEmployeeState,
    queryResult => {
        if (!queryResult.totalCount) {
            return false;
        }

        return true;
    }
);
