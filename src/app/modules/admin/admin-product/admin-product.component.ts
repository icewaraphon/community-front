import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminProductService } from './admin-product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  categories: any;
  listProduct: any;
  proId: any;
  item: any;
  catePro: any;
  searchText: any;
  supId: any;

selectedFiles?: FileList;
currentFile?: File;
progress = 0;
massage = '';

fileInfo?: Observable<any>;

page = 1;
count = 0;
tableSize = 10;
tableSizes = [3, 6, 9, 12];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminProductService: AdminProductService
  ) { }
  submitted = false;

  editproductForm = this.fb.group({
    proId: ['', Validators.required],
	  proName: ['', Validators.required],
	  proImg: [''],
	  proPric: ['', Validators.required],
	  freight: [''],
	  proNumber: ['', Validators.required],
	  proUnit: ['', Validators.required],
	  proColor: ['', Validators.required],
  	proSize: [''],
  	proDetails: ['', Validators.required],
	  proStatus: [''],
	  supId: [''],
	  cateId: ['', Validators.required],
	  facturerId: ['', Validators.required],

    categories: {
      catePro: ['', Validators.required],
      cateId: ['', Validators.required],
      proDetails: [''],
    } 
  });

  ngOnInit(): void {
    debugger
    // const supId = this.item.supId;
    const supId = sessionStorage.getItem('user_id');
    this.fetchDataProduct(supId);
    // this.fetchData();
    this.initDropdown();
    // this.initproducteditDataforById(this.proId);
    this.proId = this.activatedroute.snapshot.paramMap.get("proId");
  }
  initDropdown() {
    this.adminProductService.getAllCategories().subscribe(res => { this.categories = res; });

  }

  initproducteditDataforById(res: any,) {
    console.log('!!!!!!!!! res data!!!!!!!!!!',res)
    this.editproductForm.patchValue({
      proId: res.proId,
	    proName: res.proName,
	    proImg: res.proImg,
	    proPric: res.proPric,
  	  freight: res.freight,
	    proNumber: res.proNumber,
	    proUnit: res.proUnit,
	    proColor: res.proColor,
	    proSize: res.proSize,
	    proDetails: res.proDetails,
	    proStatus: res.proStatus,
	    supId: res.supId,
	    cateId: res.cateId,
	    facturerId: res.facturerId,
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('data :', this.editproductForm.value)
    // stop here if form is invalid
    if (this.editproductForm.invalid) {
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
          this.adminProductService.updateProductt(this.editproductForm.value).subscribe(res => {
            console.log('Create User res : ', res)
            window.location.reload()
          }
          )
        }
      })
    }
  }
  // onSubmit() {
  //   this.submitted = true;
  //   this.progress = 0;
  //   console.log('data :', this.editproductForm.value)
  //   if (this.editproductForm.invalid) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
  //       text: 'Something went wrong!',
  //     })
  //   } else {
  //     if (this.selectedFiles) {
  //       const file: File | null = this.selectedFiles.item(0);
  //       if (file) {
  //         this.currentFile = file;
  //         debugger
  //         this.adminProductService.updateProduct(file, this.editproductForm.value).subscribe(res => {

  //           debugger
  //           this.adminProductService.upload
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'แก้ไขข้อมูลสินค้าสำเร็จ',
  //             text: '',
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               window.location.reload()
  //             }
  //             return;
  //           });

  //           this.progress = 0;
  //           this.message = 'Could not upload the file!';
  //         });
  //       }
  //     }
  //   }
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   console.log('data :', this.editproductForm.value)
  //   if (this.editproductForm.invalid) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
  //       text: '',
  //     })
  //   } else {
  //     Swal.fire({
  //       title: 'ยืนยันการทำรายการ',
  //       text: "ต้องการบันทึกข้อมูลหรือไม่ ?",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#198754',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'ยืนยัน',
  //       cancelButtonText: 'ปิด'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.adminProductService.updateProduct(this.editproductForm.value).subscribe(res => {
  //           console.log('Create User res : ', res)
  //         });
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'บันทึกข้อมูลสำเร็จ',
  //           text: '',
  //           confirmButtonText: 'ปิดหน้าต่าง',
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             window.location.reload()
  //           } else if (result.isDismissed) {
  //             window.location.reload()

  //           }
  //         })
  //       }
  //     })
  //   }
  // }
   selectFile(event: any): void {
    this.selectedFiles = event.target.files;
   }

  //  upload() {
  //   this.progress = 0;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);
  //     if (file) {
  //       this.currentFile = file;
  //       this.adminAddproductService.upload
  //       this.progress = 0;
  //       this.message = 'Could not upload the file!';
  //     };
  //   }
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   console.log('data :', this.editproductForm.value)
  //   if (this.editproductForm.invalid) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
  //       text: 'Something went wrong!',
  //     })
  //   } else {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'แก้ไขข้อมูลสินค้าสำเร็จ',
  //       text: '',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.adminProductService.updateProduct( this.editproductForm.value).subscribe(res => {
  //           console.log('Create User res : ', res)
  //           window.location.reload()
  //         }
  //         )
  //       }
  //     })
  //   }
  // }

  pageChanged(event: any) {
    this.page = event;
    this.fetchDataProduct(this.supId);
      // this.fetchData();
  }

  //โค้ดจัดเรียง
  key: string = 'ctmId';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  fetchDataProduct(supId: any) {
    debugger
    this.adminProductService.getSupplierById(supId).subscribe(
      (res) => {
        console.log(res)
        this.listProduct = res;

      },
      (error) => {
        console.log(error);
      }
    );
  }

    // const supId = item.supId;
  //   this.fetchDataProduct(supId);

  // fetchData() {
  //   this.traderProductService.getAllProduct().subscribe(
  //     (res) => {
  //       console.log(res)
  //       this.listProduct = res;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // } 

  deleteproduct(item: any) {
    Swal.fire({
      title: 'ต้องการลบสินค้า?',
      text: "ลบข้อมูลสินค้า : " + item.proId,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminProductService.deleteProductByproId(item.proId).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('เรียบร้อย!', 'คุณได้ทำการลบข้อมูลสินค้าเรียบร้อย', 'success');
            setTimeout(function () { window.location.reload(); }, 2 * 1000);
          },
          (error) => {
            console.log('delete Product error : ', error);
          }
        );
      }
    })

  }

  refresh() {
    this.fetchDataProduct(this.supId);
    // this.fetchData();
    window.location.reload();
  }
  get productf() { return this.editproductForm.controls; }


}
