import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseUrlService } from './base-url.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: any = {};
  private platformId: Object;

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService, @Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  baseUrl = this.baseUrlService.baseUrl;

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('token') !== null;
    }
    return false;
  }
  setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  isUserFree(): boolean {
    const accountType = localStorage.getItem('accountType');
    return accountType === 'Free User';
  }
}
