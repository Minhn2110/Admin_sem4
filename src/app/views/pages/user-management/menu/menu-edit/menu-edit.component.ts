import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../core/auth';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';


export class Menu {
  id?: number;
  parentId: number;
  name: string;
  url: string;
  orderIndex: number;
  active: boolean;
}


@Component({
  selector: 'kt-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})



export class MenuEditComponent implements OnInit {

  menu: Menu;
  menuForm: FormGroup;
  hasFormErrors = false;
  selectedTab = 0;
  id: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private menuFB: FormBuilder,
    private authService: AuthService,
    private layoutUtilsService: LayoutUtilsService,



  ) { }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      console.log('id', this.id);
      if (this.id && this.id > 0) {
        this.getMenu(this.id);
      }
    })
  }

  createForm() {
    console.log('this menu', this.menu);
    this.menuForm = this.menuFB.group({
      parentId: ['', Validators.required],
      name: ['', Validators.required],
      url: ['', Validators.required],
      orderIndex: ['', Validators.required],
    });
  }
  getMenu(id) {
    this.authService.getMenu(id).subscribe(menu => {
      if (menu) {
        console.log('menu', menu);
        console.log('this menu', this.menuForm);
        this.menuForm.controls["parentId"].setValue(menu.parentId);
        this.menuForm.controls["name"].setValue(menu.name);
        this.menuForm.controls["url"].setValue(menu.url);
        this.menuForm.controls["orderIndex"].setValue(menu.orderIndex);
        this.menuForm.controls["active"].setValue(menu.active);
      }

    })
  }

  getComponentTitle() {
    let result = 'Create menu';
    if (!this.menu || !this.menu.id) {
      return result;
    }
    result = `Edit menu`;
    return result;
  }

  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  prepareMenu(): Menu {
    const controls = this.menuForm.controls;
    const _menu = new Menu();
    _menu.parentId = parseInt(controls.parentId.value);
    _menu.name = controls.name.value;
    _menu.url = controls.url.value;
    _menu.orderIndex = parseInt(controls.orderIndex.value);
    _menu.active = true;

    return _menu;
  }

  onSumbit(withBack: boolean = false) {
    this.hasFormErrors = false;
    const controls = this.menuForm.controls;
    /** check form */
    if (this.menuForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    const editedMenu = this.prepareMenu();

    if (this.id) {
      this.updateMenu(this.id, editedMenu);
      return;
    } else {
      this.addMenu(editedMenu);
    }
  }

  addMenu(_menu: Menu) {
    this.authService.createMenus(_menu).subscribe(res => {
      console.log('add menu res', res);
      if (res) {
        const message = `New menu successfully has been added. Redirect to menu list. `;
        this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
        setTimeout(() => {
          const url = `/user-management/menus`;
          this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
        }, 2000);
      }
    })
  }

  updateMenu(id, _menu: Menu) {
    this.authService.updateMenus(id, _menu).subscribe(res => {
      console.log('update menu res', res);
      if (res) {
        const message = `Menu successfully has been saved.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        setTimeout(() => {
          const url = `/user-management/menus`;
          this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
        }, 2000);
      }
    })
  }
}


