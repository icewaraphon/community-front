import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AdminAddproductComponent } from './modules/admin/admin-addproduct/admin-addproduct.component';
import { AdminPageComponent } from './modules/admin/admin-page/admin-page.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminmanagAdminComponent } from './modules/admin/adminmanag-admin/adminmanag-admin.component';
import { CustomersEditComponent } from './modules/customers/customers-edit/customers-edit.component';
import { CustomersComponent } from './modules/customers/customers.component';
import { RegisterComponent } from './modules/customers/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';



const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'adminpage', component: AdminPageComponent},
  { path: 'adminmanag', component: AdminmanagAdminComponent},
  { path: 'customers/customers', component: CustomersEditComponent},

  // { path: 'addproduct', component: AdminAddproductComponent},
  // { path: 'customers', component: CustomersComponent},
  
// {
//    path: '',
//    redirectTo: '',
//    pathMatch: 'full'
//  },
//  { path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
///  { path: "customers", loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule) },
//  { path: "home", component: HomeComponent},
  
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN'
      }
    }
  },
  {
    path: 'customer', loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'CUSTOMER'
      }
    }
  },
  

  // {path: "admin/home", component:}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
