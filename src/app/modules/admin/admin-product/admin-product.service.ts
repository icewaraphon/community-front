import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) { }

  // Define API URL
  // apiURL = 'http://localhost:9080/communityonline';

  // Http Options 
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }

  getAllProduct(): Observable<any> {
    return this.http.get<any>(endpoint + '/product')
  }

  getSupplierById(supId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/product/by-supId?supId=' + supId)
  }

  getProductByProId(proId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/product/' + proId)
  }

  deleteProductByproId(proId: any): Observable<any> {
    return this.http.delete(endpoint + '/product/' .concat(proId),
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      responseType: 'text'
    }
    );
  }

  upload(file: File, proId: any, editproductForm: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    // console.log("productRegisForm.proImgInput ::" + productRegisForm.proImgInput)
    formData.append('file', file);
    formData.append('proId', proId);
    formData.append('proImg', editproductForm.proImg);
    const req = new HttpRequest('POST', `http://localhost:8090/saleonline-api/product/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`http://localhost:8090/saleonline-api/files`);
  }
  // HttpClient API post() method => Create employee
  // updateProduct(file: File, updateproductData: any,): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   formData.append('request', JSON.stringify(updateproductData));

  //   const req = new HttpRequest('POST', `http://localhost:8090/saleonline-api/product/update`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //   return this.http.request(req);
  // }

  updateProductt(updateProduct: any): Observable<any> {
    return this.http.post<any>(endpoint + '/product/update/',JSON.stringify(updateProduct),httpOptions)

  }
   // HttpClient API post() method => Create employee
   updateProduct(file: File, addproductData: any,): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('request', JSON.stringify(addproductData));
    // return this.http.post<any>(endpoint + '/product/save', formData, this.httpOptions)
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)

    // )
    const req = new HttpRequest('POST', `http://localhost:8090/saleonline-api/product/update`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
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
