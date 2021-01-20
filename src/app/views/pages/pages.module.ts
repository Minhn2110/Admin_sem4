// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';
import { MyPageComponent } from './my-page/my-page.component';
import { DepartmentModule } from './apps/department/department.module';
import { EmployeeModule } from './apps/employee/employee.module';
import { PartnerModule } from './apps/partner/partner.module';
import { ProductModule } from './apps/product/product.module';
import { TransanctionHistoryModule } from './apps/transaction-history/transaction-history.module';
import { ContractModule } from './apps/contract/contract.module';

import { CustomerModule } from './apps/customer/customer.module';
import { CarModule } from './apps/car/car.module';
import { AboutUsPageComponent } from './Others/about-us-page/about-us-page.component';
import { ClaimModule } from './apps/claim/claim.module';



@NgModule({
	declarations: [MyPageComponent, AboutUsPageComponent], 
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MailModule,
		DepartmentModule, 
		EmployeeModule,
		PartnerModule, 
		ProductModule,
		TransanctionHistoryModule,
		ContractModule,
		CustomerModule,
		CarModule,
		ClaimModule
	],
	providers: []
})
export class PagesModule {
}
