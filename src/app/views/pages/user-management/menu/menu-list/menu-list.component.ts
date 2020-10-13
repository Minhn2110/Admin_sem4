import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

import { AuthService } from '../../../../../core/auth';
@Component({
  selector: 'kt-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  dataSource: any;
  length: number;
  displayedColumns = ['id', 'name', 'url', 'status', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,



  ) { }

  ngOnInit() {
    this.length = 0;
    this.getMenuList();
  }

  getMenuList() {
    this.authService.getAllMenus().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.length = data.length;
      console.log('data', this.dataSource);
    });
  }

  deleteMenu(id) {
    const _title = 'Menu Delete';
    const _description = 'Are you sure to permanently delete this menu?';
    const _waitDesciption = 'Menu is deleting...';
    const _deleteMessage = `Menu has been deleted`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.authService.deleteMenu(id).subscribe(res => {
        if (res) {
          this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
          this.dataSource = new MatTableDataSource<any>();
          this.getMenuList();
        }
      })
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editMenu(id) {
    this.router.navigate(['../menus/edit', id], { relativeTo: this.activatedRoute });
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
}
