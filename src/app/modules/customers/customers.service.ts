import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const endpoint = environment.endpoint;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public cartItemList = new Array();
  public productList = new BehaviorSubject<any>([]);

  apiURL = 'http://localhost:9080/communityonline';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  //customers//
  constructor( private http: HttpClient, private router: Router,) { 

  }
  getAllProduct(): Observable<any> {
    return this.http.get<any>(endpoint + '/product')
  }

  getSupplierBysupId(supId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/supplier' + supId)
  }

  getSupplierById(supId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/product/by-supId?supId=' + supId)
  }

    // แสดงรายการสินค้า
    getProducts() {
      return this.productList.asObservable();
    }

    addtoCart(product: any) {
      console.log(product)
      // product['key'] = UUID.UUID();
      product['quantity'] = 1;
      product['supName'] = product.supplier.supName;
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      console.log('this array ->', this.cartItemList)
    }

    GotoOrderCart(product: any) {
      console.log(product)
      // product['key'] = UUID.UUID();
      this.getTotalPrice();
      this.router.navigate(['customer/customerorderbill']);
    }

    addProductCount(product: any) {
      let item = this.cartItemList.findIndex(i => i.key == product.key)
      product.quantity = product.quantity + 1;
      this.cartItemList[item] = product;
      this.getTotalPrice();
      console.log('addProductCount key ->', product.key)
      console.log('addProductCount ->', this.cartItemList)
    } 
    removeProductCount(product: any) {
      let item = this.cartItemList.findIndex(i => i.key == product.key);
      if (product.quantity > 1) {
        product.quantity = product.quantity - 1;
      }
      this.cartItemList[item] = product;
      this.getTotalPrice();
      console.log('removeProductCount key ->', product.key)
      console.log('removeProductCount ->', this.cartItemList)
    }

    getTotalPrice() {
      let grandTotal = 0;
      this.cartItemList.map((a: any) => {
        // grandTotal += (a.total * a.quantity)
        grandTotal += (a.total || a.proPric * a.quantity)
        console.log('quantity ->', a.quantity)
        console.log('total ->', a.total)
      })
      return grandTotal;
    }

    removeCartItem(product: any) {
      console.log(this.cartItemList)
      this.cartItemList.map((a: any, index: any) => {
        if (product.key === a.key) {
          this.cartItemList.splice(index, 1);
        }
      })
      this.productList.next(this.cartItemList);
    }

    removeAllCart() {
      this.cartItemList = []
      this.productList.next(this.cartItemList);
    }

    
  // -------------------------------------------------------
  getbillorById(billId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billorderById?billId=' + billId)
  }
  getbillorderByCtmIdAndStatus(CtmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billorder/byCtmIdAndStatus?CtmId=' + CtmId +'&status=A')
  }
  getbillorderById(CtmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billorder/by-CtmId?CtmId=' + CtmId)
  }
  getbillorderByCtmId(CtmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/billorder/by-CtmId?CtmId=' + CtmId)
  }
  getorderdetailsId(detailsId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/orderdetails?detailsId?=' + detailsId)
  }
  createbillorder(billorderData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/billorder/save', JSON.stringify(billorderData), httpOptions)

  }
  createorderdetails(orderdetailsData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/orderdetails/save/', JSON.stringify(orderdetailsData), httpOptions)

  }
  createorderdetails2(billorderData: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/billorder/save', JSON.stringify({}), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)

    )
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
    // ---------------------------------------
    getProductByproId(proId: any): Observable<any> {
      return this.http.get<any>(endpoint + '/product/' + proId)
      // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // )
    }
    deleteProductByproId(proId: any): Observable<any> {
      return this.http.delete(endpoint + '/product/'.concat(proId),
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          responseType: 'text'
        }
      );
    }
    updateProduct(updateproduct: any): Observable<any> {
      return this.http.post<any>(endpoint + '/product/update/', JSON.stringify(updateproduct), httpOptions)
      // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // )
    }

    getAllCategories(): Observable<any> {
      return this.http.get<any>(endpoint + '/categories/')
      // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // )
    }

    genQRCode(amount: any): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      return this.http.get<any>(endpoint + '/promptpay-qr/generate-to-base64?amount=' + amount, { headers, responseType: 'text' as 'json' });
    }

    upload(file: File, billId: any, billFrom:any): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
      console.log("billFrom.datePmInput ::" + billFrom.datePmInput)
      formData.append('file', file);
      formData.append('billId', billId);
      formData.append('datePm', billFrom.datePm);
      const req = new HttpRequest('POST','http://localhost:9080/communityonline' , formData, {
        reportProgress: true,
        responseType: 'json'
      });
      return this.http.request(req);
    }
    getFiles(): Observable<any> {
      return this.http.get(`http://localhost:9080/communityonline/files`);
    }

      // HttpClient API post() method => Create employee
  createProduct(TraderproductData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/product/save/', JSON.stringify(TraderproductData), httpOptions)

  }
  getCustomersByRole(roleId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/customers/by-role?roleId=' + roleId)
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(endpoint + '/customers', httpOptions);
  }

  getCustomersByCtmId(ctmId: any): Observable<any> {
    return this.http.get(endpoint + '/customers/'.concat(ctmId), httpOptions);
  }

  deleteCustomersByCtmId(ctmId: any): Observable<any> {
    return this.http.delete(endpoint + '/customers/'.concat(ctmId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }

  getDistrictByZipCode1(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/zipCode?zipCode=' + zipCode)

  }

  getDistrictById(district: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/distId?distId= ' + district)

  }
  getAllDistrict(): Observable<any> {
    return this.http.get<any>(endpoint + '/district')

  }

  getAllAmphur(): Observable<any> {
    return this.http.get<any>(endpoint + '/amphur')
  }

  getAllProvince(): Observable<any> {
    return this.http.get<any>(endpoint + '/province')
  }

  getDistrictByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/by-zip-code?zipCode=' + zipCode)
  }
    
  
    




}
