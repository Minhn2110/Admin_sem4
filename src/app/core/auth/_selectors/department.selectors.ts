// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { DepartmentState } from '../_reducers/department.reducers';
import { each } from 'lodash';
import { User } from '../_models/user.model';


export const selectDepartmentState = createFeatureSelector<DepartmentState>('department');

export const selectDepartmentById = (userId: number) => createSelector(
  selectDepartmentState,
    usersState => usersState.entities[userId]
);

export const selectDepartmentsPageLoading = createSelector(
  selectDepartmentState,
    usersState => {
        return usersState.listLoading;
    }
);

export const selectDepartmentsActionLoading = createSelector(
  selectDepartmentState,
    usersState => usersState.actionsloading
);

export const selectLastCreatedDepartmentId = createSelector(
  selectDepartmentState,
    usersState => usersState.lastCreatedUserId
);

export const selectDepartmentsPageLastQuery = createSelector(
  selectDepartmentState,
    usersState => usersState.lastQuery
);

export const selectDepartmentsInStore = createSelector(
  selectDepartmentState,
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

export const selectDepartmentsShowInitWaitingMessage = createSelector(
  selectDepartmentState,
    usersState => usersState.showInitWaitingMessage
);

export const selectHasDepartmentsInStore = createSelector(
  selectDepartmentState,
    queryResult => {
        if (!queryResult.totalCount) {
            return false;
        }

        return true;
    }
);
