import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-ordercheck',
  templateUrl: './admin-ordercheck.component.html',
  styleUrls: ['./admin-ordercheck.component.css']
})
export class AdminOrdercheckComponent implements OnInit {

  searchText: any;
  listBill: any;
  item: any
  ctmId: any
  billList: any;
  ordertList: any;
  orderView: any;
  orderDetails: any;

  formModalodercheck: any;

  public orderDetailsList = new Array();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminService: AdminService

  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    // debugger
    this.adminService.getAllBillorder().subscribe(
      (res) => {
        console.log('getAllBillorder => ',res)
        this.listBill = res;
      },
      (error) => {
        console.log(error);
      }
    );

  }
  pageChanged(event: any) {
    
    this.fetchData();
  }

}
