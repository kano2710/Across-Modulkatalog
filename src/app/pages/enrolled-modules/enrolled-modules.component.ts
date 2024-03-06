import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { NgFor, NgIf } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-enrolled-modules',
  standalone: true,
  imports: [
    NgFor,
    FooterInComponent,
    NavbarInComponent,
    SidebarComponent,
    NgIf,
  ],
  templateUrl: './enrolled-modules.component.html',
  styleUrl: './enrolled-modules.component.css',
})
export class EnrolledModulesComponent {
  modules: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Across | Student | Enrolled Modules');
    this.loadEnrolledModules();
  }

  private loadEnrolledModules() {
    const studentId = localStorage.getItem('userId');
    console.log(studentId);
    this.http
      .get(
        `${this.baseUrlService.baseUrl}/api/enrollModule/modules/${studentId}`
      )
      .subscribe(
        (data: any) => {
          this.modules = data;
          console.log(this.modules);
        },
        (error) => {
          console.error('Error fetching enrolled modules:', error);
        }
      );
  }

  cancelEnrollment(moduleId: string) {
    const studentId = localStorage.getItem('userId');
    this.http
      .delete(
        `${this.baseUrlService.baseUrl}/api/cancelEnrollment/${studentId}/modules/${moduleId}`
      )
      .subscribe({
        next: (response) => {
          this.successMessage = 'Enrollment canceled successfully.';
          this.errorMessage = '';
          console.log('Enrollment canceled successfully', response);
          this.loadEnrolledModules();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error canceling enrollment. Please try again.';
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
  }
  
  requestCreditTransfer(module: any) {
    this.router.navigate(['/credit-transfer-form'], { state: { module } });
  }
}
