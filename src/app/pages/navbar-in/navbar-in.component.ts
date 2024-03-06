import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar-in',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar-in.component.html',
  styleUrl: './navbar-in.component.css'
})
export class NavbarInComponent implements OnInit{
  
  userRole: string | null = null;

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }

  showSectionForRoles(roles: string[]): boolean {
    return roles.includes(this.userRole || '');
  }

  constructor(private logoutService: LogoutService, private router: Router) { }

  logout() {
    this.router.navigate(['/logout']);
  }
}
