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
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = undefined;
  isLogin: Boolean = false;

  public productList: any;
  public filterCategory: any;
  public userName: any;

  searchText: any;
  totalItem!: any;

  constructor(
    private permissionsService: NgxPermissionsService,
    private idle: Idle,
    private keepalive: Keepalive,
    private route: Router
  ) {
    this.setIdle();
    this.initRolePermission();
  }

  ngOnInit(): void {}

  logOut() {
    sessionStorage.removeItem('user_role');
    this.route.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

  initRolePermission() {
    const user_role = sessionStorage.getItem('user_role');
    const role: string =
      user_role != null && user_role != undefined ? user_role : '';
    console.log('log role >>:', role);

    this.isLogin = role ? true : false;
    this.permissionsService.addPermission(role);
    this.userName = sessionStorage.getItem('userName');
    // this.userName = sessionStorage.getItem('Username');
  }

  setIdle() {
    const user_role = sessionStorage.getItem('user_role');
    if (user_role) {
      console.log('start');
      // sets an idle timeout of 5 seconds, for testing purposes.
      this.idle.setIdle(20);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      this.idle.setTimeout(20);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      this.idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
      });
      this.idle.onIdleStart.subscribe(
        () => (this.idleState = "You've gone idle!")
      );
      this.idle.onTimeoutWarning.subscribe(
        (countdown) =>
          (this.idleState = 'You will time out in ' + countdown + ' seconds!')
      );

      // sets the ping interval to 15 seconds
      this.keepalive.interval(15);
      this.keepalive.onPing.subscribe(() => (this.lastPing = new Date()));
      console.log('end');
      this.reset();
    }
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  // title = 'community-front';
}
