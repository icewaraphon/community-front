import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomersEditService } from './customers-edit.service';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.css']
})
export class CustomersEditComponent implements OnInit {
  districts: any;
  amphurs: any;
  provinces: any;

  formValue !: FormGroup;
  listCustomers !: any;
  item: any
  ctmId: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private customersEditService: CustomersEditService
  ) { }

  submitted = false;

  datacustomersForm = this.fb.group({
    ctmId: [0],
    usName: [''],
    password: [''],
    titleType: [''],
    cardId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    birthDate: [''],
    telPhon: ['', Validators.required],
    email: ['', Validators.required],
    addrass: ['', Validators.required],
    cateInteres: [''],
    zipCode: ['', Validators.required],
    roleId: ['1'],
    
    distId: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinput: [''],
    amphurinput: [''],
    provinceinput: [''],
  });

  ngOnInit(): void {
     //load dropdown all
     this.initDropdown();
     // this.initAdminDataforEditById(this.ctmId);
     const ctmId = sessionStorage.getItem('user_id');
     debugger
     this.getCustomersByCtmId(ctmId);
     this.datacustomersForm.controls['distId'].disable();
  }

  
  initDropdown() {
    
    // this.customerEditService.getAllDistrict().subscribe(res => { this.districts = res; });

    this.customersEditService.getAllAmphur().subscribe(res => { this.amphurs = res; });
    this.customersEditService.getAllProvince().subscribe(res => { this.provinces = res; })
  }
  getCustomersByCtmId(ctmId: any) {
    this.customersEditService.getCustomersByCtmId(ctmId).subscribe((res) => {
      this.customersEditService.getDistrictByZipCode1(res.zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.datacustomersForm.patchValue({

        ctmId: res.ctmId,
        usName: res.usName,
        password: res.password,
        titleType: res.titleType,
        cardId: res.cardId,
        firstName: res.firstName,
        lastName: res.lastName,
        gender: res.gender,
        birthDate: res.birthDate,
        telPhon: res.telPhon,
        email: res.email,
        addrass: res.addrass,
        cateInteres: res.cateInteres,
        zipCode: res.zipCode,
        roleId: res.roleId,
        // distId: res.distId,
        // amphur: res.amphur,
        // province: res.province,
        districtinput: res.district,
        amphurinput: res.amphur,
        provinceinput: res.province,
      });

      //set default select dropdown
      this.loadUserDistId(res.distId);
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  
  }
  loadUserDistId(distId: any) {
    console.log('zipCode' + distId)
    this.datacustomersForm.controls['distId'].enable();
    this.customersEditService.getDistrictById(distId).subscribe(
      res => {
        if (res) {
          this.datacustomersForm.patchValue(
            {
              distId: res.distId,
              amphur: res.amphur.ampNameTh,
              province: res.province.pvNameTh,
              
              districtinput: res.distNameTh,
              amphurinput: res.amphur.ampNameTh,
              provinceinput: res.province.pvNameTh,
            }
          )
        }
      },
      error => {
        this.datacustomersForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }
  onSubmitTel() {
    this.submitted = true;
    console.log('data :', this.datacustomersForm.value)
    // stop here if form is invalid
    if (this.datacustomersForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขเบอร์โทรศัพท์สำเร็จ',
        text: '',
      }).then((result) => {
        if (result.isConfirmed) {
          this.customersEditService.updateCustomers(this.datacustomersForm.value).subscribe(res => {
            console.log('Create User res : ', res)
            window.location.reload()
          }
          )
        }
      })
    }
  }
  onSubmitemail() {
    this.submitted = true;
    console.log('data :', this.datacustomersForm.value)
    // stop here if form is invalid
    if (this.datacustomersForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'แก้ไข E-mail สำเร็จ',
        text: '',
      }).then((result) => {
        if (result.isConfirmed) {
          this.customersEditService.updateCustomers(this.datacustomersForm.value).subscribe(res => {
            console.log('Create User res : ', res)
            window.location.reload()
          }
          )
        }
      })
    }
  }
  onSubmitpass() {
    this.submitted = true;
    console.log('data :', this.datacustomersForm.value)
    // stop here if form is invalid
    if (this.datacustomersForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขรหัสผ่านสำเร็จ',
        text: '',
      }).then((result) => {
        if (result.isConfirmed) {
          this.customersEditService.updateCustomers(this.datacustomersForm.value).subscribe(res => {
            console.log('Create User res : ', res)
            window.location.reload()
          }
          )
        }
      })
    }
  }
  
  onSubmitaddress() {
    this.submitted = true;
    console.log('data :', this.datacustomersForm.value)
    // stop here if form is invalid
    if (this.datacustomersForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขที่อยู่สำเร็จ',
        text: '',
      }).then((result) => {
        if (result.isConfirmed) {
          this.customersEditService.updateCustomers(this.datacustomersForm.value).subscribe(res => {
            console.log('Create User res : ', res)
            window.location.reload()
          }
          )
        }
      })
    }
  }
  changeUserZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.customersEditService.getDistrictByZipCode1(zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
    this.customersEditService.getDistrictByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.datacustomersForm.patchValue(
            {
              // district: res.distNameTh,
              amphur: res.amphur.ampNameTh,
              province: res.province.pvNameTh
            }
          )
        }
      },
      error => {
        this.datacustomersForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }
  changeUserConfirmPassword(event: any) {
    debugger
    const pass = this.datacustomersForm.controls['password'].value;
    const confirmPassword = event.target.value;
    if (pass.localeCompare(confirmPassword) != 0) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกยืนยันรหัสผ่านให้ถูกต้อง!',
      })
      return;
    }
  }
  
  refresh() {
    window.location.reload();
  }
  // gotonewpassword(){
  //   Swal.fire({
  //     title: 'เปลี่ยนรหัสผ่านใหม่',
  //     input: 'text',
  //     inputAttributes: {
  //       autocapitalize: 'off'
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: 'ยืนยัน',
  //     cancelButtonText : 'ยกเลิก',
  //     showLoaderOnConfirm: true,
  //     preConfirm: (login) => {
  //       return fetch(`//api.github.com/users/${login}`)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error(response.statusText)
  //           }
  //           return response.json()
  //         })
  //         .catch(error => {
  //           Swal.showValidationMessage(
  //             `Request failed: ${error}`
  //           )
  //         })
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: `${result.value.login}'s avatar`,
  //         imageUrl: result.value.avatar_url
  //       })
  //     }
  //   })
  // }

  get datacustomerf() { return this.datacustomersForm.controls; }




}
