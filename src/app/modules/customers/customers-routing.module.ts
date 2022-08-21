import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CustomersCategoryComponent } from './customers-category/customers-category.component';
import { CustomersEditComponent } from './customers-edit/customers-edit.component';
import { CustomersOrderComponent } from './customers-order/customers-order.component';
import { CustomersOrderbillComponent } from './customers-orderbill/customers-orderbill.component';
import { CustomersPagesupplierComponent } from './customers-pagesupplier/customers-pagesupplier.component';
import { CustomersProductComponent } from './customers-product/customers-product.component';
import { CustomersSearchComponent } from './customers-search/customers-search.component';
import { CustomersShoppingComponent } from './customers-shopping/customers-shopping.component';
// import { EditMemberComponent } from './edit-member/edit-member.component';
// import { MemberCusComponent } from './member-cus/member-cus.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customerscategory', component: CustomersCategoryComponent },
  { path: 'customersorderbill', component: CustomersOrderbillComponent },
  // { path: 'customersedit', component: CustomersEditComponent },
  { path: 'customersorder', component: CustomersOrderComponent },
  // { path: 'customerspagesupplier', component: CustomersPagesupplierComponent},
  // { path: 'customersproduct', component: CustomersProductComponent},
  // { path: 'customerssearch', component: CustomersSearchComponent},
  // { path: 'customersshopping', component: CustomersShoppingComponent },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
