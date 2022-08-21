import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminAddproductService } from '../admin-addproduct/admin-addproduct.service';
import { AdminCustomersService } from './admin-customers.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  districts: any;
  amphurs: any;
  provinces: any;

  searchText: any;
  formValue !: FormGroup;
  listCustomers !: any;

  item: any
  ctmId: any

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  formModaleditcustomers: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminCustomersService: AdminCustomersService
  ) { }
   submitted = false;
   customersForm = this.fb.group({

    ctmId: ['', Validators.required],
	  usName: [''],
	  password: [''],
	  titleType: [''],
	  firstName: ['', Validators.required],
	  lastName: [''],
	  gender: [''],
	  birthDate: [''],
	  telPhone: [''],
	  eMail: [''],
	  address: [''],
	  cateInteres: [''],
	  ctmStatus: [''],
	  zipCode: [''],
	  remark: [''],
	  distId: [''],
	  roldId: [''],
    district: [''],
    amphur: [''],
    province:[''],
   });

   editcustomersForm = this.fb.group( {
    ctmId: ['', Validators.required],
	  usName: [''],
	  password: [''],
	  titleType: [''],
	  firstName: ['', Validators.required],
	  lastName: [''],
	  gender: [''],
	  birthDate: [''],
	  telPhone: [''],
	  eMail: [''],
	  address: [''],
	  cateInteres: [''],
	  ctmStatus: [''],
	  zipCode: [''],
	  remark: [''],
	  distId: [''],
	  roldId: [''],
    district: [''],
    amphur: [''],
    province:[''],

  });


  ngOnInit(): void {
    
    const ctmId = sessionStorage.getItem('user_id');
    // this.fetchData();
    this.initDropdown();
     // this.initAdminDataforById(this.ctmId);
     this.ctmId = this.activatedroute.snapshot.paramMap.get("ctmId");

    this.adminCustomersService.getCustomersByRole(1).subscribe(res => {
      this.listCustomers= res
      console.log(res);
      
    })
  }
  initDropdown() {
    // this.adminCustomersService.getAllDistrict().subscribe(res => { this.districts = res; });
    // this.adminCustomersService.getAllAmphur().subscribe(res => { this.amphurs = res; });
    // this.adminCustomersService.getAllProvince().subscribe(res => { this.provinces = res; })
  }
  // getCustomersByCtmId(ctmId: any) {
  //   this.adminCustomersService.getCustomersByCtmId(ctmId).subscribe((res) => {
  //     console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
  //     this.customersForm.patchValue({
  //       ctmId: res.ctmId,
  //       usName: res.usName,
  //       password: res.password,
  //       titleType: res.titleType,
  //       cardId: res.cardId,
  //       firstName: res.firstName,
  //       lastName: res.lastName,
  //       gender: res.gender,
  //       birthDate: res.birthDate,
  //       telPhon: res.telPhon,
  //       eMail: res.eMail,
  //       addrass: res.addrass,
  //       cateInteres: res.cateInteres,
  //       zipCode: res.zipCode,
  //       roleId: res.roleId,
  //       district: res.district,
  //       amphur: res.amphur,
  //       province: res.province,
  //     });

  //     //set default select dropdown
  //     this.loadUserZipCode(res.zipCode);
  //   },
  //     (error) => {
  //       console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
  //     }
  //   );
  // }

  // loadUserZipCode(zipCode: any) {
  //   console.log('zipCode' + zipCode)
  //   this.adminCustomersService.getDistrictByZipCode(zipCode).subscribe(
  //     res => {
  //       if (res) {
  //         this.customersForm.patchValue(
  //           {
  //             district: res.distNameTh,
  //             amphur: res.amphur.ampNameTh,
  //             province: res.province.pvNameTh
  //           }
  //         )
  //       }
  //     },
  //     error => {
  //       this.customersForm.patchValue(
  //         {
  //           district: '',
  //           amphur: '',
  //           province: ''
  //         }
  //       )
  //     }
  //   );
  // }
  
  // changeUserZipCode(event: any) {
  //   const zipCode = event.target.value;
  //   console.log('zipCode' + zipCode)
  //   this.adminManagectmService.getDistrictByZipCode(zipCode).subscribe(
  //     res => {
  //       console.log(res)
  //       if (res) {
  //         this.ctmmanagForm.patchValue(
  //           {
  //             district: res.distNameTh,
  //             amphur: res.amphur.ampNameTh,
  //             province: res.province.pvNameTh
  //           }
  //         )
  //       }
  //     },
  //     error => {
  //       this.ctmmanagForm.patchValue(
  //         {
  //           district: '',
  //           amphur: '',
  //           province: ''
  //         }
  //       )
  //     }
  //   );
  // }

  initproducteditDataforById(res: any,) {
    this.formModaleditcustomers.show();
    console.log('!!!!!!!!! res data!!!!!!!!!!',res)
    this.editcustomersForm.patchValue({
      ctmId: res.ctmId,
      usName: res.usName,
      password: res.password,
      titleType: res.titleType,
      firstName: res.firstName,
      lastName: res.lastName,
      gender: res.gender,
      birthDate: res.birthDate,
      telPhone: res.telPhone,
      eMail: res.eMail,
      address: res.address,
      cateInteres: res.cateInteres,
      ctmStatus: res.ctmStatus,
      zipCode: res.zipCode,
      remark: res.remark,
      distId: res.distId,
      roldId: res.roldId,
      district: res.distId,
      amphur: res.amphur,
      province: res.province,

    })
  }

  selectctm(item: any) {
    debugger
    this.customersForm.controls['titleType'].patchValue(item.titleType);
    this.customersForm.controls['firstName'].patchValue(item.firstName);
    this.customersForm.controls['lastName'].patchValue(item.lastName);
    this.customersForm.controls['gender'].patchValue(item.gender);
    this.customersForm.controls['birthDate'].patchValue(item.birthDate);
    this.customersForm.controls['telPhon'].patchValue(item.telPhon);
    this.customersForm.controls['email'].patchValue(item.email);
    this.customersForm.controls['cateInteres'].patchValue(item.cateInteres);
    this.customersForm.controls['addrass'].patchValue(item.addrass);
    this.customersForm.controls['zipCode'].patchValue(item.zipCode);
    this.customersForm.controls['district'].patchValue(item.district);
    this.customersForm.controls['amphur'].patchValue(item.amphur);
    this.customersForm.controls['province'].patchValue(item.province);
    // this.loadUserZipCode(item.zipCode);
  }
  
  refresh() {
    this.fetchData();
    window.location.reload();
  }

  deletecustomers(item: any) {
    Swal.fire({
      title: 'ต้องการลบลูกค้า?',
      text: "ลบข้อมูลลูกค้า : " + item.proId,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminCustomersService.deleteCustomersByCtmId(item.proId).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('เรียบร้อย!', 'คุณได้ทำการลบข้อมูลลูกค้าค้าเรียบร้อย', 'success');
            setTimeout(function () { window.location.reload(); }, 2 * 1000);
          },
          (error) => {
            console.log('delete Product error : ', error);
          }
        );
      }
    })

  }

  fetchData() {
    // this.adminCustomersService.getCustomersByRole(3).subscribe(
    //   (res) => {
    //     console.log(res)
    //     this.listCustomers = res;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  pageChanged(event: any) {
    this.page = event;
    // this.fetchData();
  }

  onSubmit() {
    this.submitted = true;
    console.log('data :', this.editcustomersForm.value)
    // stop here if form is invalid
    if (this.editcustomersForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    }else {
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขข้อมูลสินค้าสำเร็จ',
        text: '',
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminCustomersService.updateCustomers(this.editcustomersForm.value).subscribe(res => {
            console.log('Create User res : ', res)
            window.location.reload()
          }
          )
        }
      })
    }
  }

  get customerf() { return this.customersForm.controls; }









}
