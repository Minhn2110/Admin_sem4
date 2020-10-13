// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from 'lodash';
import { AuthService } from '../../../../../core/auth';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

export class Role {
  id ?: number; 
  name: string;
  description: string;
  active: boolean;
  menus: any[];
}

@Component({
	selector: 'kt-role-edit-dialog',
	templateUrl: './role-edit.dialog.component.html',
	// changeDetection: ChangeDetectionStrategy.Default,
})
export class RolesEditComponent implements OnInit {
	// Public properties
  role: Role;
  roleForm: FormGroup;
  hasFormErrors = false;
  selectedTab = 0;
  id: any;
  availableMenu: any[] = [];
  selectedMenu: any[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private menuFB: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private layoutUtilsService: LayoutUtilsService,


  ) { }

  ngOnInit() {
    this.createForm();
    this.authService.getAllMenus().subscribe(data => {
      console.log('data', data);
      this.availableMenu = data;

    });
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      console.log('id', this.id);
			if (this.id && this.id > 0) {
        this.getRole(this.id);
			} else {
			}
  })
}

createForm() {
  this.roleForm = this.menuFB.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    menu: [''],
  }); 
} 
getRole(id) {
  this.authService.getRoleById(id).subscribe(res => {
    if (res) {
      console.log('res', res);
      const menuArray = [];
      res.menus.forEach(item => {
        menuArray.push(item.id.toString());
      });
      console.log('menuArray', menuArray);
      this.roleForm.controls["name"].setValue(res.name);
      this.roleForm.controls["description"].setValue(res.description);
      this.roleForm.controls["menu"].setValue(menuArray);
      // this.selectedMenu = res.menu;

    }

  })
}

  getComponentTitle() {
		let result = 'Create Role';
		if (this.id) {
			return result;
		}
		result = `Edit Role`;
		return result;
  }
  
  onAlertClose($event) {
		this.hasFormErrors = false;
  }

  prepareUser(): Role {
    const roleArray = [];
		const controls = this.roleForm.controls;
		const _role = new Role(); 
		_role.name = controls.name.value;
		_role.description = controls.description.value;
    controls.menu.value.forEach(item => {
      roleArray.push(parseInt(item));
    });
    _role.menus = roleArray;
    _role.active = true;

		return _role;
	}
  
  onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.roleForm.controls;
		/** check form */
		if (this.roleForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedUser = this.prepareUser();

		if (this.id) {
			this.updateRole(this.id, editedUser);
			return;
		} else {
      console.log('1');
      this.addRole(editedUser);
    }
		// this.updateUser(editedUser, withBack);

  }
  
  addRole(_role: Role) {
    this.authService.createRole(_role).subscribe(res => {
      console.log('res', res);
      if (res) {
        const message = `New role successfully has been added.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
        setTimeout(() => {
          const url = `/user-management/roles`;
          this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
        }, 2000);
      }
    })
  }
  updateRole(id, _role: any) {
    this.authService.updateRole(id, _role).subscribe(res => {
      console.log('update menu res', res);
      if (res) {
        const message = `Role successfully has been saved.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        setTimeout(() => {
          const url = `/user-management/roles`;
          this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
        }, 2000);
      }
    })
  }
  test(event) {
    this.selectedMenu = [];
    event.value.forEach(value => {
      this.availableMenu.forEach(element => {
        if (value == element.id) {
          this.selectedMenu.push(element);
        }
      });
    });

    console.log('1',  this.selectedMenu);
  }
}
