import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../services/course.service';
import { BaseUrlService } from '../../services/base-url.service';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [FormsModule, FooterInComponent, NavbarInComponent, SidebarComponent, ReactiveFormsModule, NgIf],
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  updateForm: FormGroup;
  updateSuccess: boolean = false;
  updateError: boolean = false;
  message: string = '';
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private titleService: Title,
    private baseUrlService: BaseUrlService,
    private courseService: CourseService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.updateForm = this.fb.group({
      courseID: '',
      courseName: '',
      courseDetails: '',
      courseDuration: '',
      courseUID: ''
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Update Course');
    this.route.params.subscribe(params => {
      const courseID = params['courseID'];
      this.fetchCourseDetails(courseID);
    });
  }

  fetchCourseDetails(courseID: string): void {
    console.log("inside fetch");
    this.http.get<any>(`${this.baseUrlService.baseUrl}/api/getCourse/${courseID}`).subscribe(course => {
      this.updateForm.patchValue(course);
    });
  }

  onSubmit(): void {
    const courseID = this.updateForm.value.courseID;

    const requestBody = {
      courseName: this.updateForm.value.courseName,
      courseDetails: this.updateForm.value.courseDetails,
      courseDuration: this.updateForm.value.courseDuration,
      courseUID: this.updateForm.value.courseUID
    };

    this.http.patch<any>(`${this.baseUrlService.baseUrl}/api/updateCourse/${courseID}`, requestBody).subscribe({
      next: (response) => {
        this.message = response.message;
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          data: { message: this.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/show-course']);
        });
      
      },
      error: (error) => {
        console.error('Error updating course:', error);
        this.message = error.message;
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: { message: this.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/show-course']);
        });
      }
    });
  }

  closeAlert(): void {
    this.updateSuccess = false;
  }
}

