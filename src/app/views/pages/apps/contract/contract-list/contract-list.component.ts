import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../../../../core/auth/_services';


@Component({
  selector: 'kt-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  constructor(
    private service: ContractService
  ) { }

  ngOnInit() {
    this.service.list('', 1, 5, 'desc').subscribe((res) => {
      console.log('res', res);
      // if (res && res.data.length > 0 ) {
      //   const data = res.data;
      //   this.dataSource = new MatTableDataSource(res.data);
      //   this.dataSource.paginator = this.paginator;
      //   this.length = res.data.length;
      //   this.loading$ = false;
      // } 
    })
  }

}
