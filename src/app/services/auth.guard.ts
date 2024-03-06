import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }

      const allowedRoles = next.data['roles'];
      const userRole = localStorage.getItem('role');

      if (allowedRoles) {
        if (!userRole || !allowedRoles.includes(parseInt(userRole))) {
          this.router.navigate(['/login']);
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }
}
