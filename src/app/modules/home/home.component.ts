import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { CustomersService } from '../customers/customers.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // public cartItemList: any = []
  // public productList = new Array();

  // categoriess: any;
  // formValue !: FromGroup;
  listProduct !: any;
  proId: any
  item: any
  searchText: any;
  productList: any;
  filterCategory: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private homeService: HomeService,
    private customerService: CustomersService,
  ) { }

  submitted = false;

  productForm = this.fb.group({
    proId: [''],
    proName: [''],
    proImg: [''],
    proPric: [''],
    freight: [''],
    proNumber: [''],
    proUnit: [''],
    proColor: [''],
    proSize: [''],
    proDetails: [''],
    proStatus: [''],
    supId: [''],
    cateId: [''],
    facturerId: [''],
    categories: {
      cateId: [''],
      catePro: [''],
      proDetails: [''],
    },
    supplier: {
      supId: [''],
      supName: [''],

    }
  });

  ngOnInit(): void {
    
      // แสดงสินค้า
      this.customerService.getAllProduct()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;

        this.productList.forEach((a: any) => {
          if(a.cateId === "women's clothing" || a.cateId === "men's clothing") {
            a.cateId = "fashion"
          }
          Object.assign(a, { quantity: 1, total: a.proPric });
        });
        console.log(this.productList);
        console.log(this.filterCategory);
      }); 


      this.fetchData();
      this.initDropdown();
  }

  getProductByCtmId(proId: any) {
    // this.customerService.updateProduct(proId).subscribe((res) =>{
    //   console.log('!!!!!!!res data!!!!!!!!',res)
    //   this.productForm.patchValue({
    //     proId: res.proId,
    //     proName: res.proName,
    //     proImg: res.proImg,
    //     proPric: res.proPric,
    //     freight: res.freight,
    //     proNumber: res.proNumber,
    //     proUnit: res.proUnit,
    //     proColor: res.proColor,
    //     proSize: res.proSize,
    //     proDetails: res.proDetails,
    //     proStatus: res.proStatus,
    //     supId: res.supId,
    //     cateId: res.cateId,
    //     facturerId: res.cateId,
    //   });

    // },
    // (error) => {
    //   console.log('!!!!!!error!!!!!!', error);
    // }
    // );

  }
  onSubmit() {
    this.submitted = true;
    console.log('data :', this.productForm.value)
    // stop here if form is invalid
    if (this.productForm.invalid) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
      //     text: 'Something went wrong!',
      //   })
      // } else {
      Swal.fire({
        icon: 'success',
        title: 'เพิ่มสินค้าใส่ตระกร้าเรียบร้อย',
        text: 'ดูสินค้าในตระกร้า',
      }).then((result) => {
        // if (result.isConfirmed) {
        //   this.customerService.updateProduct(this.productForm.value).subscribe(res => {
        //     console.log('Create User res : ', res)
        //     window.location.reload()
        //   }
        //   )
        // }
      })
    }
  }
  //  addProductCount(item: any) {
  //   this.customerService.addProductCount(item);
  // }
  // removeProductCount(item: any) {
  //   this.customerService.removeProductCount(item);
  // }

  addtocart(item: any) {
    this.customerService.addtoCart(item);
    window.alert('สินค้าของคุณถูกเพิ่มลงในรถเข็นแล้ว!');
  }

  filter(cateId: string) {
    if (cateId != 'All') {
      this.filterCategory = this.productList
        .filter((a: any) => {
          if (a.cateId == cateId || cateId == '') {
            return a;
          }
        })
    } else {
      this.filterCategory = this.productList;
    }
  }
  initDropdown() {
    this.homeService.getAllCategories().subscribe(res => { this.filterCategory = res; });
  }
  selectpro(item: any) {
    debugger
    this.productForm.controls['proId'].patchValue(item.proId);
    this.productForm.controls['proName'].patchValue(item.proName);
    this.productForm.controls['proImg'].patchValue(item.proImg);
    this.productForm.controls['proPric'].patchValue(item.proPric);
    this.productForm.controls['proNumber'].patchValue(item.proNumber);
    this.productForm.controls['proUnit'].patchValue(item.proUnit);
    this.productForm.controls['proColor'].patchValue(item.proColor);
    this.productForm.controls['proSize'].patchValue(item.proSize);
    this.productForm.controls['proDetails'].patchValue(item.proDetails);
    this.productForm.controls['cateId'].patchValue(item.cateId);
    this.productForm.controls['catePro'].patchValue(item.categories.catePro);

    // this.productForm.controls['supName'].patchValue(item.supplier.supName);

    // const supId = item.supId;
    // this.fetchDataProduct(supId);

  }

  // fetchDataProduct(supId: any) {
  //   this.customerService.getSupplierById(supId).subscribe(
  //     (res) => {
  //       console.log(res)
  //       this.listProduct = res;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }


  fetchData() {
    this.homeService.getAllProduct().subscribe(
      (res) => {
        console.log(res)
        this.productList = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  get productf() { return this.productForm.controls; }



}
