import { DatePipe } from '@angular/common';
import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CustomersService } from '../customers.service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-customers-order',
  templateUrl: './customers-order.component.html',
  styleUrls: ['./customers-order.component.css']
})
export class CustomersOrderComponent implements OnInit {
  districts: any;
  amphurs: any;
  provinces: any;

  listCustomers !: any;
  billList: any;
  ordertList: any;
  orderView: any;
  orderDetails: any;
  item: any
  billId: any
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;


  billTotalamout = new FormControl('');
  billFreighttotal = new FormControl('');
  billPric = new FormControl('');

  // QR Code
  public myQrCode: any | string = null;

  public product: any = [];
  public products: any = [];
  public grandTotal !: number;
  // public grandTotal !: number;
  public filterCategory: any;
  public totalAmout !: number;
  public amount !: number;
  public freightTotal !: number;
  public orderDetailsList = new Array();

  public billIdStatusA !: number;
  public billIdStatusR !: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private registerService: RegisterService,
    private customersService: CustomersService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe
  ) { }

  submitted = false;
  ctmmanagForm = this.fb.group({

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

  billForm = this.fb.group({
    billId: [''],
    billDate: [''],
    datePm: [''],
    receiptNo: [''],
    billFreighttotal: [''],
    billTotalamout: [''],
    billPric: [''],
    discount: [''],
    statasPm: [''],
    pmMethod: [''],
    slipPm: [''],
    balance: [''],
    ctmId: [''],
  });

  billForm2 = this.fb.group({
    //datePm: ['', Validators.required],
  });

  OrderdetailsForm = this.fb.group({
    detailsId: [''],
    quantity: [''],
    totalAmout: [''],
    unitPrice: [''],
    parcelNumber: [''],
    status: [''],
    detailsFreight: [''],
    totalBalance: [''],
    billId: [''],
    supId: [''],
    proId: [''],
  });



  ngOnInit(): void {
    const ctmId = sessionStorage.getItem('user_id');
    this.fetchDatabillorderByCtmId(ctmId);
    this.initDropdown();
    // this.initbilleditDataforById(this.billId);
    this.getCustomersByCtmId(ctmId);

    // QR Code
    this.customersService.genQRCode(100).subscribe(res => {
      //console.log('===>',res)
      this.myQrCode = "data:image/png;base64," + res;
    });
  
  }
  initDropdown() {
    // this.customerService.getAllDistrict().subscribe(res => { this.districts = res; });
    // this.customersService.getAllAmphur().subscribe(res => { this.amphurs = res; });
    // this.customersService.getAllProvince().subscribe(res => { this.provinces = res; })
  }

  loadUserZipCode(distId: any) {
    console.log('zipCode' + distId)
    // this.customersService.getDistrictById(distId).subscribe(
    //   res => {
    //     if (res) {
    //       this.ctmmanagForm.patchValue(
    //         {
    //           district: res.distId,
    //           amphur: res.amphur.ampNameTh,
    //           province: res.province.pvNameTh,

    //           districtinput: res.distNameTh,
    //           amphurinput: res.amphur.ampNameTh,
    //           provinceinput: res.province.pvNameTh,
    //         }
    //       )
    //     }
    //   },
    //   // error => {
    //   //   this.ctmmanagForm.patchValue(
    //   //     {
    //   //       district: '',
    //   //       amphur: '',
    //   //       province: ''
    //   //     }
    //   //   )
    //   // }
    // );
  }

  getCustomersByCtmId(ctmId: any) {
    this.customersService.getCustomersByCtmId(ctmId).subscribe((res) => {
      //this.customersService.getDistrictByZipCode1(res.zipCode).subscribe(res => { this.districts = res; console.log('data :', res) });
      console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
      this.ctmmanagForm.patchValue({
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
        districtinput: res.district,
        amphurinput: res.amphur,
        provinceinput: res.province,
      });

      this.loadUserZipCode(res.distId);
    },
      (error) => {
        console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      }
    );
  }
   getBillById(billId: any) {
    // this.customersService.getbillorById(billId).subscribe((res) => {
    //   console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
    //   debugger
    //   this.billForm.patchValue({
    //     billId: res.billId,
    //     billDate: res.billDate,
    //     datePm: res.datePm,
    //     receiptNo: res.receiptNo,
    //     billFreighttotal: res.billFreighttotal,
    //     billTotalamout: res.billTotalamout,
    //     billPric: res.billPric,
    //     discount: res.discount,
    //     statasPm: res.statasPm,
    //     pmMethod: res.pmMethod,
    //     slipPm: res.slipPm,
    //     balance: res.balance,
    //     ctmId: res.ctmId,
    //   });

    // },
      // (error) => {
      //   console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      // }
    // );
  }

  setOrderIdByStatusA(billId: any) {
    this.billIdStatusA = billId;
    // this.billIdStatusR = billId;
  }

  setOrderIdByStatusR(billId: any) {
    // this.billIdStatusA = billId;
    this.billIdStatusR = billId;
  }
   initbilleditDataforById(billId: any) {
    // this.customersService.getbillorById(billId).subscribe((res) => {
    //   console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res)
    //   this.billForm.patchValue({
    //     billId: res.billId,
    //     datePm: res.datePm,
    //     billDate: res.billDate,
    //     slipPm: res.slipPm,
    //     receiptNo: res.receiptNo,
    //     billFreighttotal: res.billFreighttotal,
    //     billTotalamout: res.billTotalamout,
    //     billPric: res.billPric,
    //     discount: res.discount,
    //     statasPm: res.statasPm,
    //     pmMethod: res.pmMethod,
    //     balance: res.balance,
    //     ctmId: res.ctmId,
    //   });

    // },
      // (error) => {
      //   console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      // }
    // );
  }

  selectbillorder(billId: any) {
    console.log(billId)
    this.customersService.getbillorById(billId).subscribe(
      (res) => {
        console.log('selectbillorder => ', res)
        this.orderView = res;
        this.orderDetails = res.orderdetails;

        // แสดงราคารวมในโมดอล
        this.billTotalamout.setValue(res.billTotalamout);
        this.billFreighttotal.setValue(res.billFreighttotal);
        this.billPric.setValue(res.billPric);
        // debugger
        // this.billForm.controls['billId'].patchValue(billId.billId);
        // this.billForm.controls['billDate'].patchValue(billId.billDate);
        // this.billForm.controls['datePm'].patchValue(billId.datePm);
        // this.billForm.controls['receiptNo'].patchValue(billId.receiptNo);
        // this.billForm.controls['billFreighttotal'].patchValue(billId.billFreighttotal);
        // this.billForm.controls['billTotalamout'].patchValue(billId.billTotalamout);
        // this.billForm.controls['billPric'].patchValue(billId.billPric);
        // this.billForm.controls['discount'].patchValue(billId.discount);
        // this.billForm.controls['statasPm'].patchValue(billId.statasPm);
        // this.billForm.controls['pmMethod'].patchValue(billId.pmMethod);
        // this.billForm.controls['slipPm'].patchValue(billId.slipPm);
        // this.billForm.controls['balance'].patchValue(billId.balance);
        // this.billForm.controls['ctmId'].patchValue(billId.ctmId);


      },
     
      // (error) => {
      //   console.log(error);
      // }
    );
    
  }

  selectbillPric(billId: any) {

    console.log(billId)
    this.customersService.getbillorById(billId).subscribe(
      (res) => {
        console.log(res)
        // this.orderView = res[0];
        // this.orderDetails = res[0].orderDetails;

        // แสดงราคารวมในโมดอล
        // this.billTotalamout.setValue(res[0].billTotalamout);
        // this.billFreighttotal.setValue(res[0].billFreighttotal);
        this.billPric.setValue(res.billPric);
       

        //generate qrcode this here
        // this.customersService.genQRCode(res[0].billPric).subscribe(res => {
        //   console.log('qr base64 ===>', res)
        //   this.myQrCode = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res}`);
        // });

      },

      // (error) => {
      //   console.log(error);
      // }
    );
    // แยกสินค้า
    // const billId = billId.billId;
    // this.fetchgetbillorById(billId);

  }
  
  fetchDatabillorderByCtmId(ctmId: any) {

    this.customersService.getbillorderByCtmId(ctmId).subscribe(
      (res) => {
        console.log(res)
        this.ordertList = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

    fetchDataorderdetailsId(ctmId: any) {

    // this.customersService.getorderdetailsId(ctmId).subscribe(
    //   (res) => {
    //     console.log(res)
    //     this.ordertList = res;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

   // Status A

   paymentorder() {
    console.log('submit updatebillorder Billid : ' + this.billIdStatusA)
      this.ngOnInit();
      Swal.fire({
        title: 'ชำระเงินสำเร็จ',
        text: "รอการตรวจสอบการชำระเงิน",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
      //   this.registerService.updatebillorder({ billId: this.billIdStatusA, billDate: '' }).subscribe(res => {
      //     console.log(' updatebillorder res : ', res)
      //   if (result.isConfirmed) {
      //     window.location.reload()

      //   }
      // })

      return;
    });
  }

  // บันทึกสลิป
  onSubmit() {
    console.log('submit updatebillorder Billid : ' + this.billIdStatusA)
    this.ngOnInit();
    this.submitted = true;
    // console.log('data :', this.updatebillForm.value)
    this.progress = 0;
    if (this.billForm2.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        text: 'Something went wrong!',
      })
      return;
    } else {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
      this.currentFile = file;
      this.customersService.upload(this.currentFile, this.billIdStatusA).subscribe(
          event => {
            Swal.fire({
              icon: 'success',
              title: 'ชำระเงินสำเร็จ',
              text: 'รอการตรวจสอบการชำระเงิน',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ตกลง'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()

              }
              return;
            });
          },
          error => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
          });
      }
    }
    }
  }

    // Status R ยกเลิกคำสั่งซื้อ
    updatebillstatusr(item: any) {
      console.log('submit updatebillorderstatusR Billid : ' + this.billIdStatusR)
      this.ngOnInit();
      Swal.fire({
        title: 'ยกเลิกคำสั่งซื้อสินค้า',
        text: "ต้องการยกเลิกคำสั่งซื้อ",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        // this.registerService.updatebillorderstatusR({ billId: this.billIdStatusR, }).subscribe(res => {
        //   console.log(' updatebillorderstatusR res : ', res)
        // if (result.isConfirmed) {
        //   window.location.reload()
        // }
  
        //   return;
        // })
      });
    }
    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
    }

    upload() {
      this.progress = 0;
  
      // if (this.selectedFiles) {
      //   const file: File | null = this.selectedFiles.item(0);
      //   console.log("this.billIdStatusA :::" + this.billIdStatusA)
      //   if (file) {
      //     this.currentFile = file;
      //     this.customersService.upload(this.currentFile, this.billIdStatusA, '').subscribe(
      //       event => {
      //         // if (event.type === HttpEventType.UploadProgress) {
      //         //   this.progress = Math.round(100 * event.loaded / event.total);
      //         // } else if (event instanceof HttpResponse) {
      //         //   this.message = event.body.message;
         
      //         // }
      //       },
      //       error => {
      //         this.progress = 0;
      //         this.message = 'Could not upload the file!';
      //       });
      //   }
      // }
    
    }

    get customerf() { return this.ctmmanagForm.controls; }
    get billf() { return this.billForm.controls; }
    get Orderdetailsf() { return this.OrderdetailsForm.controls; }
  
    get paymentDueDate() {
      var nextDays = new Date();      
      return this.datePipe.transform(nextDays.setDate(new Date().getDate() + 3), 'dd-MM-yyyy');
    }


}
