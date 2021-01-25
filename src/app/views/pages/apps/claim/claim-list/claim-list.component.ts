import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from '../../../../../core/auth/_services';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../core/_base/crud';
import { ClaimInfoComponent } from '../claim-info/claim-info.component';

@Component({
  selector: 'kt-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {

  constructor(private claimService: ClaimService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService,
    ) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'numberPlate', 'partnerCode', 'partnerName', 'status', 'actions'];

  displayedColumnsBinding = [
    { matColumnDef: 'id', header: 'Id' },
    { matColumnDef: 'name', header: 'First Name' },
    { matColumnDef: 'numberPlate', header: 'Last Name' },
    { matColumnDef: 'partnerCode', header: 'Username' },
    { matColumnDef: 'partnerName', header: 'Phone Number' },
    // { matColumnDef: 'status', header: 'Email' },
    // { matColumnDef: 'address', header: 'Address' },
  ];

  length: number;
  loading$:boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.loading$ = true;
    this.claimService.getClaimList('', 1, 5, 'desc').subscribe((res) => {
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
  
  getItemCssClassByStatus(status: any): string {
		switch (status) {
			case 'Approved':
				return 'success';
			case 'Pending':
				return 'metal';
		}
		return '';
  }
  
  editClaim(id) {
    this.openDialog(id)
  }

  openDialog(id ?: any): void {
    console.log('code', id);
    if (id) {
        console.log('id', id);
        const dialogRef = this.dialog.open(ClaimInfoComponent, {
          data: {
            id: id
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);

        });
    } else {
      const dialogRef = this.dialog.open(ClaimInfoComponent,
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
