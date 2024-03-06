import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private logoutService: LogoutService, private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.logout();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
