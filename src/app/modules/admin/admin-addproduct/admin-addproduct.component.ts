import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminAddproductService } from './admin-addproduct.service';

@Component({
  selector: 'app-admin-addproduct',
  templateUrl: './admin-addproduct.component.html',
  styleUrls: ['./admin-addproduct.component.css']
})
export class AdminAddproductComponent implements OnInit {

  categoriess: any;
  listProduct: any;
  item: any;
  supId: any;
  createProduct: any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  massage = '';

  fileInfos?: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminAddproductService: AdminAddproductService,
  ) { }

  submitted = false;

  productRegisForm = this.fb.group({

    proId: ['', Validators.required],
	  proName: ['', Validators.required],
	  proImg: [''],
	  proPric: ['', Validators.required],
	  freight: [''],
	  proNumber: ['', Validators.required],
	  proUnit: ['', Validators.required],
	  proColor: ['', Validators.required],
	  proSize: ['', Validators.required],
	  proDetails: ['', Validators.required],
	  proStatus: [''],
	  supId: [''],
	  cateId: [{ value: ''},],
	  facturerId: [''],
     // cateId: ['', Validators.required],

    categories: {
      catePro: [''],
      proDetaols: [''],
    }
  });

  ngOnInit(): void {
    // const supId = sessionStorage.getItem('user_id');
    // this.fetchDataProduct(supId);

    //เพิ่มสินค้าลงร้าน
    // this.productRegisForm.patchValue({ supId: supId });

    //load dropdown all
    this.adminAddproductService.getAllCategories().subscribe(res => { this.categoriess = res; });
  }

  onSubmit() {
     // this.ngOnInit();
     this.submitted = true;
    this.progress = 0;
    if (this.productRegisForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
    } else {

          // this.currentFile = file;
          this.adminAddproductService.createProduct(this.productRegisForm.value).subscribe(res => {
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

  // onSubmit() {
  //   this.submitted = true;
  //   console.log('data :', this.customerRegisForm.value)
  //   // stop here if form is invalid
  //   if (this.customerRegisForm.invalid) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
  //       text: 'Something went wrong!',
  //     })
  //     return;
  //   } else {
  //     this.registerService.createCustomers(this.customerRegisForm.value).subscribe(res => {
  //       console.log('Create User res : ', res)
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'สมัครสมาชิกสำเร็จ',
  //         text: '',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           this.router.navigate(['login']);

  //         }
  //       })
  //       return;
  //     });
  //   }
  // }

  // fetchDataProduct(supId: any) {
  //   debugger
  //   this.adminAddproductService.getSupplierById(supId).subscribe(
  //     (res) => {
  //       console.log(res)
  //       this.listProduct = res;

  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }
   // upload() {
  //   this.progress = 0;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     if (file) {
  //       this.currentFile = file;
  //       this.traderAddproductService.upload
  //       this.progress = 0;
  //       this.message = 'Could not upload the file!';
  //     };
  //   }
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   console.log('data :', this.productRegisForm.value)
  //   // stop here if form is invalid
  //   if (this.productRegisForm.invalid) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
  //       text: 'Something went wrong!',
  //     })
  //     return;
  //   } else {

  //     this.traderAddproductService.createProductt(this.productRegisForm.value).subscribe(res => {
  //       console.log('Create Product res : ', res)
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'เพิ่มสินค้าสำเร็จ',
  //         text: '',
  //       })
  //       return;
  //     });
  //   }
  // }

  refrest() {
    // this.fetchDataProduct(this.supId);
    window.location.reload();
  }
  // fetchData() {
  //   this.adminAddproductService.getAllProduct().subscribe(
  //     (res) => {
  //       console.log(res)
  //       this.productRegisForm = res;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  
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
  get product() { return this.productRegisForm.controls; }




}
