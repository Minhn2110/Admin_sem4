import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClaimService } from '../../../../../core/auth/_services';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

@Component({
  selector: 'kt-claim-info',
  templateUrl: './claim-info.component.html',
  styleUrls: ['./claim-info.component.scss']
})
export class ClaimInfoComponent implements OnInit {


  claimInfoForm: FormGroup;
  index: number = 0;
  hasFormErrors = false;

  carMakerModel: any;
  claimId: number;
  viewLoading = false;
  isPending: boolean = true;



  claimInfoPersonalFormBuilder: Array<any> = [
    {
      title: 'row',
      divider: true,
      inputs: [
        { formControlName: 'name', placeholder: 'Full Name', error: ' Brand', hint: ' Brand' },
        { formControlName: 'contractCode', placeholder: 'Contract Code', error: 'Code', hint: 'Code' },
        { formControlName: 'amount', placeholder: 'Insurance Amount', error: 'Code', hint: 'Code' },
      ]
    },
    {
      title: 'row',
      divider: true,
      inputs: [
        { formControlName: 'repaintFeeAmount', placeholder: 'Repaint Amount', error: ' Brand', hint: ' Brand' },
        { formControlName: 'bringingFeeAmount', placeholder: 'Bringing Fee Amount', error: ' Brand', hint: ' Brand' },
        { formControlName: 'componentFeeAmount', placeholder: 'Component Amount', error: 'Code', hint: 'Code' },
        { formControlName: 'rearViewMirrorAmount', placeholder: 'Rear View Mirror Amount', error: 'Code', hint: 'Code' },
        { formControlName: 'scratchedFeeAmount', placeholder: 'Scratched Amount', error: 'Code', hint: 'Code' },
      ]
    },
    {
      title: 'row',
      divider: true,
      inputs: [
        { formControlName: 'insuranceRepaintFeeAmount', placeholder: 'Insurance Repaint Amount', error: ' Brand', hint: ' Brand' },
        { formControlName: 'insuranceBringingFeeAmount', placeholder: 'Insurance Bringing Fee Amount', error: ' Brand', hint: ' Brand' },
        { formControlName: 'insuranceComponentFeeAmount', placeholder: 'Insurance Component Amount', error: 'Code', hint: 'Code' },
        { formControlName: 'insuranceRearViewMirrorAmount', placeholder: 'Insurance Rear View Mirror Amount', error: 'Code', hint: 'Code' },
        { formControlName: 'insuranceScratchedFeeAmount', placeholder: 'Insurance Scratched Amount', error: 'Code', hint: 'Code' },
      ]
    },

  ]

  carMakerFormBuilder: Array<any> = [
    { formControlName: 'carMakerTitle_0', placeholder: 'Enter Car Maker Title', error: ' Title', hint: ' Title' },
    { formControlName: 'carMakerCode_0', placeholder: 'Enter Car Maker Code', error: ' Code', hint: ' Code' },
    { formControlName: 'carMakerPrice_0', placeholder: 'Enter Car Maker Price', error: ' Price', hint: ' Price' },
  ]



  constructor(
    public dialogRef: MatDialogRef<ClaimInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carFB: FormBuilder,
    private claimService: ClaimService,
    private layoutUtilsService: LayoutUtilsService,

  ) { }

  ngOnInit() {
    this.initClaimInfoForm();


    if (this.data) {
      this.claimId = this.data.id;
      console.log(this.claimId);
      // this.getCarBrand();
    }

    // console.log(this.data);
    this.getClaimInfo();
    this.disableContractInfo();
  }

  initClaimInfoForm() {
    this.claimInfoForm = this.carFB.group({
      name: ['', Validators.required],
      contractCode: ['', Validators.required],
      amount: ['', Validators.required],
      // Row
      repaintFeeAmount: ['', Validators.required],
      bringingFeeAmount: ['', Validators.required],
      componentFeeAmount: ['', Validators.required],
      rearViewMirrorAmount: ['', Validators.required],
      scratchedFeeAmount: ['', Validators.required],
      // Row
      insuranceRepaintFeeAmount: ['', Validators.required],
      insuranceBringingFeeAmount: ['', Validators.required],
      insuranceComponentFeeAmount: ['', Validators.required],
      insuranceRearViewMirrorAmount: ['', Validators.required],
      insuranceScratchedFeeAmount: ['', Validators.required],

      // carMakerTitle_0: ['', Validators.required],
      // carMakerCode_0: ['', Validators.required],
      // carMakerPrice_0: ['', Validators.required],
    });
    console.log(this.claimInfoForm);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getTitle(): string {
    return 'Claim Information';
  }

  getClaimInfo() {
    this.claimService.getClaimInfo(this.claimId).subscribe((res) => {
      console.log(res);
      this.bindClaimInfo(res);
    })
  }

  bindClaimInfo(res) {
    if (res.status == 'Done') {
      this.isPending = false;
    } else {
      this.isPending = true;
    }
    const controls = this.claimInfoForm.controls;
    for (const property in controls) {
      controls[property].setValue(res[property] ? res[property] : '');
    }


  }
  disableContractInfo() {
    const controls = this.claimInfoForm.controls;
    for (const property in controls) {
      this.claimInfoForm.controls[property].disable();
    }
  }

  onSubmit() {
      const body = {
      status: 'Done'
    }
    this.claimService.changeStatisClaimInfo(body, this.claimId).subscribe((res) => {
      console.log('res', res);
      const message = `Claim has been resolved.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
      this.dialogRef.close(res.status);
    })
  }





}
