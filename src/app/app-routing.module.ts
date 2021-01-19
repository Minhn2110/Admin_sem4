// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)},

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'mail',
				loadChildren: () => import('app/views/pages/apps/mail/mail.module').then(m => m.MailModule)
			},
			{
				path: 'department',
				loadChildren: () => import('app/views/pages/apps/department/department.module').then(m => m.DepartmentModule),
			},
			{
				path: 'employee',
				loadChildren: () => import('app/views/pages/apps/employee/employee.module').then(m => m.EmployeeModule),
			},
			{
				path: 'ngbootstrap',
				loadChildren: () => import('app/views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
			},
			{
				path: 'material',
				loadChildren: () => import('app/views/pages/material/material.module').then(m => m.MaterialModule)
			},
			{
				path: 'partner',
				loadChildren: () => import('app/views/pages/apps/partner/partner.module').then(m => m.PartnerModule)
			},
			{
				path: 'product',
				loadChildren: () => import('app/views/pages/apps/product/product.module').then(m => m.ProductModule)
			},
			{
				path: 'transaction-history',
				loadChildren: () => import('app/views/pages/apps/transaction-history/transaction-history.module').then(m => m.TransanctionHistoryModule)
			}, 
			{ 
				path: 'contract',
				loadChildren: () => import('app/views/pages/apps/contract/contract.module').then(m => m.ContractModule)
			}, 
			{ 
				path: 'customer',
				loadChildren: () => import('app/views/pages/apps/customer/customer.module').then(m => m.CustomerModule)
			}, 
			{ 
				path: 'car',
				loadChildren: () => import('app/views/pages/apps/car/car.module').then(m => m.CarModule)
			}, 
			// {
			// 	path: 'builder',
			// 	loadChildren: () => import('app/views/theme/content/builder/builder.module').then(m => m.BuilderModule)
			// },
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
