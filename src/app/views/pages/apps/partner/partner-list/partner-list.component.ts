import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from '../../../../../core/auth/_services';

@Component({
  selector: 'kt-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

  constructor(private partnerService: PartnerService,
    private activatedRoute: ActivatedRoute,
		private router: Router,) { }

  dataSource: DataSource<any>;
  displayedColumns = ['id', 'name', 'email',  'status', 'actions'];
  length: number;
  loading$:boolean;


  ngOnInit() {
    this.loading$ = true;
    this.partnerService.list().subscribe((res) => {
      console.log('res', res);
      if (res && res.data.length > 0 ) {
        const data = res.data;
        this.dataSource = res.data;
        this.length = res.data.length;
        this.loading$ = false;
      } 

    })


  }

  getItemCssClassByStatus(status: boolean): string {
		switch (status) {
			case true:
				return 'success';
			case false:
				return 'metal';
		}
		return '';
	}
  editPartner(id) {
		this.router.navigate(['../list/edit', id], { relativeTo: this.activatedRoute });
  }

  deletePartner(id) {
		this.router.navigate(['../list/edit', id], { relativeTo: this.activatedRoute });

  }

}
