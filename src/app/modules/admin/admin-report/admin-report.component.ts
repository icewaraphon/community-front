import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  searchText: any;
  listbillorder: any;
  item: any
  ctmId: any
  billList: any;
  ordertList: any;
  orderView: any;
  orderDetails: any;

  public orderDetailsList = new Array();

  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminService: AdminService
  ) { }


  submitted = false;

  searchForm = this.fb.group({
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
  });

  ngOnInit(): void {
    this.AllBillorder();

  }

  AllBillorder() {
    this.adminService.getAllStatusBillorder('D', 'D').subscribe(
      (res) => {
        console.log(res)
        this.listbillorder = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchData() {
    this.listbillorder = [];
    const datSearch = this.searchForm.value
    console.log(datSearch)
    this.adminService.getSupplierBySupIdAndStatusAndDateAdmin( 'D', 'D', datSearch.dateStart + ' 00:00', datSearch.dateEnd + ' 23:59').subscribe(
      (res) => {
        console.log(res)
        this.listbillorder = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  pageChanged(event: any) {
    this.page = event;
    this.AllBillorder();
  }



}
