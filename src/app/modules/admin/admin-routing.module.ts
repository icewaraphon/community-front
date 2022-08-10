import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AdminAddproductComponent } from './admin-addproduct/admin-addproduct.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminEditproductComponent } from './admin-editproduct/admin-editproduct.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminModule } from './admin.module';


const routes: Routes = [
  { path: '', component: AdminPageComponent },
  //{ path: '', component: HomeComponent },
  { path: 'adminpage', component: AdminPageComponent },
  // { path: '', component: AdminPageComponent },
  { path: 'product', component: AdminProductComponent },
  { path: 'addproduct', component: AdminAddproductComponent },
  
  // { path: 'roles', component: ListRoleComponent},
  // { path: 'edit-role', component: EditRoleComponent},
  // { path: 'edit/editrole/:roleId', component: EditRoleComponent},
];
{  }

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
