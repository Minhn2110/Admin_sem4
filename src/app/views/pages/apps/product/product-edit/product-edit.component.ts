import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductFormBuilderModel } from '../product.model';
import { PartnerService } from '../../../../../core/auth/_services';
import { ProductService } from '../../../../../core/auth/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LayoutConfigService, SplashScreenService, TranslationService } from '../../../../../core/_base/layout';



@Component({
  selector: 'kt-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  productForm: FormGroup;
  insuredConfigForm: FormGroup;
  selectedTab = 0;

  insuredRuleFileName: String;
  bannerImageFileName: String;
  avatarImageFileName: String;
  insuredRuleFile: File;
  bannerImageFile: File;
  avatarImageFile: File;

  insuredRuleFileUrl: any;
  bannerImageFileUrl: any;
  avatarImageFileUrl: any;


  availablePartner: Array<any> = [];
  availableCategory: Array<any> = [];
  hasFormErrors = false;

  downloadURL: Observable<string>;
  currentDate: any;
  fb;

  loader: any;



  @ViewChild('insuredRule', { static: false }) insuredRuleInput: ElementRef


  productFormBuilderInput: Array<ProductFormBuilderModel> = [
    { formControlName: 'name', placeholder: 'Enter Insurance Name', error: 'Insurance Name', hint: 'Insurance Name' },
    { formControlName: 'code', placeholder: 'Enter Insurance Code', error: 'Insurance Code', hint: 'Insurance Code' },
    { formControlName: 'priceObj', placeholder: 'Enter Maximum Compensation', error: 'Maximum Compensation', hint: 'Maximum Compensation' },
    { formControlName: 'effectiveDateRangeSelectionNumber', placeholder: 'Enter Effective Date', error: 'Effective Date', hint: 'Effective Date' },
  ]

  productFormBuilderTextArea: Array<ProductFormBuilderModel> = [
    { formControlName: 'detailedDescription', placeholder: 'Enter Detail Description', error: 'Detail Description', hint: 'Detail Description' },
    { formControlName: 'shortDescription', placeholder: 'Enter Short Description', error: 'Short Description', hint: 'Short Description' },
  ]

  insuredConfigFormBuilderInput: Array<ProductFormBuilderModel> = [
    { formControlName: 'componentFee', placeholder: 'Enter Component Fee %', error: 'Component Fee', hint: 'Component Fee' },
    { formControlName: 'scratchedFee', placeholder: 'Enter Scratched Fee %', error: 'Scratched Fee', hint: 'Scratched Fee' },
    { formControlName: 'repaintFee', placeholder: 'Enter Repaint Fee %', error: 'Repaint Fee', hint: 'Repaint Fee' },
    { formControlName: 'stolenFee', placeholder: 'Enter Stolen Fee %', error: 'Stolen Fee', hint: 'Stolen Fee' },
    { formControlName: 'bringingFee', placeholder: 'Enter Bringing Fee', error: 'Bringing Fee', hint: 'Bringing Fee' },
    { formControlName: 'doorAndGlass', placeholder: 'Enter doorAndGlass Fee', error: 'doorAndGlass Fee', hint: 'doorAndGlass Fee' },
    { formControlName: 'rearViewMirror', placeholder: 'Enter Rear View Mirror Fee', error: 'Rear View Mirror Fee', hint: 'Rear View Mirror Fee' },
    // { formControlName: 'liabilityFee', placeholder: 'Enter Liability Fee', error: 'Liability Fee', hint: 'Liability Fee' },
    // { formControlName: 'collisionInsuranceFee', placeholder: 'Enter Collision Insurance Fee', error: 'Collision Insurance Fee', hint: 'Collision Insurance Fee' },
    // { formControlName: 'code', placeholder: 'Enter Insurance Code', error: 'Insurance Code', hint: 'Insurance Code' },
    // { formControlName: 'priceObj', placeholder: 'Enter Price', error: 'Price', hint: 'Price' },
    // { formControlName: 'effectiveDateRangeSelectionNumber', placeholder: 'Enter Effective Date', error: 'Effective Date', hint: 'Effective Date' },
  ]

  constructor(private productFB: FormBuilder,
    private partnerService: PartnerService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage,
    private layoutConfigService: LayoutConfigService


  ) { }

  ngOnInit() {
    this.loader = this.layoutConfigService.getConfig('loader.enabled');

    this.createProductForm();
    this.getAllPartners();
    this.getAllProductCategory();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('a', this.insuredRuleInput.nativeElement);
  }

  createCarBodyInsurance() {
    this.insuredConfigForm = this.productFB.group({
      componentFee: ['', Validators.required],
      scratchedFee: ['', Validators.required],
      repaintFee: ['', Validators.required],
      stolenFee: ['', Validators.required],
      bringingFee: ['', Validators.required],
      doorAndGlass: ['', Validators.required],
      rearViewMirror: ['', Validators.required],
    });
  }



  getComponentTitle() {
    let result = 'Create product';
    // if (!this.product || !this.product.id) {
    // 	return result;
    // }

    result = `Edit product`;
    return result;
  }

  createProductForm() {
    this.productForm = this.productFB.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      priceObj: ['', Validators.required],
      effectiveDateRangeSelectionNumber: ['', Validators.required],
      detailedDescription: ['', Validators.required],
      shortDescription: ['', Validators.required],
      gender: ['', Validators.required],
      partner: ['', Validators.required],
      productCategory: ['', Validators.required]
    });
    this.createCarBodyInsurance();


  }

  prepareProduct() {
    const controls = this.productForm.controls;
    const partnerId = controls.partner.value;
    const _product = new Product();



    _product.name = controls.name.value;
    _product.code = controls.code.value;
    _product.priceObj = parseInt(controls.priceObj.value, 10);
    _product.effectiveDateRangeSelectionNumber = parseInt(controls.effectiveDateRangeSelectionNumber.value, 10);
    _product.detailedDescription = controls.detailedDescription.value;
    _product.shortDescription = controls.shortDescription.value;
    _product.genderApply = controls.gender.value;
    _product.partnerId = parseInt(controls.partner.value, 10);
    _product.productCategoryId = parseInt(controls.productCategory.value, 10);
    _product.avatarImage = this.avatarImageFileUrl;
    _product.insuredRule = this.insuredRuleFileUrl;
    _product.bannerImage = this.bannerImageFileUrl;



    console.log('_product', _product);


    return _product;
  }

  getAllPartners() {
    this.partnerService.list().subscribe((res) => {
      this.availablePartner = res.data;
      console.log('res', res);
    })
  }

  getAllProductCategory() {
    this.productService.list().subscribe((res) => {
      this.availableCategory = res.data;
      console.log('res', res);
    })
  }

  onUploadInsuredRule(event) {
    this.insuredRuleFile = event.target.files[0];
    this.insuredRuleFileName = event.target.files[0].name;
    console.log(event.target.files);
    this.upploadFileToFireBase(this.insuredRuleFile, 'Insured Rule');
    setTimeout(() => {
      console.log(this.insuredRuleFileUrl);
    }, 5000);
  }

  onUploadbannerImage(event) {
    this.bannerImageFile = event.target.files[0];
    this.bannerImageFileName = event.target.files[0].name;
    console.log(event.target.files);
    this.upploadFileToFireBase(this.bannerImageFile, 'Banner Image');
    setTimeout(() => {
      console.log(this.bannerImageFileUrl);
    }, 5000);

  }

  onUploadavatarImage(event) {
    this.avatarImageFile = event.target.files[0];
    this.avatarImageFileName = event.target.files[0].name;
    this.upploadFileToFireBase(this.avatarImageFile, 'Avartar Image');
    setTimeout(() => {
      console.log(this.avatarImageFileUrl);
    }, 5000);
  }



  onSumbit(withBack: boolean = false) {
    this.hasFormErrors = false;
    const controls = this.productForm.controls;
    /** check form */
    if (this.productForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    // tslint:disable-next-line:prefer-const
    let editedProduct = this.prepareProduct();

    // if (editedProduct.id > 0) {
    // 	this.updateProduct(editedProduct, withBack);
    // 	return;
    // }

    this.addProduct(editedProduct, withBack);
  }

  addProduct(_product: any, withBack: boolean = false) {
    this.productService.createProduct(_product).subscribe((res) => {
      if (res) {
        console.log('res', res);
        const message = `Product uccessfully has been added.`;
        // this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        // this.goBackWithId();
      }
    })

  }

  goBackWithId() {
    const url = `/product/list`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  upploadFileToFireBase(file, name) {
    // If update Avatar
    const filePath = `ProjectImage/${name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`ProjectImage/${name}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              switch (name) {
                case 'Avartar Image':
                  this.avatarImageFileUrl = url;
                  break;
                case 'Banner Image':
                  this.bannerImageFileUrl = url;
                  break;
                case 'Insured Rule':
                  this.insuredRuleFileUrl = url;
                  break;
                default:
                  break;
              }
              // this.fb = url;
            }
            // console.log('link', this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', this.fb);
        }
      });
  }

}
