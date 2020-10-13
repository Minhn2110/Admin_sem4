// Angular
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../../core/auth';
// RXJS

import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';



@Component({
	selector: 'kt-roles-list',
	templateUrl: './roles-list.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent implements OnInit {
	// Table fields
  dataSource: any;
  length: number;
  displayedColumns = ['id', 'name', 'description', 'status', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private authService: AuthService,
    private router: Router,
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog,
		private layoutUtilsService: LayoutUtilsService




  ) { }

  ngOnInit() {
    this.length = 0;
    this.authService.getAllRoles().subscribe(data => {
			console.log('data', data);
      this.dataSource = new MatTableDataSource<any>(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.length = data.length;

    });
  }

  ngAfterViewInit() {
  }
  deleteUser() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(id) {
		this.router.navigate(['../roles/edit', id], { relativeTo: this.activatedRoute });
  }

  getItemCssClassByStatus(status: boolean): string {
		switch (status) {
			case true:
				return 'success';
			case false:
				return 'metal';
		}
		return '';
	}
	
}
