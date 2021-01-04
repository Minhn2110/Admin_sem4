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
import { UserManagementModule } from './user-management/user-management.module';
import { MyPageComponent } from './my-page/my-page.component';
import { DepartmentModule } from './apps/department/department.module';
import { EmployeeModule } from './apps/employee/employee.module';
import { PartnerModule } from './apps/partner/partner.module';
import { ProductModule } from './apps/product/product.module';

@NgModule({
	declarations: [MyPageComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MailModule,
		UserManagementModule,
		DepartmentModule,
		EmployeeModule,
		PartnerModule,
		ProductModule
	],
	providers: []
})
export class PagesModule {
}
