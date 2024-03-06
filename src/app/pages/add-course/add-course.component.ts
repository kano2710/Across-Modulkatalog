import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { BaseUrlService } from '../../services/base-url.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';
import { UniversityService } from '../../services/university.service';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, FooterInComponent, SidebarComponent, NavbarInComponent]
})

export class AddCourseComponent implements OnInit {
  message: string = '';
  isSuccess: boolean = false;
  courseForm!: FormGroup;
  user: any = {};

  constructor(private universityService: UniversityService, public router : Router,
    public dialog: MatDialog, private http: HttpClient, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object, private baseUrlService: BaseUrlService, private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle('Across | Admin | Add Course');

    // Initialize the form
    this.courseForm = this.fb.group({
      CourseID: ['', Validators.required],
      CourseName: ['', Validators.required],
      CourseDetails: [''],
      CourseDuration: ['', Validators.required],
    });

    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    if (userId && userRole) {

      // Check if both userId and userRole are available
      // console.log(userRole);

      const queryParams = `userId=${userId}&role=${userRole}`; // Construct query parameters

      this.http.get<any>(`${this.baseUrlService.baseUrl}/api/user?${queryParams}`).subscribe(data => {
        // console.log(data);
        this.user = this.processUserData(data);

        // console.log(this.user);
      }, error => {
        console.error('Error fetching user details:', error);
      });
    } else {
      console.error('User ID or User Role not found in localStorage');
    }



  }

  processUserData(userData: any): any {

    for (let key in userData) {
      if (userData[key] === 'NaN') {
        userData[key] = '';
      }

      if (key === 'university' && userData[key] != null) {
        const universityParts = userData[key].split(':');
        if (universityParts.length > 0) {
          const uniId = universityParts[universityParts.length - 1];
          userData[key] = uniId;
          // console.log("uniid:" + userData[key]);
          /*  this.universityService.getUniversityDetails(uniId).subscribe(
              (universityData) => {
                console.log(universityData.name);
                userData[key]=universityData.name

              },
              (error) => {
                console.error('Error fetching university details:', error);
              }
            );*/
        }

      }
    }

    return userData;
  }

  addCourse(): void {
    // Check if the form is valid
    if (this.courseForm.valid) {
      const formData = new FormData();
      formData.append('CourseID', this.courseForm.get('CourseID')?.value);
      formData.append('CourseName', this.courseForm.get('CourseName')?.value);
      formData.append('CourseDetails', this.courseForm.get('CourseDetails')?.value);
      formData.append('CourseDuration', this.courseForm.get('CourseDuration')?.value);
      formData.append('University', this.user.university);

      // console.log(formData);

      this.http.post(`${this.baseUrlService.baseUrl}/api/addCourse`, formData).subscribe(
        (response: any) => {
          console.log('Upload response:', response);

          const dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: { message: response.message }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/show-course']);
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Upload error:', error.error.message);
          this.message = error.error.message || 'Error occurred while adding course';
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: { message: this.message }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/show-course']);
          });
        }
      );
    } else {
      // Form is not valid
      this.message = 'Please fill all the required fields.';
      this.isSuccess = false;
    }
  }

  closeAlert(): void {
    this.message = '';
  }
}