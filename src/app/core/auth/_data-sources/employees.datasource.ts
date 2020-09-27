// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../../core/reducers';

import { selectEmployeesInStore, selectEmployeesPageLoading, selectEmployeesShowInitWaitingMessage } from '../_selectors/employee.selectors';

export class EmployeesDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectEmployeesPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectEmployeesShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectEmployeesInStore)
		).subscribe((response: QueryResultsModel) => {
      console.log('response', response);
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
