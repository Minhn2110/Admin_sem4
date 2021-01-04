import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductFormBuilderModel } from '../product.model';
import { PartnerService } from '../../../../../core/auth/_services';
import { ProductService } from '../../../../../core/auth/_services';


@Component({
  selector: 'kt-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  productForm: FormGroup;
  selectedTab = 0;

  insuredRuleFileName: String;
  bannerImageFileName: String;
  avatarImageFileName: String;
  insuredRuleFile: File;
  bannerImageFile: File;
  avatarImageFile: File;


  availablePartner: Array<any> = [];
  availableCategory: Array<any> = [];
  hasFormErrors = false;

  @ViewChild('insuredRule', { static: false }) insuredRuleInput: ElementRef


  productFormBuilderInput: Array<ProductFormBuilderModel> = [
    { formControlName: 'name', placeholder: 'Enter Insurance Name', error: 'Insurance Name', hint: 'Insurance Name' },
    { formControlName: 'code', placeholder: 'Enter Insurance Code', error: 'Insurance Code', hint: 'Insurance Code' },
    { formControlName: 'priceObj', placeholder: 'Enter Price', error: 'Price', hint: 'Price' },
    { formControlName: 'effectiveDateRangeSelectionNumber', placeholder: 'Enter Effective Date', error: 'Effective Date', hint: 'Effective Date' },
  ]

  productFormBuilderTextArea: Array<ProductFormBuilderModel> = [
    { formControlName: 'detailedDescription', placeholder: 'Enter Detail Description', error: 'Detail Description', hint: 'Detail Description' },
    { formControlName: 'shortDescription', placeholder: 'Enter Short Description', error: 'Short Description', hint: 'Short Description' },
  ]

  constructor(private productFB: FormBuilder,
    private partnerService: PartnerService,
    private productService: ProductService,

  ) { }

  ngOnInit() {
    this.createProductForm();
    this.getAllPartners();
    this.getAllProductCategory();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('a', this.insuredRuleInput.nativeElement);
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
  }

  prepareProduct() {
    const controls = this.productForm.controls;
    const partnerId = controls.partner.value;
    console.log('controls', controls);
    const _product = new Product();
    // _product.append('name', controls.name.value);
    // _product.append('code', controls.code.value);
    // _product.append('priceObj', controls.priceObj.value);
    // _product.append('effectiveDateRangeSelectionNumber', controls.effectiveDateRangeSelectionNumber.value);
    // _product.append('detailedDescription', controls.detailedDescription.value);
    // _product.append('shortDescription', controls.shortDescription.value);
    // _product.append('genderApply', controls.gender.value);
    // _product.append('partnerId', Number(controls.partner.value));
    // _product.append('productCategotyId', controls.productCategory.value);
    // _product.append('insuredRule', this.insuredRuleFile);
    // _product.append('bannerImage', this.bannerImageFile);
    // _product.append('avatarImage', this.avatarImageFile);


    _product.name = controls.name.value;
    _product.code = controls.code.value;
    _product.priceObj = controls.priceObj.value;
    _product.effectiveDateRangeSelectionNumber = controls.effectiveDateRangeSelectionNumber.value;
    _product.detailedDescription = controls.detailedDescription.value;
    _product.shortDescription = controls.shortDescription.value;
    _product.genderApply = controls.gender.value;
    _product.partnerId = controls.partner.value;
    _product.productCategotyId = controls.productCategory.value;
    _product.insuredRule = this.insuredRuleFile;
    _product.bannerImage = this.bannerImageFile;
    _product.avatarImage = this.avatarImageFile;

    const _productFormData = new FormData();
    _productFormData.append('body',  JSON.stringify(_product))
    return _productFormData;
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
  }

  onUploadbannerImage(event) {
    this.bannerImageFile = event.target.files[0];
    this.bannerImageFileName = event.target.files[0].name;
    console.log(event.target.files);
  }

  onUploadavatarImage(event) {
    this.avatarImageFile = event.target.files[0];
    this.avatarImageFileName = event.target.files[0].name;
    console.log(event.target.files);
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

}
