import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminAddcusService } from './admin-addcus.service';

@Component({
  selector: 'app-admin-addcustomers',
  templateUrl: './admin-addcustomers.component.html',
  styleUrls: ['./admin-addcustomers.component.css']
})
export class AdminAddcustomersComponent implements OnInit {

  categoriess: any;
  listCustomers: any;
  item: any;
  supId: any;
  createCustomers: any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  massage = '';

  fileInfos?: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminaddcusService: AdminAddcusService,
  ) { }

  submitted = false;
  customersRegisForm = this.fb.group({
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
  })

  ngOnInit(): void {
    // const supId = sessionStorage.getItem('user_id');
    // this.fetchDataProduct(supId);

    //เพิ่มสินค้าลงร้าน
    // this.productRegisForm.patchValue({ supId: supId });

    //load dropdown all
    this.adminaddcusService.getAllCategories().subscribe(res => { this.categoriess = res; });
  }

  
  onSubmit() {
    console.log(this.customersRegisForm.value);
    
     // this.ngOnInit();
     this.submitted = true;
    this.progress = 0;
    if (this.customersRegisForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {

          // this.currentFile = file;
          this.adminaddcusService.createCustomers(this.customersRegisForm.value).subscribe(res => {
            console.log('Create Product res : ', res)
            // this.adminAddproductService.upload
                Swal.fire({
                  icon: 'success',
                  title: 'เพิ่มสินค้าสำเร็จ',
                  text: '',
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload()

                  }
                  // return;
                });
          
                this.progress = 0;
                this.massage = 'Could not upload the file!';
          });

       
    }

  }

  deleteproduct() {
    Swal.fire({
      title: 'ต้องการลบข้อมูล?',
      text: "ลบข้อมูลสินค้า : ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ'
    })
  }
  get product() { return this.customersRegisForm.controls; }

}
