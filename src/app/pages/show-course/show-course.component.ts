import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { UniversityService } from '../../services/university.service';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';
@Component({
  selector: 'app-show-course',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    SidebarComponent,
    NavbarInComponent,
    FooterInComponent,
  ],
  templateUrl: './show-course.component.html',
  styleUrl: './show-course.component.css',
})
export class ShowCourseComponent {
  courses: any[] = [];
  user: any = {};
  message: string = '';
  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    private router: Router,
    private universityService: UniversityService,
    private courseService: CourseService,
    private titleService: Title,
    public dialog: MatDialog,

  ) {}
  deleteSuccess: boolean = false;
  deleteError: boolean = false;
  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Courses');
    this.loadCourses();
  }

  processUserData(userData: any): any {
    let uniId: any;
    for (let key in userData) {
      if (userData[key] === 'NaN') {
        userData[key] = '';
      }

      if (key === 'university' && userData[key] != null) {
        const universityParts = userData[key].split(':');
        if (universityParts.length > 0) {
          uniId = universityParts[universityParts.length - 1];
        }
      }
    }
    return uniId;
  }

  loadCourses() {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    if (userId && userRole) {
      const queryParams = `userId=${userId}&role=${userRole}`;

      this.http
        .get<any>(`${this.baseUrlService.baseUrl}/api/user?${queryParams}`)
        .subscribe(
          (data) => {
            const uniId = this.processUserData(data);
            if (uniId) {
              this.courseService.getCourses(uniId).subscribe(
                (courses: any[]) => {
                  this.courses = courses;
                  console.log(this.courses);
                },
                (error) => {
                  console.error('Error fetching courses:', error);
                }
              );
            }
          },
          (error) => {
            console.error('Error fetching user details:', error);
          }
        );
    } else {
      console.error('User ID or User Role not found in localStorage');
    }
  }

  editCourse(courseID: any) {
    console.log(courseID);
    this.router.navigate(['/update-course', courseID]);
  }
  deleteCourse(courseID: any) {
    this.courseService.deleteCourse(courseID).subscribe({
      next: (response: any) => {
        this.message="Course deleted Successfully!";
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          data: { message: this.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.loadCourses();
        });
       },
        
       error: (error) => {
        console.error('Error updating course:', error);
        this.message = error.message;
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: { message: this.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.loadCourses();
        });
      }
    });
  }
}
