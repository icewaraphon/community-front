import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { CustomersService } from './modules/customers/customers.service';

import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'community-front';
  idleState = 'Not started.';
  timeOut = false;
  lastPing?: Date = undefined;
  isLogin: Boolean = false;

  public productList: any;
  public filterCaregory: any;
  public userName: any;

  searchText: any;
  totalItem !: any;


  constructor(
    private router: Router,
    private permissionsService: NgxPermissionsService,
    private http: HttpClient,
    private idle: Idle,
    private keepalive: Keepalive,
    private fb: FormBuilder,
    // private appService: AppService,
    private customerService: CustomersService,
    private activatedroute: ActivatedRoute,

     )
  {
    // this.setIdle();
    // right.initRolePermission();

   }
  


  ngOnInit(): void {
    // this.customerService.getProducts().subscribe(res => {
    //   this.totalItem = res.length;
    // })
    const role = ["DREE"];
    this.permissionsService.loadPermissions(role);
  }

  
  // gotoOrderBill() {
  //   this.router.navigateByUrl('/customer/customerorder');
  // }

  logOut() {
    sessionStorage.removeItem('user_role');
    this.router.navigate(['home']).then(() => {
      window.location.reload()
    });
  }

  initRolePermission() {
    const user_role = sessionStorage.getItem('user_role');
    const role: string = (user_role != null && user_role != undefined) ? user_role : '';
    this.isLogin = role ? true : false;
    this.permissionsService.addPermission(role);
    this.userName = sessionStorage.getItem('userName');
  }

  setIdle() {
    const user_role = sessionStorage.getItem('user_role');
    if (user_role) {
      console.log('start')
      // sets an idle timeout of 5 seconds, for testing purposes.
      this.idle.setIdle(20);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      this.idle.setTimeout(20);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timeOut = true;
      });
      this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

      // sets the ping interval to 15 seconds
      this.keepalive.interval(15);
      this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
      console.log('end')
      this.reset();
    }
  }

  reset() {
  
  }
  // title = 'community-front';


}
