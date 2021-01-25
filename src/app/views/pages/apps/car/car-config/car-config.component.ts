import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CarService } from '../../../../../core/auth/_services';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

@Component({
  selector: 'kt-car-config',
  templateUrl: './car-config.component.html',
  styleUrls: ['./car-config.component.scss']
})
export class CarConfigComponent implements OnInit {


  selectedTab = 0;
  carConfigHeaderContent: string;
  carConfigBodyContent: string;

  downloadURL: Observable<string>;

  carConfigBannerFileName: string;

  carConfigBannerFile: File;

  carConfigBannerFileUrl: any;
  viewLoading = false; 


  // loadingSubject = new BehaviorSubject<boolean>(true);
	// loading$: Observable<boolean>;


  constructor(
    private carService: CarService,
    private storage: AngularFireStorage,
    private layoutUtilsService: LayoutUtilsService,

  ) { }

  ngOnInit() {
    // this.loading$ = this.loadingSubject.asObservable();
		// this.loadingSubject.next(true);
    // this.getClaimConfig();
    this.getCarConfig();
  }

  getCarConfig() {
    this.carService.getCarConfig().subscribe((res) => {
      console.log(res);
      if (res) {
        this.carConfigBannerFileUrl = res.carConfigBannerFile;
        this.carConfigHeaderContent = res.carConfigHeaderContent;
        this.carConfigBodyContent = res.carConfigBodyContent;
      }
    })
  }



  getComponentTitle() {
    let result = 'Car Insurance Config';
    return result;
  }

  prepareData(): any {
    const data = {
      carConfigBannerFile: this.carConfigBannerFileUrl,
      carConfigHeaderContent: this.carConfigHeaderContent,
      carConfigBodyContent: this.carConfigBodyContent
    }
    return data;
  }

  onSumbit() {

    const partnerData = this.prepareData();
    this.updateClaimConfig(partnerData);
  }

  updateClaimConfig(data) {

    this.carService.updateCarConfig(data).subscribe((res) => {
      if (res && res.status) {
        const message = `Car Config successfully has been updated.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
        this.getCarConfig();
      }
      console.log(res);
    })
  }
  onUploadClaimConfigBanner(event) {
    this.carConfigBannerFile = event.target.files[0];
    this.carConfigBannerFileName = event.target.files[0].name;
    console.log(event.target.files);
    this.upploadFileToFireBase(this.carConfigBannerFile, 'Car Config Banner');
    setTimeout(() => {
      console.log(this.carConfigBannerFileUrl);
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
              this.carConfigBannerFileUrl = url
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
