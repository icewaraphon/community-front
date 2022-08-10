import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  

  constructor(private http: HttpClient) { }
  // Define API URL
  // apiURL = 'http://localhost:8090/saleonline-api';

  // Http Options 
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
 
  getAllProduct(): Observable<any> {
    return this.http.get<any>(endpoint + '/product')
  }

  //แสดงรายการสินค้า

  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    // this.getTotalPrice();
    console.log(this.cartItemList)
  }
 // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.cartItemList.map((a: any) => {
  //     grandTotal += a.billpric;
  //   })
  //   return grandTotal;
  // }
  // -------------------------------------------------------

  getProductByproId(proId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/product' + proId)
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
   // HttpClient API post() method => Create employee
   createProduct(TraderproductData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/product/save/', JSON.stringify(TraderproductData), httpOptions)
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)

    // )
  }



}
