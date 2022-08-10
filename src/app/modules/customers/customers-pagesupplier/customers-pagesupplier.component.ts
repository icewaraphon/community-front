import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-pagesupplier',
  templateUrl: './customers-pagesupplier.component.html',
  styleUrls: ['./customers-pagesupplier.component.css']
})
export class CustomersPagesupplierComponent implements OnInit {
  categoriess: any;
  formValue !: FormGroup;
  // listProduct !: any;
  proId: any
  item: any
  listProduct !: any;
  listSupplie !: any;
  searchText: any;
  public productList: any;
  public filterCategory: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private homeService: HomeService,
    private customersService: CustomersService,
  ) { }

  submitted = false;

  productForm = this.fb.group({
    proId: [''],
    proName: [''],
    proImg: [''],
    proPric: [''],
    perCent: [''],
    proNumber: [''],
    proUnit: [''],
    proColor: [''],
    proSize: [''],
    proStatus: [''],
    proDetails: [''],
    supName: [''],
    supEmail: [''],
    facebook: [''],
    line: [''],
    supTel: [''],
    supIam: [''],
    supId: [''],
    cateId: [''],
    catePro: [''],
    categories: {
      cateId: [''],
      // catePro: [''],
      proDetails: [''],
    },
    supplier: {
      supId: [''],

    }
  });

  



  ngOnInit(): void {
    // แสดงสินค้า
    // this.customersService.getAllProduct()
    //   .subscribe(res => {
    //     this.productList = res;

    //     this.filterCategory = res;

    //     this.productList.forEach((a: any) => {
    //       if (a.category === "women's clothing" || a.category === "men's clothing") {
    //         a.category = "fashion"
    //       }
    //       Object.assign(a, { quantity: 1, total: a.proPric });
    //     });
    //     console.log(this.productList)
    //   });

    // ---------------------------------------------------
    // this.fetchData();
    this.initDropdown();
    // this.initproductDataforById(this.proId);
    // this.proId = this.activatedroute.snapshot.paramMap.get("proId");
  }
  addtocart(item: any) {
    // this.customersService.addtoCart(item);
    window.alert('สินค้าของคุณถูกเพิ่มลงในรถเข็นแล้ว!');

  }
  filter(category: string) {
    this.customersService = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }

  
  initDropdown() {
    this.homeService.getAllCategories().subscribe(res => { this.filterCategory = res; });
  }

  
  // initproductDataforById(proId: any) {
  //   this.adminReportproductService.getProductByproId(proId).subscribe((res) => {
  //     console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
  //     this.productForm.patchValue({
  //       proId: res.proId,
  //       proName: res.proName,
  //       proImg: res.proImg,
  //       proPric: res.proPric,
  //       perCent: res.perCent,
  //       proNumber: res.proNumber,
  //       proUnit: res.proUnit,
  //       proColor: res.proColor,
  //       proSize: res.proSize,
  //       proStatus: res.proStatus,
  //       proDetails: res.proDetails,
  //       addrass: res.addrass,
  //       supId: res.supId,
  //       cateId: res.cateId,
  //       catePro: res.categories.catePro,
  //       supName: res.supName,
  //     });

  //     //set default select dropdown
  //     // this.loadUserZipCode(res.zipCode);
  //   },
  //     (error) => {
  //       console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
  //     }
  //   );
  // }

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

    this.productForm.controls['supName'].patchValue(item.supplier.supName);
    this.productForm.controls['supEmail'].patchValue(item.supplier.supEmail);
    this.productForm.controls['facebook'].patchValue(item.supplier.facebook);
    this.productForm.controls['line'].patchValue(item.supplier.line);
    this.productForm.controls['supTel'].patchValue(item.supplier.supTel);
    // this.productForm.controls['supIam'].patchValue(item.supplier.supIam);

    const supId = item.supId;
    this.fetchDataProduct(supId);

  }

  fetchDataProduct(supId: any) {
    // this.customersService.getSupplierById(supId).subscribe(
    //   (res) => {
    //     console.log(res)
    //     this.listProduct = res;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  
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

  

}//end
