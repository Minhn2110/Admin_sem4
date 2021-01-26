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
    this.claimService.getClaimList('', this.pageIndex, this.pageSize, 'desc').subscribe((res) => {
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

  
  getItemCssClassByStatus(status: any): string {
		switch (status) {
			case 'Done':
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
