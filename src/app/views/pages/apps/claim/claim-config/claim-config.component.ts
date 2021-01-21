import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClaimService } from '../../../../../core/auth/_services';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

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
  downloadURL: Observable<string>;

  claimConfigBannerFileName: String;

  claimConfigBannerFile: File;

  claimConfigBannerFileUrl: any;
  viewLoading = false; 


  // loadingSubject = new BehaviorSubject<boolean>(true);
	// loading$: Observable<boolean>;


  constructor(
    private claimConfigFB: FormBuilder,
    private claimConfigService: ClaimService,
    private storage: AngularFireStorage,
    private layoutUtilsService: LayoutUtilsService,



  ) { }

  ngOnInit() {
    // this.loading$ = this.loadingSubject.asObservable();
		// this.loadingSubject.next(true);
    this.initClaimConfigForm();
    this.getClaimConfig();
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
      claimConfigFormBanner: this.claimConfigBannerFileUrl,
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
    this.updateClaimConfig(partnerData);
  }

  getClaimConfig() {

    this.claimConfigService.get(1).subscribe((res) => {
      if (res) {
        this.claimConfigForm.controls['claimConfigFormHeader'].setValue(res.claimConfigFormHeader);
        this.claimConfigBannerFileName = res.claimConfigFormBanner ? 'Existed' : 'Null';
        this.editorContent = res.claimConfigFormBody;
        this.claimConfigBannerFileUrl = res.claimConfigFormBanner;
      }
      console.log(res);
    })
  }
  updateClaimConfig(data) {

    this.claimConfigService.update(1, data).subscribe((res) => {
      if (res && res.status) {
        const message = `Claim Config successfully has been updated.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        this.getClaimConfig();
      }
      console.log(res);
    })
  }
  onUploadClaimConfigBanner(event) {
    this.claimConfigBannerFile = event.target.files[0];
    this.claimConfigBannerFileName = event.target.files[0].name;
    console.log(event.target.files);
    this.upploadFileToFireBase(this.claimConfigBannerFile, 'Claim Config Banner');
    setTimeout(() => {
      console.log(this.claimConfigBannerFileUrl);
    }, 5000);
  }

  upploadFileToFireBase(file, name) {
    this.viewLoading = true; 
    // If update Avatar
    const filePath = `Admin/${name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Admin/${name}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.claimConfigBannerFileUrl = url
              this.viewLoading = false;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', url);
        }
      });
  }

}
