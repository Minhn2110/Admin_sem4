import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-claim-config',
  templateUrl: './claim-config.component.html',
  styleUrls: ['./claim-config.component.scss']
})
export class ClaimConfigComponent implements OnInit {

  claimConfigForm: FormGroup;
  selectedTab = 0;
  editorContent: string;

  hasFormErrors = false;



  constructor(
    private  claimConfigFB: FormBuilder,

  ) { } 

  ngOnInit() {
    this.initClaimConfigForm();
  }

  initClaimConfigForm() {
    this.claimConfigForm = this.claimConfigFB.group({
      claimConfigFormHeader: ['', Validators.required]
    });
  }

  getComponentTitle() {
    let result = 'Claim Config';
    return result;
  }
  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    console.log(this.editorContent);
  }

  prepareData(): any {
    const controls = this.claimConfigForm.controls;
    const data = {
      claimConfigFormHeader: controls.claimConfigFormHeader.value,
      claimConfigFormBanner: 'url...',
      claimConfigFormBody: this.editorContent

    }
    return data;
  }

  onSumbit() {
    this.hasFormErrors = false;
    const controls = this.claimConfigForm.controls;
    /** check form */
    if (this.claimConfigForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    const partnerData = this.prepareData();
    console.log(partnerData);

    // if (this.partnerId) {
    //   // Case Edit
    //   this.updatePartner(partnerData, this.partnerId);
    // } else {
    //   // Case Update
    //   alert('a');
    //   this.createPartner(partnerData);
    // }
  }

}
