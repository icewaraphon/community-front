import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersEditComponent } from './customers-edit/customers-edit.component';
import { CustomersOrderComponent } from './customers-order/customers-order.component';
import { CustomersShoppingComponent } from './customers-shopping/customers-shopping.component';
import { CustomersOrderbillComponent } from './customers-orderbill/customers-orderbill.component';
import { CustomersPagesupplierComponent } from './customers-pagesupplier/customers-pagesupplier.component';
import { CustomersCategoryComponent } from './customers-category/customers-category.component';
import { CustomersProductComponent } from './customers-product/customers-product.component';
import { CustomersSearchComponent } from './customers-search/customers-search.component';
// import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    RegisterComponent,
    CustomersEditComponent,
    CustomersOrderComponent,
    CustomersShoppingComponent,
    CustomersOrderbillComponent,
    CustomersPagesupplierComponent,
    CustomersCategoryComponent,
    CustomersProductComponent,
    CustomersSearchComponent,


  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CustomersModule { }
