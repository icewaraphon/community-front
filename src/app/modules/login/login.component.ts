import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    typeLogin: ['', Validators.required],
    
  });



  ngOnInit(): void {

  }

  onSubmit(){
    if (this.loginForm.value.typeLogin =='1') {
       this.router.navigate(['home']).then(()=> {
        window.location.reload()
       }) //ยิงไป customer

    } else   if (this.loginForm.value.typeLogin =='2') {

      this.loginService.loginSupplier(this.loginForm.value).subscribe(res => {
        console.log('=====>',  res) 
        if (res ) {
          this.router.navigate(['adminpage']).then(() =>{

          })
        }
        
        
      })
  
    }
   
    
  }
}

