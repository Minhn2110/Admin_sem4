import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService, ProductService } from '../../../../../core/auth/_services';


@Component({
  selector: 'kt-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private partnerService: PartnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    ) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'email',  'status', 'actions'];
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
    this.productService.list().subscribe((res) => {
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

  getItemCssClassByStatus(status: boolean): string {
		switch (status) {
			case true:
				return 'success';
			case false:
				return 'metal';
		}
		return '';
	}
  editProduct(code) {
		this.router.navigate(['../list/edit', code], { relativeTo: this.activatedRoute });
  }

  deletePartner(id) {
		this.router.navigate(['../list/edit', id], { relativeTo: this.activatedRoute });

  }
  onActivePartner(id) {
    const body = 'APPROVED';
    this.partnerService.updateStatus(id, body).subscribe((res) => {
      console.log('res', res);
    })
    console.log('id', id);
  }
}
