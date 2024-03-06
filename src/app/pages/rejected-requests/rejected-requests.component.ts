import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseUrlService } from '../../services/base-url.service';
import { CommonModule } from '@angular/common';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rejected-requests',
  standalone: true,
  imports: [
    CommonModule,
    NavbarInComponent,
    SidebarComponent,
    FooterInComponent,
  ],
  templateUrl: './rejected-requests.component.html',
  styleUrl: './rejected-requests.component.css',
})
export class RejectedRequestsComponent {
  rejectedRequests: any[] = [];
  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Rejected Requests');
    this.fetchPendingRequests();
  }

  fetchPendingRequests(): void {
    const adminID = localStorage.getItem('userId');
    if (adminID) {
      this.http
        .get(`${this.baseUrlService.baseUrl}/api/RejectedRequest/${adminID}`)
        .subscribe({
          next: (data: any) => {
            this.rejectedRequests = data;
            console.log(this.rejectedRequests);
          },
          error: (error) => {
            console.error('Error fetching credit transfer requests:', error);
          },
        });
    }
  }
}
