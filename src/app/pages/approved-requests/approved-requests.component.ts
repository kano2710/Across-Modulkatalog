import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgFor } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-approved-requests',
  standalone: true,
  imports: [NavbarInComponent, FooterInComponent, SidebarComponent, NgFor],
  templateUrl: './approved-requests.component.html',
  styleUrl: './approved-requests.component.css',
})
export class ApprovedRequestsComponent {
  approvedRequests: any[] = [];
  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Approved Requests');
    this.fetchPendingRequests();
  }

  fetchPendingRequests(): void {
    const adminID = localStorage.getItem('userId');
    if (adminID) {
      this.http
        .get(`${this.baseUrlService.baseUrl}/api/ApprovedRequest/${adminID}`)
        .subscribe({
          next: (data: any) => {
            this.approvedRequests = data;
          },
          error: (error) => {
            console.error('Error fetching credit transfer requests:', error);
          },
        });
    }
  }
}
