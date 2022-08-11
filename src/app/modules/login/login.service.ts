import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http:HttpClient
  ) { }

  loginCustomers(data: any): Observable<any>{
    const body=JSON.stringify(data);
    return this.http.post<any>(endpoint.concat('/authentication/customers/login'),body,this.httpOptions)
  }

  loginSupplier(data: any): Observable<any>{
    const body=JSON.stringify(data);
    return this.http.post<any>(endpoint.concat('/authentication/supplier/login'),body,this.httpOptions)
  }

  loginByUsernamePassword(authData: any): Observable<any> {
    return this.http.post<any>(endpoint + '/authentication/customers/login', JSON.stringify(authData), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
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
