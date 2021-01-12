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

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'customerPhoneNumber', 'partnerName', 'paymentMethod', 'productName', 'amount'];

  displayedColumnsBinding = [
    { matColumnDef: 'id', header: 'Id' },
    { matColumnDef: 'name', header: 'Name' },
    { matColumnDef: 'partnerName', header: 'Partner Name' },
    { matColumnDef: 'paymentMethod', header: 'Payment Method' },
    { matColumnDef: 'productName', header: 'Product Name' },
    { matColumnDef: 'amount', header: 'Amount' },
  ];

  length: number;
  loading$:boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.loading$ = true;
    this.transactionHistoryService.list('', 1, 5, 'desc').subscribe((res) => {
      console.log('res', res);
      if (res && res.data.length > 0 ) {
        const data = res.data;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.length = res.data.length;
        this.loading$ = false;
      } 
    })
  }

}
