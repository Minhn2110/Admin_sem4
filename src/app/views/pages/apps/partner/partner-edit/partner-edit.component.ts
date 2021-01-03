// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
// Services and Models
import {
  User,
  SocialNetworks,
  selectLastCreatedUserId,
  selectUsersActionLoading,
  DepartmentCreated, selectDepartmentById, DepartmentUpdated
} from '../../../../../core/auth';
import { PartnerService } from '../../../../../core/auth/_services';

export interface PartnerForm {
  formControlName: string;
  placeholder: string;
  error: string;
  hint: string;
}

@Component({
  selector: 'kt-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})

export class PartnerEditComponent implements OnInit, OnDestroy {

  user: any;
  userId$: Observable<number>;
  oldUser: User;
  selectedTab = 0;
  loading$: Observable<boolean>;
  rolesSubject = new BehaviorSubject<number[]>([]);
  soicialNetworksSubject = new BehaviorSubject<SocialNetworks>(new SocialNetworks());
  userForm: FormGroup;
  hasFormErrors = false;

  partnerFormBuilder: Array<PartnerForm> = [
    { formControlName: 'name', placeholder: 'Enter Partner Name', error: 'Partner name', hint: 'Partner name' },
    { formControlName: 'email', placeholder: 'Enter Email', error: 'Email', hint: 'Email' },
    { formControlName: 'phoneNumber', placeholder: 'Enter Phone Number', error: 'Phone number', hint: 'Phone number' },
    { formControlName: 'introductionContent', placeholder: 'Enter description', error: 'description', hint: 'description' },
    { formControlName: 'appellation', placeholder: 'Enter Appellation', error: 'Appellation', hint: 'Appellation' },
    { formControlName: 'contact', placeholder: 'Enter Contact', error: 'Contact', hint: 'Contact' },
    { formControlName: 'code', placeholder: 'Enter code', error: 'code', hint: 'code' },
    { formControlName: 'hotline', placeholder: 'Enter hotline', error: 'hotline', hint: 'hotline' },
  ]
  // Private properties
  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userFB: FormBuilder,
    private subheaderService: SubheaderService,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>,
    private partnerService: PartnerService,
    private layoutConfigService: LayoutConfigService) { }

  createForm() {
    this.userForm = this.userFB.group({
      name: [this.user.name, Validators.required],
      email: [this.user.description, Validators.required],
      phoneNumber: [this.user.description, Validators.required],
      introductionContent: [this.user.description, Validators.required],
      appellation: [this.user.description, Validators.required],
      contact: [this.user.description, Validators.required],
      code: [this.user.description, Validators.required],
      hotline: [this.user.description, Validators.required],
    });
  }
  preparePartner(): any {
    const controls = this.userForm.controls;
    const partner = {
      name: controls.name.value,
      email: controls.email.value,
      phoneNumber: controls.phoneNumber.value,
      introductionContent: controls.introductionContent.value,
      appellation: controls.appellation.value,
      contact: controls.contact.value,
      code: controls.code.value,
      hotline: controls.hotline.value,
    }
    return partner;
  }
  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectUsersActionLoading));

    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.store.pipe(select(selectDepartmentById(id))).subscribe(res => {
          if (res) {
            console.log('res', res);
            this.user = res;
            this.oldUser = Object.assign({}, this.user);
            this.initUser();
          }
        });
      } else {
        this.user = new User();
        this.user.clear();
        this.oldUser = Object.assign({}, this.user);
        this.initUser();
      }
    });
    this.subscriptions.push(routeSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  /**
   * Init user
   */
  initUser() {
    this.createForm();
    if (!this.user.id) {
      this.subheaderService.setTitle('Create user');
      this.subheaderService.setBreadcrumbs([
        { title: 'User Management', page: `user-management` },
        { title: 'Users', page: `user-management/users` },
        { title: 'Create user', page: `user-management/users/add` }
      ]);
      return;
    }
    this.subheaderService.setTitle('Edit user');
    this.subheaderService.setBreadcrumbs([
      { title: 'User Management', page: `user-management` },
      { title: 'Users', page: `user-management/users` },
      { title: 'Edit user', page: `user-management/users/edit`, queryParams: { id: this.user.id } }
    ]);
  }

  goBackWithId() {
    const url = `/partner/list`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  /**
   * Refresh user
   *
   * @param isNew: boolean
   * @param id: number
   */
  refreshUser(isNew: boolean = false, id = 0) {
    let url = this.router.url;
    if (!isNew) {
      this.router.navigate([url], { relativeTo: this.activatedRoute });
      return;
    }

    url = `/user-management/users/edit/${id}`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  /**
   * Reset
   */
  reset() {
    this.user = Object.assign({}, this.oldUser);
    this.createForm();
    this.hasFormErrors = false;
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.userForm.updateValueAndValidity();
  }

  /**
   * Save data
   *
   * @param withBack: boolean
   */
  onSumbit(withBack: boolean = false) {
    this.hasFormErrors = false;
    const controls = this.userForm.controls;
    /** check form */
    if (this.userForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    const partnerData = this.preparePartner();

    if (this.user.id) {
      // Case Edit
      this.updateUser(partnerData, withBack);
      console.log('update');
    } else {
      // Case Update
      alert('a');
      this.createPartner(partnerData);
    }
  }

  /**
   * Returns prepared data for save
   */


  createPartner(partner: any) {
    // console.log('user', _user);
    // this.store.dispatch(new DepartmentCreated(_user));
    this.partnerService.createPartner(partner).subscribe((res) => {
      if (res) {
        console.log('res', res);
        const message = `Partner uccessfully has been added.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        this.goBackWithId();
      }
    })
    // const addSubscription = this.store.pipe(select(selectLastCreatedUserId)).subscribe(newId => {
    //   const message = `New user successfully has been added.`;
    //   this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
    //   if (newId) {
    //     if (withBack) {
    //       this.goBackWithId();
    //     } else {
    //       this.refreshUser(true, newId);
    //     }
    //   }
    // });
    // this.subscriptions.push(addSubscription);
  }

  /**
   * Update user
   *
   * @param _user: User
   * @param withBack: boolean
   */
  updateUser(_user: any, withBack: boolean = false) {
    // Update User
    // tslint:disable-next-line:prefer-const

    const updatedUser: Update<User> = {
      id: this.user.id,
      changes: _user
    };
    this.store.dispatch(new DepartmentUpdated({ partialUser: updatedUser, user: _user, id: this.user.id }));
    const message = `Department successfully has been saved.`;
    this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
    if (withBack) {
      this.goBackWithId();
    } else {
      this.refreshUser(false);
    }
  }

  /**
   * Returns component title
   */
  getComponentTitle() {
    let result = 'Create Partner';
    if (!this.user || !this.user.id) {
      return result;
    }

    result = `Edit Partner - ${this.user.name}`;
    return result;
  }

  /**
   * Close Alert
   *
   * @param $event: Event
   */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }
}

