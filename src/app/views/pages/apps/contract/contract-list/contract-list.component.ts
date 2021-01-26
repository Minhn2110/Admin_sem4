import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { ContractService } from '../../../../../core/auth/_services';
import { ContractInfoComponent } from '../contract-info/contract-info.component';


@Component({
  selector: 'kt-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  constructor(private contractService: ContractService,
    public dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    ) { }

  displayedColumns = ['id', 'code', 'fullName', 'productName', 'phoneNumber', 'paidAmount', 'status', 'actions'];

  displayedColumnsBinding = [
    { matColumnDef: 'id', header: 'Id' },
    { matColumnDef: 'code', header: 'Contract Code' },
    { matColumnDef: 'fullName', header: 'Full Name' },
    { matColumnDef: 'productName', header: 'Product' },
    { matColumnDef: 'phoneNumber', header: 'Phone Number' },
    { matColumnDef: 'paidAmount', header: 'Fee' },
    // { matColumnDef: 'address', header: 'Address' },
  ];

  length: number;
  loading$:boolean;
  pageIndex: any; 
  pageSize:any;
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator, {read: true, static: false}) paginator: MatPaginator;
  ngOnInit() {
    this.pageIndex = 1;
    this.pageSize = 5;
    this.getData();
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.loading$ = true;
    this.contractService.list('', this.pageIndex, this.pageSize, 'desc').subscribe((res) => {
      console.log('res', res);
      if (res && res.data.length > 0 ) {
        // this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.data = res.data;
        this.length = res.totalItems;
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

  
  getItemCssClassByStatus(status: boolean): string {
		switch (status) {
			case true:
				return 'success';
			case false:
				return 'metal';
		}
		return '';
  }
  
  editClaim(id) {
    this.openDialog(id)
  }

  openDialog(id ?: any): void {
    if (id) {
        console.log('id', id);
        const dialogRef = this.dialog.open(ContractInfoComponent, {
          data: {
            id: id
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);

        });
    } else {
      const dialogRef = this.dialog.open(ContractInfoComponent,
        {
          data: {
            id: null
          }
        });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }

  }

}
