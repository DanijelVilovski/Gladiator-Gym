import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  userIsAdmin = false;
  private authListenerSubs!: Subscription;
  private isAdminListenerSubs!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
      this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
    });
    if (localStorage.getItem('isAdmin') == 'true')
    {
      this.userIsAdmin = true;
    }
    this.isAdminListenerSubs = this.authService
    .getIsAdminListener()
    .subscribe(isAdmin => {
      this.userIsAdmin = isAdmin;
    });  
  }
  
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.isAdminListenerSubs.unsubscribe();
  }

}
