import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  districts: any;
  amphurs: any;
  provinces: any;

  searchText: any;
  searchText1: any;
  searchText2: any;
  listCustomers: any;
  item: any
  ctmId: any
  supId: any;
  sup_Id: any;
  listBill: any;
  listBill2: any;
  listBill3: any;
  deliveryDetailsId: any;
  ordertList: any;
  orderView: any = [];
  orderDetails: any;

  public product: any = [];
  public products: any = [];
  public grandTotal !: number;
  public totalAmout !: number;
  public amount !: number;
  public freightTotal !: number;
  public orderDetailsList = new Array();

  public billIdStatusA !: number;
  public billIdStatusR !: number;

  billTotalamout = new FormControl('');
  billFreighttotal = new FormControl('');
  billPric = new FormControl('');
  datePm = new FormControl('');
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private adminService: AdminService,

  ) { }

  submitted = false;

  manageFormAddrassadmin = this.fb.group({
    supId: [''],
    ctmId: [''],
    supUser: [''],
    supPass: [''],
    usName: [''],
    password: [''],
    titleType: [''],
    cardId: [''],
    firstName: [''],
    lastName: [''],
    gender: [''],
    birthDate: [''],
    telPhon: [''],
    email: [''],
    addrass: [''],
    cateInteres: [''],
    zipCodes: [''],
    roleId: ['2'],
    distId: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinputctm: [''],
    amphurinputctm: [''],
    provinceinputctm: [''],

    customers: {

    },
  });

  manageFormAddrassCustomers = this.fb.group({
    ctmId: ['', Validators.required],
    usName: ['', Validators.required],
    password: ['', Validators.required],
    titleType: ['', Validators.required],
    cardId: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    birthDate: ['', Validators.required],
    telPhon: ['', Validators.required],
    email: ['', Validators.required],
    cateInteres: [''],
    roleId: [''],
    addrass: ['', Validators.required],
    zipCode: ['', Validators.required],
    distId: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinputctm: [''],
    amphurinputctm: [''],
    provinceinputctm: [''],
  });

  customersForm = this.fb.group({
    ctmId: ['', Validators.required],
    usName: ['', Validators.required],
    password: ['', Validators.required],
    titleType: ['', Validators.required],
    cardId: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    birthDate: ['', Validators.required],
    telPhon: ['', Validators.required],
    email: ['', Validators.required],
    cateInteres: [''],
    roleId: ['3'],
    addrass: ['', Validators.required],
    zipCode: ['', Validators.required],
    distId: [{ value: '', disabled: true },],
    amphur: [{ value: '', disabled: true },],
    province: [{ value: '', disabled: true },],

    districtinput: [''],
    amphurinput: [''],
    provinceinput: [''],
  });

  ngOnInit(): void {
    this.supId = sessionStorage.getItem('user_id');
    // const ctmId = sessionStorage.getItem('user_id');
    // this.getCustomersByCtmId(ctmId);
    // const supId = sessionStorage.getItem('user_id');
    // this.supId = this.activatedroute.snapshot.paramMap.get("supId");
    // this.fetchDataProductBill(supId);
    this.loadSupplierBySupIdAndStatusDetail('C', 'B');
    // this.getSupplierBySupId(this.supId);
    //this.getSupplierBySupId2(this.supId);
    //this.getSupplierBySupId3(this.supId);
    // this.selecttrader(this.supId)
    // const ctmId = sessionStorage.getItem('user_id');


    this.initDropdown();
    // this.fetchData();
  }
  initDropdown() {
    // this.traderService.getAllDistrict().subscribe(res => { this.districts = res; });
    this.adminService.getAllAmphur().subscribe(res => { this.amphurs = res; });
    this.adminService.getAllProvince().subscribe(res => { this.provinces = res; })
  }

  loadUserZipCode(distId: any) {
    console.log('zipCode' + distId)
    this.adminService.getDistrictById(distId).subscribe(
      res => {
        if (res) {
          this.customersForm.patchValue(
            {
              district: res.distId,
              amphur: res.amphur.ampNameTh,
              province: res.province.pvNameTh,

              districtinput: res.distNameTh,
              amphurinput: res.amphur.ampNameTh,
              provinceinput: res.province.pvNameTh,
            }
          )
        }
      },
      error => {
        this.customersForm.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }
  loadUserZipCodectm(distId: any) {
    console.log('zipCode' + distId)
    this.adminService.getDistrictById(distId).subscribe(
      res => {
        if (res) {
          this.manageFormAddrassadmin.patchValue(
            {
              districtinputctm: res.distNameTh,
              amphur: res.amphur.ampNameTh,
              province: res.province.pvNameTh,

            }
          )
        }
      },
      error => {
        this.manageFormAddrassadmin.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }

  loadUserZipCodetrader(distId: any) {
    console.log('zipCode' + distId)
    this.adminService.getDistrictById(distId).subscribe(
      res => {
        if (res) {
          this.manageFormAddrassadmin.patchValue(
            {
              districtinputtrader: res.distId,
              amphur: res.amphur.ampNameTh,
              province: res.province.pvNameTh,

            }
          )
        }
      },
      error => {
        this.manageFormAddrassadmin.patchValue(
          {
            district: '',
            amphur: '',
            province: ''
          }
        )
      }
    );
  }

  getCustomersByCtmId(ctmId: any) {
    this.adminService.getCustomersCtmId(ctmId).subscribe((res) => {
      this.adminService.getDistrictByZipCode1(res.zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.manageFormAddrassadmin.patchValue({
        ctmId: res.ctmId,
        usName: res.usName,
        password: res.password,
        titleType: res.titleType,
        cardId: res.cardId,
        firstName: res.firstName,
        lastName: res.lastName,
        gender: res.gender,
        birthDate: res.birthDate,
        telPhon: res.telPhon,
        email: res.email,
        addrass: res.addrass,
        cateInteres: res.cateInteres,
        zipCode: res.zipCode,
        roleId: res.roleId,
        // district: res.district,
        // amphur: res.amphur,
        // province: res.province,
        districtinputctm: res.district,
        amphurinputctm: res.amphur,
        provinceinputctm: res.province,
      });

      this.loadUserZipCode(res.distId);
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }

    // การจัดส่ง
    selectbillorder(billId: any, detailsId: any) {

      console.log(billId)
      this.adminService.getDetailBybillIdAndStatus(this.supId, billId, 'C', 'C').subscribe(
        (res) => {
          console.log(res)
          this.orderView = res[0];
          this.orderDetails = res[0].orderDetails;
          this.loadUserZipCode(res[0].customer.distId);
          this.deliveryDetailsId = detailsId;
          // แสดงราคารวมในโมดอล
          this.billTotalamout.setValue(res[0].billTotalamout);
          this.billFreighttotal.setValue(res[0].billFreighttotal);
          this.billPric.setValue(res[0].billPric);
          this.datePm.setValue(res[0].datePm)
        },
  
        (error) => {
          console.log(error);
        }
      );
  
    }

    selectbillorder3(billId: any, detailsId: any) {

      console.log(billId)
      this.adminService.getDetailBybillIdAndStatus(this.supId, billId, 'D', 'C').subscribe(
        (res) => {
          console.log(res)
          this.orderView = res[0];
          this.orderDetails = res[0].orderDetails;
          this.loadUserZipCode(res[0].customer.distId);
          this.deliveryDetailsId = detailsId;
          // แสดงราคารวมในโมดอล
          this.billTotalamout.setValue(res[0].billTotalamout);
          this.billFreighttotal.setValue(res[0].billFreighttotal);
          this.billPric.setValue(res[0].billPric);
          this.datePm.setValue(res[0].datePm)
  
        },
  
        (error) => {
          console.log(error);
        }
      );
  
    }

      // รอการยืนยันคำสั่งซื้อ
  selectbillorder1(billId: any) {

    console.log(billId)
    this.adminService.getDetailBybillIdAndStatus(this.supId, billId, 'C', 'B').subscribe(
      (res) => {
        console.log(res)
        this.orderView = res[0];
        this.orderDetails = res[0].orderDetails;
        this.loadUserZipCode(res[0].customer.distId);
       

        // แสดงราคารวมในโมดอล
        this.billTotalamout.setValue(res[0].billTotalamout);
        this.billFreighttotal.setValue(res[0].billFreighttotal);
        this.billPric.setValue(res[0].billPric);
        this.datePm.setValue(res[0].datePm)

      },

      (error) => {
        console.log(error);
      }
    );

  }

  // กรอกพัสดุ
  selectbillorder2(billId: any, detailsId: any, status: any) {

    console.log(billId)
    this.adminService.getDetailBybillIdAndStatus2(this.supId, billId, status).subscribe(
      (res) => {
        console.log(res)
        this.orderView = res[0];
        this.orderDetails = res[0].orderDetails;
        this.loadUserZipCode(res[0].customer.distId);
        this.deliveryDetailsId = detailsId;
        // แสดงราคารวมในโมดอล
        this.billTotalamout.setValue(res[0].billTotalamout);
        this.billFreighttotal.setValue(res[0].billFreighttotal);
        this.billPric.setValue(res[0].billPric);
        this.datePm.setValue(res[0].datePm)

      },

      (error) => {
        console.log(error);
      }
    );

  }

    // รอการยืนยันคำสั่งซื้อ
    getSupplierBySupId(supId: any) {
      this.adminService.getSupplierBySupIdAndStatus(supId,'D','B').subscribe(
        (res) => {
          console.log(res)
          this.listBill = res;
        }, 
        (error) => {
          console.log(error);
        }
      );
    }

      // การจัดส่ง
  getSupplierBySupId2(supId: any) {
    this.adminService.getSupplierBySupIdAndStatus(supId, 'C', 'C').subscribe(
      (res) => {
        console.log(res)
        this.listBill2 = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

    // กรอกหมายเลขพัสดุ
    getSupplierBySupId3(supId: any) {
      this.adminService.getSupplierBySupIdAndStatus(supId, 'C', 'D').subscribe(
        (res) => {
          console.log(res)
          this.listBill3 = res;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    pageChanged(event: any) {
      this.page = event;
      // this.fetchData();
      // this.fetchDataProductBill(this.supId);
    }

    selectdataorder() {
      Swal.fire('ข้อมูลคำสั่งซื้อ')
    }

    loadSupplierBySupIdAndStatusDetail(statusBill: any, statusDetail :any) {
      this.listBill = [];
      this.adminService.getSupplierBySupIdAndStatus(this.supId, statusBill, statusDetail).subscribe(
        (res) => {
          console.log(res)
          this.listBill = res;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    loadSupplierBySupIdAndStatusDetail2( statusDetail: any) {
      this.listBill = [];
      this.adminService.getSupplierBySupIdAndStatus2(this.supId, statusDetail).subscribe(
        (res) => {
          console.log(res)
          this.listBill = res;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    approvetrader(detailsId: any) {

      Swal.fire({
        title: 'ต้องการยืนยันคำสั่งซื้อสินค้า?',
        text: "ยืนยันคำสั่งซื้อสินค้า  ",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'ตกลง',
        denyButtonText: `ยกเลิก`,
      }).then((result) => {
        console.log(detailsId)
        if (result.isConfirmed) {
          this.adminService.updateStatusDetail({ status: 'C', detailsId: detailsId}).subscribe(
            (res) => {
              console.log(res)
              window.location.reload()
            },
            (error) => {
              console.log(error);
            }
          );
          
        } else if (result.isDenied) {
  
        }
  
      })
    }

    approveStatusD(detailsId: any) {

      Swal.fire({
        title: 'ต้องการยืนยันการจัดส่ง?',
        text: "ยืนยันการจัดส่ง ",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        denyButtonText: `ยกเลิก`,
      }).then((result) => {
        
        if (result.isConfirmed) {
          // debugger
          // this.generateReport();
          this.adminService.updateStatusDetail({ status: 'D', detailsId: this.deliveryDetailsId }).subscribe(
            (res) => {
              console.log(res)
              window.location.reload()
            },
            (error) => {
              console.log(error);
            }
          );
  
        } else if (result.isDenied) {
  
        }
  
      })
    }

      //ที่อยู่
  generateReport() {
    this.adminService.generateAddressReport(111).subscribe(data => {
      console.log('report===>', data)
      if (data.body) {
        let pdf = window.URL.createObjectURL(new Blob([data.body], { type: 'application/pdf' }))
        window.open(pdf);
      }
    })
  }

  gotoexpress(detailsId :any) {
    Swal.fire({
      title: 'หมายเลขพัสดุ',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'ส่ง',
      cancelButtonText: 'ยกเลิก',
      showLoaderOnConfirm: true,
     
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.updateParcelNumber({ parcelNumber: result.value, detailsId: detailsId}).subscribe(
          (res) => {
            console.log(res)
            window.location.reload()
          },
          (error) => {
            console.log(error);
          }
        );
      }
    })
  }

  get customerf() { return this.manageFormAddrassadmin.controls; }
  
  

  

}
