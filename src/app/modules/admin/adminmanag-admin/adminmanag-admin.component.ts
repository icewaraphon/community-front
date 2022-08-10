import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminmanagService } from './adminmanag.service';

@Component({
  selector: 'app-adminmanag-admin',
  templateUrl: './adminmanag-admin.component.html',
  styleUrls: ['./adminmanag-admin.component.css']
})
export class AdminmanagAdminComponent implements OnInit {
  districts: any;
  amphurs: any;
  provinces: any;

  searchText: any;
  listCustomers : any;
  item: any
  ctmId: any
  
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminmanagService: AdminmanagService
  ) { }

  submitted = false;

  // post
  adminmanagForm = this.fb.group({
    ctmId: [0],
    usName: ['', Validators.required],
    password: ['', Validators.required],
    titleType: ['', Validators.required],
    cardId: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    birthDate: ['', Validators.required],
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

  
  editadminmanagForm = this.fb.group({
    ctmId: [''],
    usName: [''],
    password: [''],
    titleType: ['', Validators.required],
    cardId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    birthDate: ['', Validators.required],
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
    this.ctmId = sessionStorage.getItem('user_id');
    this.fetchData();
    this.initDropdown();
    this.initAdminDataforEditById(this.ctmId);
    this.editadminmanagForm.controls['distId'].disable();
  }

  initDropdown() {
    this.editadminmanagForm.controls['distId'].enable();
    // this.adminmanagService.getAllDistrict().subscribe(res => { this.districts = res; });
    this.adminmanagService.getAllAmphur().subscribe(res => { this.amphurs = res; });
    this.adminmanagService.getAllProvince().subscribe(res => { this.provinces = res; })
  }

  initAdminDataforEditById(ctmId: any) {
    this.adminmanagService.updateDataadmin(ctmId).subscribe((res) => {
      this.adminmanagService.getDistrictByZipCode1(res.zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.editadminmanagForm.patchValue({
        ctmId: res.ctmId,
        // usName: res.usName,
        // password: res.password,
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
      this.loadUserZipCode(res.distId);
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

  loadUserZipCode(distId: any) {
    console.log('zipCode' + distId)
    this.editadminmanagForm.controls['distId'].enable();
    this.adminmanagService.getDistrictById(distId).subscribe(
      res => {
        if (res) {
          this.editadminmanagForm.patchValue(
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
        this.editadminmanagForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    console.log('data :', this.adminmanagForm.value)
    // stop here if form is invalid
    if (this.adminmanagForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'เพิ่มข้อมูลสำเร็จ',
        text: '',
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminmanagService.createCustomers(this.adminmanagForm.value).subscribe(res => {
            console.log('Create User res : ', res)
            window.location.reload()
          }
          )
        }
      })
    }
  }

  onSubmitedit() {
    this.submitted = true;
    console.log('data :', this.editadminmanagForm.value)
    // stop here if form is invalid
    if (this.editadminmanagForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
        text: '',
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminmanagService.updateDataadmin(this.editadminmanagForm.value).subscribe(res => {
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
    this.adminmanagForm.controls['distId'].enable();
    this.adminmanagService.getDistrictByZipCode1(zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
    this.adminmanagService.getDistrictByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.adminmanagForm.patchValue(
            {
              // district: res.distNameTh,
              amphur: res.amphur.ampNameTh,
              province: res.province.pvNameTh
            }
          )
        }
      },
      error => {
        this.adminmanagForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }

  changeUsereditZipCode(event: any) {
    const zipCode = event.target.value;
    console.log('zipCode' + zipCode)
    this.editadminmanagForm.controls['distId'].enable();
    this.adminmanagService.getDistrictByZipCode1(zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
    this.adminmanagService.getDistrictByZipCode(zipCode).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.editadminmanagForm.patchValue(
            {
              // district: res.distNameTh,
              amphur: res.amphur.ampNameTh,
              province: res.province.pvNameTh
            }
          )
        }
      },
      error => {
        this.editadminmanagForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }

  refresh() {
    this.fetchData();
    window.location.reload();
  }

  fetchData() {
    this.adminmanagService.getCustomersByRole(1).subscribe(
      (res) => {
        console.log(res)
        this.listCustomers = res.filter((a: any) => {
          if (a.ctmId != this.ctmId) {
            return a;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  changeUserConfirmPassword(event: any) {
    debugger
    const pass = this.adminmanagForm.controls['password'].value;
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

  delete(item: any) {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ลบข้อมูลผู้ดูแลระบบ : " + item.ctmId,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminmanagService.deleteCustomersByCtmId(item.ctmId).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('เรียบร้อย!', 'คุณได้ทำการลบข้อมูลเรียบร้อย', 'success');
            setTimeout(function () { window.location.reload(); }, 2 * 1000);
          },
          (error) => {
            console.log('delete admin error : ', error);
          }
        );
      }
    })

  }
  pageChanged(event: any) {
    this.page = event;
    this.fetchData();
  }

    // โค้ดจัดเรียง
    key: string = 'ctmId';
    reverse: boolean = false;
    sort(key: string) {
      this.key = key;
      this.reverse = !this.reverse;
    }

    
  selectadmin(item: any) {
    debugger
    this.adminmanagForm.controls['cardId'].patchValue(item.cardId);
    this.adminmanagForm.controls['titleType'].patchValue(item.titleType);
    this.adminmanagForm.controls['firstName'].patchValue(item.firstName);
    this.adminmanagForm.controls['lastName'].patchValue(item.lastName);
    this.adminmanagForm.controls['gender'].patchValue(item.gender);
    this.adminmanagForm.controls['birthDate'].patchValue(item.birthDate);
    this.adminmanagForm.controls['telPhon'].patchValue(item.telPhon);
    this.adminmanagForm.controls['eMail'].patchValue(item.eMail);
    this.adminmanagForm.controls['addrass'].patchValue(item.addrass);
    this.adminmanagForm.controls['zipCode'].patchValue(item.zipCode);
    this.adminmanagForm.controls['district'].patchValue(item.district);
    this.adminmanagForm.controls['amphur'].patchValue(item.amphur);
    this.adminmanagForm.controls['province'].patchValue(item.province);
  }

  get customerf() { return this.adminmanagForm.controls; }
  get editcustomerf() { return this.editadminmanagForm.controls; }

    


}
