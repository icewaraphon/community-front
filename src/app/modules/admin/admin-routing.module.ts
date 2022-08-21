import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AdminAddcustomersComponent } from './admin-addcustomers/admin-addcustomers.component';
import { AdminAddproductComponent } from './admin-addproduct/admin-addproduct.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminEditproductComponent } from './admin-editproduct/admin-editproduct.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminOrdercheckComponent } from './admin-ordercheck/admin-ordercheck.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminComponent } from './admin.component';
import { AdminModule } from './admin.module';
import { AdminmanagAdminComponent } from './adminmanag-admin/adminmanag-admin.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: AdminOrderComponent },
  { path: 'adminpage', component: AdminPageComponent },
  { path: 'customers', component: AdminCustomersComponent },
  { path: 'product', component: AdminProductComponent },
  { path: 'addproduct', component: AdminAddproductComponent },
  { path: 'adminmanag', component: AdminmanagAdminComponent},
  { path: 'payment', component: AdminPaymentComponent},
  { path: 'ordercheck', component: AdminOrdercheckComponent},
  { path: 'report', component: AdminReportComponent},
  { path: 'addminaddcus', component: AdminAddcustomersComponent},
  

];
{  }

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
