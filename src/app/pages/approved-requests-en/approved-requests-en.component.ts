import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-approved-requests-en',
  standalone: true,
  imports: [
    FooterInComponent,
    NavbarInComponent,
    SidebarComponent,
    CommonModule,
  ],
  templateUrl: './approved-requests-en.component.html',
  styleUrl: './approved-requests-en.component.css',
})
export class ApprovedRequestsEnComponent {
  creditTransfers: any[] = [];
  noTransfers: boolean = false;

  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Across | Student | Approved Requests');
    const studentId = localStorage.getItem('userId');
    if (studentId) {
      this.http
        .get(
          `${this.baseUrlService.baseUrl}/api/getApprovedRequests/${studentId}`
        )
        .subscribe({
          next: (data: any) => {
            this.creditTransfers = data;
            console.log(this.creditTransfers);
            this.noTransfers = this.creditTransfers.length === 0;
          },
          error: (error) => {
            console.error('Error fetching credit transfer requests:', error);
            this.noTransfers = true;
          },
        });
    }
  }
  //  downloadTranscript(toModuleId: string) {
  //   const studentId = localStorage.getItem('userId');
  //     this.http.get(`${this.baseUrlService.baseUrl}/api/downloadTranscript/${studentId}?modId=${toModuleId}`, { responseType: 'blob' }).subscribe(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'transcript.pdf';
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     });
  //   }

  viewTranscript(module: any): void {
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
      console.error('User ID not found in local storage.');
      return;
    }
    this.http
      .get<any>(
        `${this.baseUrlService.baseUrl}/api/downloadTranscript/${studentId}?modId=${module.toModuleId}`
      )
      .subscribe({
        next: (data) => {
          console.log('Transcript data:', data);
          this.router.navigateByUrl('/transcript', { state: { module: data } });
        },
        error: (error) => {
          console.error('Error fetching transcript data:', error);
        },
      });
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
