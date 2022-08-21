import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenRequestDto } from '../admin/Admin-Model/AuthenRequestDto';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  submitted = false;
  

  loginForm = this.fb.group({
    username: ['0309', Validators.required],
    password: ['123456789', Validators.required],
    typeLogin: ['', Validators.required],
  });

  ngOnInit(): void {}

  // onSubmit(){
  //   if (this.loginForm.value.typeLogin =='1') {
  //      this.router.navigate(['home']).then(()=> {
  //       window.location.reload()
  //      }) //ยิงไป customer

  //   } else   if (this.loginForm.value.typeLogin =='2') {

  //     this.loginService.loginSupplier(this.loginForm.value).subscribe(res => {
  //       console.log('=====>',  res)
  //       if (res ) {
  //         this.router.navigate(['adminpage']).then(() =>{

  //         })
  //       }

  //     })

  //   }

  // }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    //call login
    console.log('log this.loginForm.value >>>:',this.loginForm.value);
    console.log('log typeLogin >>>:',this.loginForm.value.typeLogin);
    sessionStorage.setItem('user_role', this.getRole(this.loginForm.value.typeLogin));
    sessionStorage.setItem('user_id','2')
    
    // this.loginService.loginCustomers(this.loginForm.value).subscribe(
    //   (res) => {
    //     console.log('log data >>>::', res);

    //     sessionStorage.setItem('user_role', this.getRole(res.roleId));
    //     // sessionStorage.setItem('userName', res.custUsername );
    //   },
    //   (error) => {
    //     Swal.fire(
    //       'Login Fail! - No Data',
    //       'Username or Password Incorrect!',
    //       'question'
    //     );
    //   }
    // );
  }

  getRole(roleId: any) {
    let role = '';
    switch (roleId) {
      case '1':
        role = 'CUSTOMERS';
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
        break;
      case '2':
        role = 'ADMIN';
        this.router.navigate(['adminpage']).then(() => {
          window.location.reload();
        });
        break;
      default:
        Swal.fire('Login Fail! - Not', 'Role is Not Mapping in System!');
        break;
    }
    alert(role);
    return role;
  }

  get f() {
    return this.loginForm.controls;
  }
}
