import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgClass, MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isClicked = false;

  constructor(private router: Router) {
    // Reset the clicked state on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isClicked = false;
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isClicked = true;
  }
}

