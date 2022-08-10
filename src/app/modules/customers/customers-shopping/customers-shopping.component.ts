import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-shopping',
  templateUrl: './customers-shopping.component.html',
  styleUrls: ['./customers-shopping.component.css']
})
export class CustomersShoppingComponent implements OnInit {

     // categories: any;
  formValue !: FormGroup;
  proId: any
  item: any
  productList: any;

  public product: any = [];
  public grandTotal : number = 0;
  public filterCategory: any;
  public grandTotal2: number = 0;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private customerService: CustomersService,
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
    proOther: [''],
    proDetails: [''],
    supName: [''],
    supId: [''],
    cateId: [''],
    catePro: [''],
    numberPieces: [''],
    billPric: [''],

    categories: {
      cateId: [''],
      catePro: [''],
      proDetails: [''],
    },
    supplier: {
      supId: [''],
    },

  });

  ngOnInit(): void {
    // this.customerService.getProducts()
    //   .subscribe(res => {
    //     this.product = res;        
    //   });
    console.log('this.product ::  ' + this.product)
    // this.grandTotal = this.customerService.getTotalPrice();
   
  }
  groupArrayOfObjects(list: any, key :any) {
    return list.reduce(function (rv :any, x :any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  GotoOrderCart(product: any) {
    console.log('CeateData Steb 1  :: ')
    // this.customerService.GotoOrderCart(product);
  }
  
  addProductCount(product: any) {
    // this.customerService.addProductCount(product);
    // this.grandTotal = this.customerService.getTotalPrice();
    // debugger
  }

  removeProductCount(product: any) {
    // this.customerService.removeProductCount(product);
    // this.grandTotal = this.customerService.getTotalPrice();
  }
  removeItem(product: any) {
    // this.customerService.removeCartItem(product);
    // this.grandTotal = this.customerService.getTotalPrice();
  }
  emptycart() {
    // this.customersService.removeAllCart();
    // this.grandTotal = this.customerService.getTotalPrice();
  }
    setProductt(item: any) {
    // this.customerService.setProduct(item);
  }

     // get productf() { return this.productForm.controls; }
}//end
