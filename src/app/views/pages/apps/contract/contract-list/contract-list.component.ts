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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    ) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'fullName', 'productName', 'phoneNumber', 'paidAmount', 'status', 'actions'];

  displayedColumnsBinding = [
    { matColumnDef: 'id', header: 'Id' },
    { matColumnDef: 'fullName', header: 'Full Name' },
    { matColumnDef: 'productName', header: 'Product' },
    { matColumnDef: 'phoneNumber', header: 'Phone Number' },
    { matColumnDef: 'paidAmount', header: 'Fee' },
    // { matColumnDef: 'status', header: 'Email' },
    // { matColumnDef: 'address', header: 'Address' },
  ];

  length: number;
  loading$:boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.loading$ = true;
    this.contractService.list('', 1, 5, 'desc').subscribe((res) => {
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

  openDialog(code ?: any): void {
    if (code) {
        console.log('id', code);
        const dialogRef = this.dialog.open(ContractInfoComponent, {
          data: {
            code: code
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);

        });
    } else {
      const dialogRef = this.dialog.open(ContractInfoComponent,
        {
          data: {
            code: null
          }
        });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }

  }

}
