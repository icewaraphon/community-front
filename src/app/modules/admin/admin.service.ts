import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.endpoint;
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient) { }
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      getSupplierBySupIdAndStatusAndDateAdmin(statusBill: any, statusDetail: any, dateStart: any, dateEnd: any): Observable<any> {
        return this.http.get<any>(endpoint + '/billorderBySupIdAndtatusAndDateAdmin?statusBill=' + statusBill + '&statusDetail=' + statusDetail + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd)
      }

      getAllStatusBillorder(statusBill: any, statusDetail: any): Observable<any> {
        return this.http.get<any>(endpoint + '/billOrderByStatusAll?statusBill=' + statusBill + '&statusDetail=' + statusDetail)
      }
      getbillorById(billId: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + billId)
      }
      getbillorderById(CtmId: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + CtmId)
      } 
      getbillorderByCtmId(CtmId: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + CtmId)
      }
      getorderdetailsId(detailsId: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + detailsId)
      }

      getSupplierById(supId: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + supId)
      }
      
      getSupplierorderdetailsById(supId: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + supId)
      }
      getSupplierBySupId(supId: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + supId)
      }
      getSupplierBySupIdAndStatusAndDate(supId: any, statusBill: any, statusDetail: any, dateStart: any, dateEnd: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + supId + '&statusBill=' + statusBill + '&statusDetail=' + statusDetail + '&dateStart=' + dateStart + '&dateEnd=' + dateEnd)
      }
      getSupplierBySupIdAndStatus(supId: any, statusBill: any, statusDetail: any): Observable<any> {
        return this.http.get<any>(endpoint + '..=' + supId + '&statusBill=' + statusBill+ '&statusDetail=' + statusDetail )
      }
      getSupplierBySupIdAndStatus2(supId: any , statusDetail: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + supId +'&statusDetail=' + statusDetail)
      }
      getDetailBybillIdAndStatus(supId: any,billid: any, statusBill: any, statusDetail: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + supId+'&billid=' + billid + '&statusBill=' + statusBill + '&statusDetail=' + statusDetail)
      }
      getDetailBybillIdAndStatus2(supId: any, billid: any, statusDetail: any): Observable<any> {
        return this.http.get<any>(endpoint + '..' + supId + '&statusDetail=' + statusDetail)
      }
      updateParcelNumber(orderdetailsData: any): Observable<any> {
   
        return this.http.post<any>(endpoint + '..', JSON.stringify(orderdetailsData), httpOptions)
    
      }
      updateStatusDetail(orderdetailsData: any): Observable<any> {
        console.log(orderdetailsData)
        return this.http.post<any>(endpoint + '..', JSON.stringify(orderdetailsData), httpOptions)
      }

        //report
  generateAddressReport(ctmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '..' + ctmId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'json'
    });
  }

  getSupplierBysupId(supId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/supplier/' + supId)

  }

 getAllCustomer(): Observable<any> {
    return this.http.get<any>(endpoint + '/customers')

  }

  getAllOrderdetails(): Observable<any> {
    return this.http.get<any>(endpoint + '/orderdetails')
    

  }
  getAllBillorder(): Observable<any> {
    return this.http.get<any>(endpoint + '/billorder')

  }

  getCustomersCtmId(ctmId: any): Observable<any> {
    return this.http.get(endpoint + '/customers/'.concat(ctmId), httpOptions);
  }

  getCustomersByCtmId(ctmId: any): Observable<any> {
    return this.http.get<any>(endpoint + '/customers' )

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
   updateDataadmin(updateadmin: any): Observable<any> {
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
  getDistrictById(district: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/distId?distId= ' + district)

  }
  getDistrictByZipCode1(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/zipCode?zipCode=' + zipCode)

  }

  getDistrictByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(endpoint + '/district/by-zip-code?zipCode=' + zipCode)
  }
  getAllSupplier(): Observable<any> {
    return this.http.get<any>(endpoint + '/supplier/')
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
