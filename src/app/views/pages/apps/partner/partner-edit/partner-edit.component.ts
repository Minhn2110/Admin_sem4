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
import { Partner } from '../partner.model';

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

  partner: Partner

  partnerId: Number;

  partnerFormBuilder: Array<PartnerForm> = [
    { formControlName: 'name', placeholder: 'Enter Partner Name', error: 'Partner name', hint: 'Partner name' },
    { formControlName: 'code', placeholder: 'Enter Partner code', error: 'Partner code', hint: 'code' },
    { formControlName: 'email', placeholder: 'Enter Email', error: 'Email', hint: 'Email' },
    { formControlName: 'phoneNumber', placeholder: 'Enter Phone Number', error: 'Phone number', hint: 'Phone number' },
    { formControlName: 'contact', placeholder: 'Enter Contact', error: 'Contact', hint: 'Contact' },
    { formControlName: 'hotline', placeholder: 'Enter hotline', error: 'hotline', hint: 'hotline' },
    { formControlName: 'introductionContent', placeholder: 'Enter description', error: 'description', hint: 'description' },
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
    console.log('partner2', this.partner);
    this.partner = new Partner();

    this.userForm = this.userFB.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      introductionContent: ['', Validators.required],
      appellation: ['', Validators.required],
      contact: ['', Validators.required],
      code: ['', Validators.required],
      hotline: ['', Validators.required],
    });
  }
  preparePartner(): Partner {
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
    // this.loading$ = this.store.pipe(select(selectUsersActionLoading));

    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.partnerId = params.id;
      console.log('partnerId', this.partnerId);
      const id = params.id;
      console.log('id', id);
      if (id && id > 0) {
        this.getPartner();
        // this.store.pipe(select(selectDepartmentById(id))).subscribe(res => {
        //   if (res) {
        //     console.log('res', res);
        //     this.user = res;
        //     this.oldUser = Object.assign({}, this.user);
        //     this.initUser();
        //   }
        // });
      } else {
        this.user.clear();
        this.oldUser = Object.assign({}, this.user);

      }
      this.createForm();
    });
    this.subscriptions.push(routeSubscription);
  }



  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  goBackWithId() {
    const url = `/partner/list`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

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

    if (this.partnerId) {
      // Case Edit
      this.updatePartner(partnerData, this.partnerId);
    } else {
      // Case Update
      alert('a');
      this.createPartner(partnerData);
    }
  }

  /**
   * Returns prepared data for save
   */




  getPartner() {
    this.partnerService.getById(this.partnerId).subscribe((res) => {
      if (res) {
        console.log('res', res);
        // this.partner.name = res.data.name
        // this.partner = res.data;
        console.log('partner', this.partner);
        // const message = `Partner uccessfully has been added.`;
        // this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        // this.goBackWithId();
        this.bindPartner(res);
      }
    })
  }

  bindPartner(res) {
    this.userForm.controls['name'].setValue(res.data.name);
    this.userForm.controls['email'].setValue(res.data.email);
    this.userForm.controls['phoneNumber'].setValue(res.data.phoneNumber);
    this.userForm.controls['introductionContent'].setValue(res.data.introductionContent);
    this.userForm.controls['appellation'].setValue(res.data.appellation);
    this.userForm.controls['contact'].setValue(res.data.contact);
    this.userForm.controls['code'].setValue(res.data.code);
    this.userForm.controls['hotline'].setValue(res.data.hotline);

  }

  createPartner(partner: any) {
    // console.log('user', _user);
    // this.store.dispatch(new DepartmentCreated(_user));
    this.partnerService.createPartner(partner).subscribe((res) => {
      if (res) {
        console.log('res', res);
        const message = `Partner successfully has been added.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        this.goBackWithId();
      }
    })
  }

  updatePartner(partner: any, id) {
    this.partnerService.updatePartner(partner, id).subscribe((res) => {
      if (res) {
        console.log('res', res);
        const message = `Partner successfully has been updated.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        this.goBackWithId();
      }
    })
  }

  getComponentTitle() {
    let result = 'Create Partner';
    if (!this.partnerId) {
      return result;
    }

    result = `Edit Partner`;
    return result;
  }

  onAlertClose($event) {
    this.hasFormErrors = false;
  }
}

