import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../../../core/auth/_services';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';

@Component({
  selector: 'kt-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    ) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'givenName', 'surname', 'username', 'phoneNumber', 'email', 'address', 'actions'];

  displayedColumnsBinding = [
    { matColumnDef: 'id', header: 'Id' },
    { matColumnDef: 'givenName', header: 'First Name' },
    { matColumnDef: 'surname', header: 'Last Name' },
    { matColumnDef: 'username', header: 'Username' },
    { matColumnDef: 'phoneNumber', header: 'Phone Number' },
    { matColumnDef: 'email', header: 'Email' },
    { matColumnDef: 'address', header: 'Address' },
  ];

  length: number;
  loading$:boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.loading$ = true;
    this.customerService.list('', 1, 5, 'desc').subscribe((res) => {
      console.log('res', res);
      if (res && res.data.length > 0 ) {
        const data = res.data;
        this.dataSource = new MatTableDataSource(res.data);
        console.log('this datasoource', this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.length = res.data.length;
        this.loading$ = false;
      } 
    })
  }

  deleteCustomer(_item: any) {
		const _title: string = 'Customer Delete';
		const _description: string = 'Are you sure to permanently delete this customer?';
		const _waitDesciption: string = 'Customer is deleting';
		const _deleteMessage = 'Customer has been deleted';

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		});
	}

}
