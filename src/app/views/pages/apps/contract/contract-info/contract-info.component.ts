import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContractService } from '../../../../../core/auth/_services';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

@Component({
  selector: 'kt-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss']
})
export class ContractInfoComponent implements OnInit {
  contractInfoForm: FormGroup;

  contractId: number;

  contractInfoFormBuilder: Array<any> = [
    {
      title: 'row',
      divider: true,
      inputs: [
        { formControlName: 'fullName', placeholder: 'Name', error: ' Name', hint: ' Name' },
        { formControlName: 'numberPlate', placeholder: 'Number Plate', error: ' Number Plate', hint: ' Number Plate' },
        { formControlName: 'carBrandName', placeholder: 'Car Brand Name', error: 'Car Brand Name', hint: 'Car Brand Name' },
        { formControlName: 'carModelTitle', placeholder: 'Car Model Title', error: 'Car Model Title', hint: 'Car Model Title' },
        { formControlName: 'address', placeholder: 'Address', error: 'Address', hint: 'Address' },
        { formControlName: 'phoneNumber', placeholder: 'Phone Number', error: 'Phone Number', hint: 'Phone Number' },

      ]
    },
    {
      title: 'row',
      divider: true,
      inputs: [
        { formControlName: 'code', placeholder: 'Contract Code', error: ' Brand', hint: ' Contract Code' },
        { formControlName: 'effectiveDate', placeholder: 'Effective Date', error: 'Code', hint: 'Effective Date' },
        { formControlName: 'expiredDate', placeholder: 'Expired Date', error: 'Code', hint: 'Expired Date' },
      ]
    },

  ]
  constructor(
    public dialogRef: MatDialogRef<ContractInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carFB: FormBuilder,
    private contractService: ContractService,
    private layoutUtilsService: LayoutUtilsService,

  ) { }

  ngOnInit() {
    if (this.data) {
      console.log(this.data);
      this.contractId = this.data.id;
      // this.getCarBrand();
    }
    this.getContractInfo();
    this.initContractInfoForm();
    this.disableContractInfo();''
  }

  initContractInfoForm() {
    this.contractInfoForm = this.carFB.group({
      fullName: ['', Validators.required],
      numberPlate: ['', Validators.required],
      carBrandName: ['', Validators.required],
      carModelTitle: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      // Row
      code: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      expiredDate: ['', Validators.required],
    });
    console.log(this.contractInfoForm);

  }

  getContractInfo() {
    this.contractService.get(this.contractId).subscribe((res) => {
      console.log(res);
      this.bindContractInfo(res);
    })
  }

  bindContractInfo(res) {
    const controls = this.contractInfoForm.controls;
    for (const property in controls) {
      controls[property].setValue(res[property] ? res[property] : '');
    }
  }
  disableContractInfo() {
    const controls = this.contractInfoForm.controls;
    for (const property in controls) {
      this.contractInfoForm.controls[property].disable();
    }
  }

  getTitle(): string {
    return 'Contract Information';
  }

}
