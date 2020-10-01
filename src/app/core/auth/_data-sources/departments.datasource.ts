// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../../core/reducers';

import { selectDepartmentsInStore, selectDepartmentsPageLoading, selectDepartmentsShowInitWaitingMessage } from '../_selectors/department.selectors';

export class DepartmentsDataSource extends BaseDataSource {
	constructor(private store: Store<AppState>) {
		super();

		this.loading$ = this.store.pipe(
			select(selectDepartmentsPageLoading)
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectDepartmentsShowInitWaitingMessage)
		);

		this.store.pipe( 
			select(selectDepartmentsInStore)
		).subscribe((response: QueryResultsModel) => {
      console.log('response', response);
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		}); 
	}
}
