import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

const endpoint = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class CustomersEditService {

  constructor(private http: HttpClient) { }
  // Define API URL
  // apiURL = 'http://localhost:8090/saleonline-api';

  // Http Options 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getAllCustomers(): Observable<any> {
    return this.http.get<any>(endpoint + '/customers')

  }

  getCustomersByCtmId(ctmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/customers/' + ctmId)

  }
  deleteCustomersByCtmId(ctmId: any): Observable<any> {
    return this.http.delete(endpoint + '/customers/'.concat(ctmId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }
  // HttpClient API put() method => Update employee
  updateCustomers(updateadmin: any): Observable<any> {
    return this.http.post<any>(endpoint + '/customers/update/', JSON.stringify(updateadmin), this.httpOptions)
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

  getDistrictByZipCode1(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/zipCode?zipCode=' + zipCode)
     
  }
  getDistrictById(district: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/distId?distId= ' + district)
 
  }

  getDistrictByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/by_zip_code?zipCode=' + zipCode)
  }

    // HttpClient API post() method => Create employee
    createCustomers(registerData: any): Observable<any> {
      return this.http.post<any>(endpoint + '/customers/save', JSON.stringify(registerData), this.httpOptions)
    }

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
