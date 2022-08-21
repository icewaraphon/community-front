import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const endpoint = environment.endpoint;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private http: HttpClient) { }

  //Define API URL
  apiURL = 'http://localhost:9080/communityonline';

  //Http Options
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }
  getAllCustomers(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/customers')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  saveCustomers(registerData1: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/customers', JSON.stringify(registerData1), this.httpOption)
    .pipe(
      retry(1),
      catchError(this.handleError)

    )
  }

  getDistrictById(district: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/district/distId?district= ' + district)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getAllDistrict(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/district')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )

  }
  getAllAmphur(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/amphur')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getAllProvince(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/provinces')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getDistrictByZipCode1(zipCode: any): Observable<any>{
    return this.http.get<any>(this.apiURL + '/district/zipCode?zipCode=' + zipCode)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getDistricByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/district/by_zipcode?zipCode=' + zipCode)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  // // HttpClient API post() method => Create employee
  // createCustomers(registerData: any): Observable<any> {
  //   return this.http.post<any>(this.apiURL + '/customers', JSON.stringify(registerData), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)

  //     )
  // }

  createbillorder(billorder: any): Observable<any> {
    console.log('billorder ->', billorder)
    return this.http.post<any>(this.apiURL + '/billorders', JSON.stringify(billorder), this.httpOption)
      .pipe(
        retry(1),
        catchError(this.handleError)

      )
  }
  // // Status D
  // updatebillorder(updateData: any): Observable<any> {
  //   console.log('total ->', updateData)
  //   return this.http.post<any>(this.apiURL + '/billorder/update/', JSON.stringify(updateData), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)

  //     )
  // }
  //  // Status R
  //  updatebillorderstatusR(updatestatusR: any): Observable<any> {
  //   console.log('total ->', updatestatusR)
  //   return this.http.post<any>(this.apiURL + '/billorder/updatestatus', JSON.stringify(updatestatusR), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)

  //     )
  // }

  // Error handling 
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
