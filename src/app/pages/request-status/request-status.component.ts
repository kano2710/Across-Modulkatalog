import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { NgFor, NgIf } from '@angular/common';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-request-status',
  standalone: true,
  imports: [NgIf,NgFor,FooterInComponent,NavbarInComponent,SidebarComponent],
  templateUrl: './request-status.component.html',
  styleUrl: './request-status.component.css'
})
export class RequestStatusComponent {
  creditTransfers: any[] = [];
  noTransfers: boolean = false;

  constructor(private http: HttpClient,private baseUrlService: BaseUrlService, private titleService: Title ) { }

  ngOnInit() {
    this.titleService.setTitle('Across | Student | Request Status');
    const studentId = localStorage.getItem('userId');
    if (studentId) {
      this.http.get(`${this.baseUrlService.baseUrl}/api/fetchReqStatus/${studentId}`).subscribe({
        next: (data: any) => {
          this.creditTransfers = data;
          console.log(this.creditTransfers);
          this.noTransfers = this.creditTransfers.length === 0;
        },
        error: (error) => {
          console.error('Error fetching credit transfer requests:', error);
          this.noTransfers = true;
        }
      });
    }
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'badge-success';
      case 'Rejected':
        return 'badge-danger'; 
      case 'Pending':
        return 'badge-info'; 
      default:
        return 'badge-secondary'; 
    }
  }
  
}
