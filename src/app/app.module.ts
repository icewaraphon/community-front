import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
// import { RegisterComponent } from './modules/customers/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RegisterComponent } from './modules/customers/register/register.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { CustomersComponent } from './modules/customers/customers.component';
import { LoginService } from './modules/login/login.service';
import { AdminPageComponent } from './modules/admin/admin-page/admin-page.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent,
  
    // AdminEditproductComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbModule
    
    
 
    
    
    
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
