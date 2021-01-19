import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../../../core/auth/_services';
import { CarEditComponent } from '../car-edit/car-edit.component';

@Component({
  selector: 'kt-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  animal: string;
  name: string;
  
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'carBrand', 'carBrandCode', 'actions'];

  displayedColumnsBinding = [
    { matColumnDef: 'id', header: 'Id' },
    { matColumnDef: 'carBrand', header: 'Car Brand' },
    { matColumnDef: 'carBrandCode', header: 'Car Brand Code'},

  ];
  length: number;
  loading$:boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  ngOnInit() {
    this.loading$ = true;
    this.carService.list().subscribe((res) => {
      console.log('res', res);
      if (res && res.length > 0 ) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.length = res.length;
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
  editCarBrand(code) {
    this.openDialog(code);
  }

  deletePartner(id) {
		this.router.navigate(['../list/edit', id], { relativeTo: this.activatedRoute });

  }
  onActivePartner(id) {
    // const body = 'APPROVED';
    // this.carService.updateStatus(id, body).subscribe((res) => {
    //   console.log('res', res);
    // })
    // console.log('id', id);
  }
  openDialog(code ?: string): void {
    if (code) {
        console.log('id', code);
        const dialogRef = this.dialog.open(CarEditComponent, {
          data: {
            code: code
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
        });
    } else {
      const dialogRef = this.dialog.open(CarEditComponent, {
        data: {name: this.name, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

  }

}
