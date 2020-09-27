import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { QueryParamsModel } from '../../_base/crud';
import { EmployeeActionTypes, EmployeeActions } from '../_actions/employee.actions';

export interface EmployeeState extends EntityState<any> {
  listLoading: boolean;
  actionsloading: boolean;
  totalCount: number;
  lastCreatedUserId: number;
  lastQuery: QueryParamsModel;
  showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialUsersState: EmployeeState = adapter.getInitialState({
  listLoading: false,
  actionsloading: false,
  totalCount: 0,
  lastQuery:  new QueryParamsModel({}),
  lastCreatedUserId: undefined,
  showInitWaitingMessage: true
});

export function employeeReducer(state = initialUsersState, action: EmployeeActions): EmployeeState {
  switch  (action.type) {
      case EmployeeActionTypes.EmployeePageLoaded: {
          return adapter.addMany(action.payload.users[0], {
              ...initialUsersState,
              totalCount: action.payload.users[0].length,
              lastQuery: action.payload.page,
              listLoading: false,
              showInitWaitingMessage: false
          });
      }
      default: return state;
  }
}

export const getEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
