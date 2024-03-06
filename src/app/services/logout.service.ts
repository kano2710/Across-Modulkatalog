import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BaseUrlService } from './base-url.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private http: HttpClient, private router: Router, private baseUrlService: BaseUrlService) { }

  logout(): Observable<any> {
    const baseUrl = this.baseUrlService.baseUrl;
    this.revokeTokens();
    return this.http.post(`${baseUrl}/api/logout`, {}).pipe(
      catchError((error) => {
        console.error('Error logging out:', error);
        return throwError(error);
      })
    );
  }

  public clearSessionData() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('authToken');
  }

  private revokeTokens() {
    const baseUrl = this.baseUrlService.baseUrl;
    return this.http
      .post(`${baseUrl}/api/logout`, {})
      .pipe(
        catchError((error) => {
          console.error('Error revoking tokens:', error);
          return throwError(error);
        })
      );
  }
}