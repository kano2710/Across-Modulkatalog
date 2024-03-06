import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { BaseUrlService } from '../../services/base-url.service';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-enrolled-student',
  standalone: true,
  imports: [NavbarInComponent, FooterInComponent, SidebarComponent, NgClass],
  templateUrl: './enrolled-student.component.html',
  styleUrl: './enrolled-student.component.css',
})

export class EnrolledStudentComponent implements OnInit {
  // totalCourses: number | null = null;
  totalModules: number | null = null;
  totalModulesOfEnrolledStud: number | null = null;
  totalUni: number | null = null;
  enrollmentStep!: number;
  constructor(
    private baseUrlService: BaseUrlService,
    private http: HttpClient,
    private router: Router,
    private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef,
    private titleService: Title
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd &&
            event.urlAfterRedirects === '/enrolled-student'
        )
      )
      .subscribe(() => {
        this.reloadData();
      });
  }
  exploreModules()
  {
    this.router.navigate(['/show-modules-en']);
  }
  enroll()
  {
    
  }
  reloadData() {
    console.log('EnrolledStudentComponent reloaded!');
  }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Student | Dashboard');
    this.http
      .get(`${this.baseUrlService.baseUrl}/api/moduleCount`)
      .subscribe((data: any) => {
        this.totalModules = data.totalModules;
      });

    this.http
      .get(`${this.baseUrlService.baseUrl}/api/uniCount`)
      .subscribe((data: any) => {
        this.totalUni = data.totalUni;
      });

    // this.http
    //   .get(`${this.baseUrlService.baseUrl}/api/moduleCountForEnrolledStud`)
    //   .subscribe((data: any) => {
    //     this.totalModulesOfEnrolledStud = data.totalModulesOfEnrolledStud;
    //   });
    // this.enrollmentService.currentStep.subscribe(step => {
    //   console.log(`New step received: ${step}`);
    //   this.enrollmentStep = step;
    //   console.log(this.enrollmentStep);
    //   this.cdr.detectChanges();
    // });

    this.loadEnrollmentStep();
  }

  loadEnrollmentStep(): void {
    const step = localStorage.getItem('enrollmentStep');
    this.enrollmentStep = step ? parseInt(step, 10) : 1; // Default to 1 if not found
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
