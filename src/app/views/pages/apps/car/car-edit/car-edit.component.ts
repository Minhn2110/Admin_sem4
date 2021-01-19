import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarService } from '../../../../../core/auth/_services';

@Component({
  selector: 'kt-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  carForm: FormGroup;
  index: number = 0;
  hasFormErrors = false;

  carMakerModel: any;
  carCode: string;


  carBrandFormBuilder: Array<any> = [
    { formControlName: 'carBrand', placeholder: 'Enter Car Brand', error: ' Brand', hint: ' Brand' },
    { formControlName: 'carBrandCode', placeholder: 'Enter Car Brand Code', error: 'Code', hint: 'Code' },
  ]

  carMakerFormBuilder: Array<any> = [
    { formControlName: 'carMakerTitle_0', placeholder: 'Enter Car Maker Title', error: ' Title', hint: ' Title' },
    { formControlName: 'carMakerCode_0', placeholder: 'Enter Car Maker Code', error: ' Code', hint: ' Code' },
    { formControlName: 'carMakerPrice_0', placeholder: 'Enter Car Maker Price', error: ' Price', hint: ' Price' },
  ]



  constructor(
    public dialogRef: MatDialogRef<CarEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carFB: FormBuilder,
    private carService: CarService
  ) { }

  ngOnInit() {
    this.initCarBrandForm();
    this.initCarMakerForm();

    if (this.data) {
      this.carCode = this.data.code;
      this.getCarBrand();
    }

    // console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getTitle(): string {
    // if (this.customer.id > 0) {
    // 	return `Edit customer '${this.customer.firstName} ${
    // 		this.customer.lastName
    // 	}'`;
    // }

    return 'New Car Brand';
  }

  initCarBrandForm() {
    this.carForm = this.carFB.group({
      carBrand: ['', Validators.required],
      carBrandCode: ['', Validators.required],
      carMakerTitle_0: ['', Validators.required],
      carMakerCode_0: ['', Validators.required],
      carMakerPrice_0: ['', Validators.required],
    });
    console.log(this.carForm);
  }

  initCarMakerForm() {

  }
  onAddCarMaker() {
    this.index = this.index + 1;
    let title = `carMakerTitle_${this.index}`;
    let code = `carMakerCode_${this.index}`;
    let price = `carMakerPrice_${this.index}`;

    this.carMakerFormBuilder.push(
      { formControlName: title, placeholder: 'Enter Car Maker Title', error: ' Title', hint: ' Title' },
      { formControlName: code, placeholder: 'Enter Car Maker Code', error: ' Code', hint: ' Code' },
      { formControlName: price, placeholder: 'Enter Car Maker Price', error: ' Price', hint: ' Price' },
    )
    this.carForm.addControl(title, this.carFB.control('', Validators.required));
    this.carForm.addControl(code, this.carFB.control('', Validators.required));
    this.carForm.addControl(price, this.carFB.control('', Validators.required));

    console.log(this.carForm);

  }

  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.carForm.controls;
    /** check form */
    // if (this.carForm.invalid) {
    //   Object.keys(controls).forEach(controlName =>
    //     controls[controlName].markAsTouched()
    //   );

    //   this.hasFormErrors = true;
    //   return;
    // }

    // tslint:disable-next-line:prefer-const
    let carData = this.prepareCarData();


    if (this.carCode) {

      this.updateCarBrand(this.carCode, carData);
    } else {
      this.createCarBrand(carData);
    }

  }

  prepareCarData() {
    this.carMakerModel = '';
    const controls = this.carForm.controls;

    const modelArray = [];
    for (let index = 0; index <= this.index; index++) {
      let item = {
        title: controls[`carMakerTitle_${index}`].value,
        code: controls[`carMakerCode_${index}`].value,
        price: controls[`carMakerPrice_${index}`].value
      }
      modelArray.push(item);
    }
    const _car = {
      carBrand: controls.carBrand.value,
      carBrandCode: controls.carBrandCode.value,
      models: JSON.stringify(modelArray)
    }
    console.log(this.index);
    console.log(JSON.parse( _car.models));
    // console.log(this.carForm.getRawValue());


    return _car;
  }

  createCarBrand(data) {
    // this.carService.createCarBrand(data).subscribe((res: any) => {
    //   console.log('res', res);
    // })
  }

  getCarBrand() {
    this.carService.get(this.carCode).subscribe((res: any) => {
      console.log('datra', res);
      if (res) {
        this.bindCarBrand(res);
      }
    })
  }

  bindCarBrand(res) {
    const controls = this.carForm.controls;

    controls['carBrand'].setValue(res.carBrand);
    controls['carBrandCode'].setValue(res.carBrandCode);

    res.models.forEach((item, index) => {
      controls[`carMakerTitle_${index}`].setValue(item.title);
      controls[`carMakerCode_${index}`].setValue(item.code);
      controls[`carMakerPrice_${index}`].setValue(item.price);
    });

  }
  updateCarBrand(code, data) {
    this.carService.update(code, data).subscribe((res: any) => {
      console.log('res', res);
    })
  }

}
