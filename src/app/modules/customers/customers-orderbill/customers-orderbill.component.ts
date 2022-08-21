import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomersService } from '../customers.service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-customers-orderbill',
  templateUrl: './customers-orderbill.component.html',
  styleUrls: ['./customers-orderbill.component.css'],
})
export class CustomersOrderbillComponent implements OnInit {
  districts: any;
  amphurs: any;
  provinces: any;

  // categories: any;
  formValue!: FormGroup;
  // Product !: any;
  // grandTotal !: any;
  listCustomers!: any;
  proId: any;
  item: any;
  billId: any;

  // QR Code
  public myQrCode: any | string = null;

  public products: any = [];
  public productsNew: any = [];
  public productsNew2: any = [];
  public grandTotal!: number;
  // public grandTotal !: number;
  public filterCategory: any;
  public totalAmout!: number;
  public totalBalance!: number;
  public amount!: number;
  public freightTotal!: number;
  public orderDetailsList = new Array();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private customersService: CustomersService,
    private registerService: RegisterService,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe
  ) {}

  submitted = false;

  ctmmanagForm = this.fb.group({
    ctmId: [''],
    usName: [''],
    password: [''],
    titleType: [''],
    cardId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: [''],
    birthDate: [''],
    telPhon: [''],
    email: [''],
    cateInteres: [''],
    roleId: ['1'],
    addrass: [''],
    zipCode: [''],
    distId: [{ value: '', disabled: true }],
    amphur: [{ value: '', disabled: true }],
    province: [{ value: '', disabled: true }],

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
    this.customersService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.customersService.getTotalPrice();
    });

    //load dropdown all
    const ctmId = sessionStorage.getItem('user_id');
    this.initDropdown();
    this.getCustomersByCtmId(ctmId);
    // this.initAdminDataforEditById(this.ctmId);

    // รวมราคาสินค้าทั้งหมด
    let totalAmout = 0,
      amount = 0,
      freightTotal = 0,
      totalBalance = 0;
    this.products.map((a: any) => {
      amount += a.proPric * a.quantity;
      freightTotal += a.freight;
      totalAmout += a.proPric * a.quantity + a.freight;
      totalBalance += (a.proPric * a.quantity * 95) / 100;
      // (a.totalAmout * 95) / 100
    });

    this.amount = amount;
    this.freightTotal = freightTotal;
    this.totalAmout = totalAmout;
    this.totalBalance = totalBalance;

    //generate qrcode this here
    this.customersService.genQRCode(totalAmout).subscribe((res) => {
      //console.log('qr base64 ===>', res)
      this.myQrCode = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64, ${res}`
      );
    });
  }

  selectbillPric(billId: any) {
    console.log(billId);
    // this.customersService.getbillorById(billId).subscribe(
    //   (res) => {
    //     console.log(res)

    //     // this.totalAmout.setValue(res[0].totalAmout);
    //     //generate qrcode this here
    //     // this.customersService.genQRCode(res[0].totalAmout).subscribe(res => {
    //     //   console.log('qr base64 ===>', res)
    //     //   this.myQrCode = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res}`);
    //     // });

    //   },

    // (error) => {
    //   console.log(error);
    // }
    // );
  }

  saveBillOrder() {
    // เพิ่มข้อมูลลง orderdetail
    console.log('dataproducts res : ', this.products);
    const ctmId = sessionStorage.getItem('user_id');
    let billTotalamout = 0;
    let billFreighttotal = 0;
    let billPric = 0;
    this.products.forEach((a: any) => {
      billTotalamout += a.proPric * a.quantity;
      billFreighttotal += a.freight;
      this.orderDetailsList.push({
        billId: 0,
        ctmId: ctmId,
        detailsFreight: a.freight,
        detailsId: 0,
        parcelNumber: '',
        proId: a.proId,
        quantity: a.quantity,
        status: 'A',
        totalAmout: a.proPric * a.quantity,
        totalBalance: a.proPric * a.quantity,
        totalOrder: a.proPric * a.quantity + a.freight,
        unit: a.proUnit,
        unitPrice: a.proPric,
      });
    });

    let billorder = {
      balance: 0,
      //billCreate: this.buildCurrentDate(),
      //billDate: this.buildCurrentDate(),
      billFreighttotal: billFreighttotal,
      billId: 0,
      billPric: (billTotalamout + billFreighttotal),
      billTotalamout: billTotalamout,
      billUpdate: '',
      ctmId: ctmId,
      pmMethod: 'QR-CODE',
      orderdetails: this.orderDetailsList,
    };
    console.log('Create  dataCreate billorder : ', billorder);
    this.registerService.createbillorder(billorder).subscribe((res) => {
      console.log('Create createbillorder res : ', res);
      return;
    });
  }

  buildCurrentDate() {
    //2022-08-21 21:38:20      
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
  }

  btnConfirmPayment() {
    this.saveBillOrder();
    this.router.navigateByUrl('/customers/customersorder');
  }

  groupArrayOfObjects(list: any, key: any) {
    return list.reduce(function (rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  initDropdown() {
    // this.customerService.getAllDistrict().subscribe(res => { this.districts = res; });
    // this.customersService.getAllAmphur().subscribe(res => { this.amphurs = res; });
    // this.customersService.getAllProvince().subscribe(res => { this.provinces = res; })
  }

  loadUserZipCode(distId: any) {
    console.log('zipCode' + distId);
    // this.customersService.getDistrictById(distId).subscribe(
    //   res => {
    //     if (res) {
    //       this.ctmmanagForm.patchValue(
    //         {
    //           district: res.distNameTh,
    //           amphur: res.amphur.ampNameTh,
    //           province: res.province.pvNameTh,

    //           districtinput: res.distNameTh,
    //           amphurinput: res.amphur.ampNameTh,
    //           provinceinput: res.province.pvNameTh,
    //         }
    //       )
    //     }
    //   },
    // error => {
    //   this.ctmmanagForm.patchValue(
    //     {
    //       district: '',
    //       amphur: '',
    //       province: ''
    //     }
    //   )
    // }
    // );
  }

  getCustomersByCtmId(ctmId: any) {
    this.customersService.getCustomersByCtmId(ctmId).subscribe(
      (res) => {
        console.log('!!!!!!!!!!!!res data!!!!!!!!!!!!', res);
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
        //set default select dropdown
        //this.loadUserZipCode(res.distId);

        this.customersService
          .getDistrictByDistrictId(res.distId)
          .subscribe((response) => {
            console.log('getDistrictByDistrictId data :', response);
            if (response) {
              this.ctmmanagForm.patchValue({
                district: response.distNameTh,
                amphur: response.amphurDto?.ampNameTh,
                province: response.provinceDto?.pvNameTh,
                districtinput: response.distNameTh,
                amphurinput: response.amphurDto?.ampNameTh,
                provinceinput: response.provinceDto?.pvNameTh,
              });
            }
          });
      }
      // (error) => {
      //   console.log('!!!!!!!!!!!!!!error!!!!!!!!!!', error);
      // }
    );
  }

  paymentorder() {
    Swal.fire({
      title: 'ชำระเงินสำเร็จ',
      text: 'รอการตรวจสอบการชำระเงิน',
      icon: 'success',
      // showCancelButton: true,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
    });
  }
  get customerf() {
    return this.ctmmanagForm.controls;
  }
  get billf() {
    return this.billForm.controls;
  }
  get Orderdetailsf() {
    return this.OrderdetailsForm.controls;
  }
}

// onSubmitUser(item: any) {
//   this.submitted = true;
//   console.log('data :', this.DataUserForm.value)
//   if (this.DataUserForm.invalid) {
//     Swal.fire({
//       icon: 'warning',
//       title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
//       text: '',
//     })
//   } else {
//     Swal.fire({
//       title: 'ยืนยันการทำรายการ',
//       text: "ต้องการยืนยันการสั่งยาหรือไม่ ?",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#198754',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'ยืนยัน',
//       cancelButtonText: 'ปิด'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.doctorAdddrugService.createBilldrug(this.DataUserForm.value).subscribe(res => {
//           console.log('create Billdrug res : ', res)
//           if (res) {
//             // add service save bil detail here
//             this.cartDrugs.forEach(data => {
//               data['billdrugDetailId'] = 0;
//               data['billId'] = res.billId,
//                 // data['drugTotalPrice'] = res.drugTotalPrice,
//                 this.cartDrugsForSaveDetails.push(data);
//             });
//             console.log('cartDrugsForSaveDetails : ', this.cartDrugsForSaveDetails)
//             //for save detail
//             this.doctorAdddrugService.createBilldrugDetails(this.cartDrugsForSaveDetails).subscribe(response => {
//               console.log('create Billdrug Details res : ', response)
//             })
//           }
//         });
//         Swal.fire({
//           icon: 'success',
//           title: 'บันทึกข้อมูลสำเร็จ',
//           text: '',
//           confirmButtonText: 'พิมพ์ใบสั่งยา',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             this.router.navigate(['doctor/treat/printdatadrug']);
//           }
//         })
//       }
//     })
//   }
// }
