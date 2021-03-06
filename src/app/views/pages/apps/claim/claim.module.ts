
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// Services
import { HttpUtilsService, TypesUtilsService, InterceptService, LayoutUtilsService} from '../../../../core/_base/crud';
// Shared
import { ActionNotificationComponent, DeleteEntityDialogComponent, FetchEntityDialogComponent, UpdateStatusDialogComponent } from '../../../partials/content/crud';
import { MatButtonModule, MatMenuModule, MatSelectModule, MatInputModule, MatTableModule, MatAutocompleteModule, MatRadioModule, MatIconModule, MatNativeDateModule, MatProgressBarModule, MatDatepickerModule, MatCardModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule, MatTooltipModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDividerModule, MatDialogModule } from '@angular/material';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { PartialsModule } from '../../../partials/partials.module';
import { DepartmentEffects, departmentReducer } from '../../../../core/auth';

import { ClaimComponent } from './claim.component';
import { ClaimConfigComponent } from './claim-config/claim-config.component';
// import { ProductEditComponent } from './product-edit/product-edit.component';

import { MaterialPreviewModule } from '../../../partials/content/general/material-preview/material-preview.module';
import { QuillModule } from 'ngx-quill';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimInfoComponent } from './claim-info/claim-info.component';



const routes: Routes = [
  {
    path: '',
    component: ClaimComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'list', 
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ClaimListComponent
      },
      {
        path: 'config',
        component: ClaimConfigComponent
      },
    //   {
	// 			path: 'list:id',
	// 			component: ProductEditComponent
    //   },
    //   {
	// 			path: 'list/add',
	// 			component: ProductEditComponent
    //   },
    //   {
	// 			path: 'list/edit',
	// 			component: ProductEditComponent
	// 		},
    //   {
	// 			path: 'list/edit/:id',
	// 			component: ProductEditComponent
	// 		},
    ]
  }
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('department', departmentReducer),
    EffectsModule.forFeature([DepartmentEffects]),
    HttpClientModule,
    PartialsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    NgbProgressbarModule,
    MaterialPreviewModule,
    QuillModule,
    MatDialogModule,
    MatDividerModule
  ],
  declarations: [
      ClaimComponent,
      ClaimConfigComponent,
      ClaimListComponent,
      ClaimInfoComponent
  ],

  exports: [],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptService,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },
    TypesUtilsService,
    LayoutUtilsService,
    HttpUtilsService,
  ],
  entryComponents: [
    DeleteEntityDialogComponent,
    ActionNotificationComponent,
    ClaimInfoComponent
	],
})



export class ClaimModule { }