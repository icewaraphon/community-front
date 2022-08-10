import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-category',
  templateUrl: './customers-category.component.html',
  styleUrls: ['./customers-category.component.css']
})
export class CustomersCategoryComponent implements OnInit {

    // categoriess: any;
    formValue !: FormGroup;
    // listProduct !: any;
    proId: any
    item: any
  
    cartTotal = 0
  
    public productList: any;
    public filterCategory: any
    searchKey: string = "";

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
    supId: [''],
    cateId: [''],
    catePro: [''],
    categories: {
      cateId: [''],
      catePro: [''],
      proDetails: [''],
    },
    supplier: {
      supId: [''],

    }
  });


  ngOnInit(): void {
    // แสดงสินค้า
    this.customersService.getAllProduct()
      .subscribe(res => {
        this.productList = res;

        this.filterCategory = res;

        this.productList.forEach((a: any) => {
          if (a.category === "women's clothing" || a.category === "men's clothing") {
            a.category = "fashion"
          }
          Object.assign(a, { quantity: 1, total: a.proPric });
        });
        console.log(this.productList)
      });

    // this.customerService.getAllProduct()
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
    // item['key'] = UUID.UUID();
    this.customersService.addtoCart(item);

    // window.alert('Your product has been added to the cart!');

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
    // this.productForm.controls['proId'].patchValue(item.proId);
    this.productForm.controls['proName'].patchValue(item.proName);
    this.productForm.controls['proImg'].patchValue(item.proImg);
    this.productForm.controls['proPric'].patchValue(item.proPric);
    this.productForm.controls['proNumber'].patchValue(item.proNumber);
    this.productForm.controls['proUnit'].patchValue(item.proUnit);
    this.productForm.controls['proColor'].patchValue(item.proColor);
    this.productForm.controls['proSize'].patchValue(item.proSize);
    this.productForm.controls['proDetails'].patchValue(item.proDetails);
    // this.productForm.controls['cateId'].patchValue(item.cateId);
    // this.productForm.controls['catePro'].patchValue(item.categories.catePro);
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
    
  // }
  // productGroups: any[] = [
  //   {src:'https://cf.shopee.co.th/file/0091cb7e7d970b10dcf233d2e4faf9b9_tn', detail:'เสื้อผ้าแฟชั่นผู้ชาย'},
  //   {src:'https://cf.shopee.co.th/file/67efa2ec30bb8ee1a28b2a20105b4cc6_tn', detail:'รองเท้าผู้ชาย'},
  //   {src:'https://cf.shopee.co.th/file/1df1a260dcab830782b2ad39d19a9645_tn', detail:'เสื้อผ้าแฟชั่นผู้หญิง'},
  //   {src:'https://cf.shopee.co.th/file/f3c98b0848f0fb2eaa08ba7da5ae7d7b_tn', detail:'รองเท้าผู้หญิง'},
  //   {src:'https://cf.shopee.co.th/file/a859e702e260173d2700cdd77130a5f5_tn', detail:'นาฬิกาและแว่นตา'},
  //   {src:'https://cf.shopee.co.th/file/02d8833a261004d90492fc556a44043b_tn', detail:'กระเป๋า'},
  //   {src:'https://cf.shopee.co.th/file/10edbcb485f9aa5fd9878fadcf49fcd2_tn', detail:'มือถือและอุปกรณ์เสริม'},
  //   {src:'https://cf.shopee.co.th/file/44f6f69ec2db02607926a2039149dbe7_tn', detail:'เครื่องประดับ'},
  //   {src:'https://cf.shopee.co.th/file/26f82d41b5b1ba23bcf80c2e22c7755f_tn', detail:'คอมพิวเตอร์และแล็ปท็อป'},
  //   {src:'https://cf.shopee.co.th/file/c1a6aa4de75441e660cfc7210f4be7da_tn', detail:'อาหารและเครื่องดื่ม'},
  //   {src:'https://cf.shopee.co.th/file/3e535ae67b4d970c916eacc6e226fd5b_tn', detail:'สัตว์เลี้ยง'},
  //   {src:'https://cf.shopee.co.th/file/1081b4c9cf8b67996381430b91b2cb0a_tn', detail:'เกมส์'},
  //   {src:'https://cf.shopee.co.th/file/c687179d223e5fbbea56c2fa66d3d7a3_tn', detail:'เครื่องใช้ไฟฟ้า'},
  //   {src:'https://cf.shopee.co.th/file/59cc0b3efca84d9371db2974be89c560_tn', detail:'เครื่องใช้ภายในบ้าน'},
  // ]
  
  get productf() { return this.productForm.controls; }

}
