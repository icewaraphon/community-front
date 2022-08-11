import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const endpoint = environment.endpoint;
@Injectable({
  providedIn: 'root'
})
export class AdminAddproductService {

  constructor(private http: HttpClient) { }
   // Define API URL
  // apiURL = 'http://localhost:9080/communityonline';
  // Http Options 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // getSupplier(): Observable<any> {
  //   return this.http.get<any>(endpoint + '/supplier/')
  // }
  // getSupplierBysupId(supId: any): Observable<any> {
  //   return this.http.get<any>(endpoint + '/supplier' +supId)
  // }

  getProductByproId(proId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/product' +proId)
  }



  // getSupplierById(supId: any): Observable<any> {
  //   return this.http.get<any>(endpoint + '/product/by-supId?supId=' +supId)
  // }
  getAllProduct(): Observable<any> {
    return this.http.get<any>(endpoint + '/product')
    // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // )
  }
  getAllCategories(): Observable<any> {
    return this.http.get<any>(endpoint + '/categories')
    // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // )
  }

  upload(file: File, proId: any, productRegisForm : any): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    // console.log("productRegisForm.proImgInput ::" + productRegisForm.proImgInput)
    formData.append('file', file);
    formData.append('proId', proId);
    formData.append('proImg', productRegisForm.proImg);
    const req = new HttpRequest('POST', `http://localhost:8090/communityonline/product/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`http://localhost:8090/communityonline/files`);
  }

   // HttpClient API post() method => Create employee
   createProductt(file: File, addproductData: any,): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('request', JSON.stringify(addproductData));
   // return this.http.post<any>(endpoint + '/product/save', formData, this.httpOptions)

   const req = new HttpRequest('POST', `http://localhost:8090/communityonline/product/save`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  
  createProduct(addproductData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/products/save/product', JSON.stringify(addproductData), this.httpOptions)
    // .pipe(
    //   retry(1),
    //   catchError(this.handleError)

    // )
  }


  //Error handling
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

}
