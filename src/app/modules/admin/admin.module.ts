import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminEditproductComponent } from './admin-editproduct/admin-editproduct.component';
import { AdminAddproductComponent } from './admin-addproduct/admin-addproduct.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { AdminOrdercheckComponent } from './admin-ordercheck/admin-ordercheck.component';
import { AdminmanagAdminComponent } from './adminmanag-admin/adminmanag-admin.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminAddcustomersComponent } from './admin-addcustomers/admin-addcustomers.component';
import { AdminEditcusComponent } from './admin-editcus/admin-editcus.component';



@NgModule({
  declarations: [

    AdminProductComponent,
    AdminEditproductComponent,
    AdminAddproductComponent,
    AdminCustomersComponent,

    AdminPageComponent,
    AdminOrderComponent,
    AdminPaymentComponent,
    AdminOrdercheckComponent,
    AdminmanagAdminComponent,
    AdminReportComponent,
    AdminAddcustomersComponent,
    AdminEditcusComponent,
   
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbModule
    


    // CommonModule,
    // TraderRoutingModule,
    // NgxPaginationModule,
    // ReactiveFormsModule,
    // Ng2OrderModule,
    // Ng2SearchPipeModule,
    // FormsModule,
    // ShowHidePasswordModule
   
  ]
})
export class AdminModule { }
