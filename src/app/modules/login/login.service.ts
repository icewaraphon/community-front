import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
