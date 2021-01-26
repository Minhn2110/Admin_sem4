import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService, TransactionHistoryService } from '../../../../../core/auth/_services';


@Component({
  selector: 'kt-transaction-history-list',
  templateUrl: './transaction-history-list.component.html',
  styleUrls: ['./transaction-history-list.component.scss']
})
export class TransactionHistoryListComponent implements OnInit {

  constructor(private transactionHistoryService: TransactionHistoryService,
    private activatedRoute: ActivatedRoute,
		private router: Router,) { }

    dataSource = new MatTableDataSource();
    displayedColumns = ['id', 'customerName', 'customerPhoneNumber', 'paymentMethod', 'productName', 'amount', 'status'];

  displayedColumnsBinding = [
    { matColumnDef: 'id', header: 'Id' },
    { matColumnDef: 'customerName', header: 'Name' },
    { matColumnDef: 'customerPhoneNumber', header: 'Partner Name' },
    { matColumnDef: 'paymentMethod', header: 'Payment Method' },
    { matColumnDef: 'productName', header: 'Product Name' },
    { matColumnDef: 'amount', header: 'Amount' },
  ];

  dataLength: any;
  loading$:boolean;
  pageIndex: any;
  pageSize:any;

  @ViewChild(MatPaginator, {read: true, static: false}) paginator: MatPaginator;
  ngOnInit() {
    this.pageIndex = 1;
    this.pageSize = 5;
    this.getData();
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.loading$ = true;
    this.transactionHistoryService.list('', this.pageIndex, this.pageSize, 'desc').subscribe((res) => {
      console.log('res', res);
      if (res && res.data.length > 0 ) {
        // this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.data = res.data;
        this.dataLength = res.totalItems;

        // debugger
        this.loading$ = false;
      } 
    })
  }
  onPaginate(event) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
    console.log(event);
  }

  getItemCssClassByStatus(status: any): string {
		switch (status) {
			case 'Success':
				return 'success';
			default:
				return 'metal';
		}
		return '';
  }

}
