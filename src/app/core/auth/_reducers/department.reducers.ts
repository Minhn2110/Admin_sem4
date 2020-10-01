import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { QueryParamsModel } from '../../_base/crud';
import { DepartmentActions, DepartmentActionTypes } from '../_actions/department.actions';
import { EmployeeActionTypes, EmployeeActions } from '../_actions/employee.actions';

export interface DepartmentState extends EntityState<any> {
  listLoading: boolean;
  actionsloading: boolean;
  totalCount: number;
  lastCreatedUserId: number;
  lastQuery: QueryParamsModel;
  showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialUsersState: DepartmentState = adapter.getInitialState({
  listLoading: false,
  actionsloading: false,
  totalCount: 0,
  lastQuery:  new QueryParamsModel({}),
  lastCreatedUserId: undefined,
  showInitWaitingMessage: true
});

export function departmentReducer(state = initialUsersState, action: DepartmentActions): DepartmentState {
  switch  (action.type) {
      case DepartmentActionTypes.DepartmentPageLoaded: {
          return adapter.addMany(action.payload.users, {
              ...initialUsersState,
              totalCount: action.payload.totalCount,
              lastQuery: action.payload.page,
              listLoading: false,
              showInitWaitingMessage: false
          });
      }
      default: return state;
  }
}

export const getDepartmentState = createFeatureSelector<DepartmentState>('department');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
