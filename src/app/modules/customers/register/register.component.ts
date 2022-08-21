import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  districts: any;
  amphurs: any;
  provinces: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {}

  submitted = false;

  customersRegisterForm = this.fb.group({
    ctmId: [0],
    usName: ['', Validators.required],
    password: ['', Validators.required],
    titleType: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: [''],
    birthDate: [''],
    telPhone: [''],
    eMail: [''],
    address: [''],
    cateInteres: [''],
    ctmStatus: [''],
    zipCode: [''],
    remark: [''],

    roldId: [''],
    distId: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },]
  });

  ngOnInit(): void {
    //load dropdown all
    this.customersRegisterForm.controls['distId'].disable();
    //this.registerService.getAllDistrict().subscribe(res => { this.districts = res; console.log('data :', res)});
    this.registerService.getAllAmphur().subscribe((res) => {
      this.amphurs = res;
    });
    this.registerService.getAllProvince().subscribe((res) => {
      this.provinces = res;
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log('data :', this.customersRegisterForm.value);
    // stop here if form is invalid
    if (this.customersRegisterForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      });
      return;
    } else {
      this.registerService
        .saveCustomers(this.customersRegisterForm.value)
        .subscribe((res) => {
          console.log('Create Sser res :', res);
          Swal.fire({
            icon: 'success',
            title: 'สมัครสมาชิกสำเร็จ',
            text: '',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['login']);
            }
          });
          return;
        });
    }
  }

  changeUserZipcode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode);
    this.customersRegisterForm.controls['distId'].enable();
    this.registerService.getDistrictByZipCode1(zipCode).subscribe((res) => {
      this.districts = res;
      console.log('data :', res);
    });
    this.registerService.getDistricByZipCode(zipCode).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.customersRegisterForm.patchValue({
            // district: res.distNameTh,
            amphur: res.amphur.ampNameTh,
            province: res.province.pvNameTh,
          });
        }
      },
      (error) => {
        this.customersRegisterForm.patchValue({
          district: '',
          amphur: '',
          province: '',
        });
      }
    );
  }

  // changeUserZipCode(event: any) {
  //   const zipCode = event.target.value;
  //   console.log('zipCode' + zipCode);
  //   this.customerRegisForm.controls['distId'].enable();
  //   this.registerService.getDistrictByZipCode1(zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
  //   this.registerService.getDistrictByZipCode(zipCode).subscribe(
  //     res => {
  //       console.log(res)
  //       if (res) {
  //         this.customerRegisForm.patchValue(
  //           {
  //            // district: res.distNameTh,
  //             amphur: res.amphur.ampNameTh,
  //             province: res.province.pvNameTh
  //           }
  //         )
  //       }
  //     },
  //     error => {
  //       this.customerRegisForm.patchValue(
  //         {
  //           district: '',
  //           amphur: '',
  //           province: ''
  //         }
  //       )
  //     }
  //   );

  // }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.registerService.getAllCustomers().subscribe(
      (res) => {
        console.log(res);
        this.customersRegisterForm = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeUserConfirmPassword(event: any) {
    debugger;
    const pass = this.customersRegisterForm.controls['password'].value;
    const confirmPassword = event.target.value;
    if (pass != confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกยืนยันรหัสผ่านให้ถูกต้อง',
      });
      return;
    }
  }
  get customersf() {
    return this.customersRegisterForm.controls;
  }
}
