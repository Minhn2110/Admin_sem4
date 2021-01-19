import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CarEditComponent } from '../car-edit/car-edit.component';

@Component({
  selector: 'kt-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  animal: string;
  name: string;

  ngOnInit() {

  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CarEditComponent, {
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
