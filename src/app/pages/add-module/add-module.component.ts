import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { NgFor, NgIf } from '@angular/common';
import { BaseUrlService } from '../../services/base-url.service';
import { CourseService } from '../../services/course.service';
import { ModuleService } from '../../services/module.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';
@Component({
  selector: 'app-add-module',
  standalone: true,
  imports: [
    NavbarInComponent,
    FooterInComponent,
    SidebarComponent,
    NgFor,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css'],
})

export class AddModuleComponent implements OnInit {
  courses: any[] = [];
  selectedFile?: File;
  selectedCourseID?: string;
  selectedFileName = 'Choose file';
  message: string = '';
  isSuccess: boolean = false;
  uniId: string = '';
  moduleForm!: FormGroup;
  courseForm: any;
  submitAttempted = false;
  showAlert = false;
  successMessage = '';
  errorMessage = '';
  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    private router: Router,
    private courseService: CourseService,
    private moduleService: ModuleService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private titleService: Title,

  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Add Module');
    this.loadCourses();
    // Initialize the form
    this.moduleForm = this.fb.group({
      moduleID: ['', Validators.required],
      moduleName: ['', Validators.required],
      moduleDescription: ['', Validators.required],
      moduleDuration: ['', Validators.required],
      moduleMOE: ['', Validators.required],
      moduleREQ: ['', Validators.required],
      moduleCredit: ['', Validators.required],
    });
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.moduleForm.get(fieldName);

    if (field) {
      return field.invalid && (field.dirty || field.touched);
    } else {
      return false;
    }
  }
  isAnyFieldEmpty(): boolean {
    for (const key in this.moduleForm.controls) {
      if (this.moduleForm.controls.hasOwnProperty(key)) {
        const control = this.moduleForm.get(key);
        if (control) {
          if (
            !control.value ||
            (typeof control.value === 'string' && control.value.trim() === '')
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  loadCourses(): void {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    if (userId && userRole) {
      const queryParams = `userId=${userId}&role=${userRole}`;
      this.http
        .get<any>(`${this.baseUrlService.baseUrl}/api/user?${queryParams}`)
        .subscribe({
          next: (data) => {
            const uniId = this.processUserData(data);
            this.uniId = uniId ? uniId : '';
            if (uniId) {
              this.courseService.getCourses(uniId).subscribe({
                next: (courses) => {
                  this.courses = courses;
                },
                error: (error) =>
                  console.error('Error fetching courses:', error),
              });
            }
          },
          error: (error) =>
            console.error('Error fetching user details:', error),
        });
    } else {
      console.error('User ID or User Role not found in localStorage');
    }
  }

  processUserData(userData: any): string | null {
    let uniId: string | null = null;
    for (let key in userData) {
      if (userData.hasOwnProperty(key)) {
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
    }
    return uniId;
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  onCourseSelected(event: Event): void {
    const element = event.target as HTMLSelectElement;
    this.selectedCourseID = element.value;
  }

  onSubmit(): void {
    this.submitAttempted = true;
  
      if (this.uniId == 'TUC_2024') {
        if (this.selectedFile && this.selectedCourseID) {
          const formData = new FormData();
          formData.append('courseID', this.selectedCourseID);
          formData.append('file', this.selectedFile, this.selectedFile.name);
          // console.log(formData);
          this.http
            .post(`${this.baseUrlService.baseUrl}/api/addModule`, formData)
            .subscribe(
              (response: any) => {
                // console.log('Upload response:', response);
                this.successMessage = 'Module Added successfully!';
                const dialogRef = this.dialog.open(SuccessDialogComponent, {
                  data: { message: this.successMessage }
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  this.router.navigate(['./modules-list']);
                });
               },
               
            
              (error: HttpErrorResponse) => {
                console.error('Upload error:', error.error.message);
                this.errorMessage =
                  'Error occurred during adding Module. Please try again!';
                  const dialogRef = this.dialog.open(ErrorDialogComponent, {
                    data: { message: this.errorMessage }
                  });
              
                  dialogRef.afterClosed().subscribe(result => {
                    this.router.navigate(['/add-module']);
                  });
              }
            );
        } else {
          console.error('File and course ID are required');
        }
      } else {
        console.log(this.moduleForm);
        if (this.moduleForm.valid && this.selectedCourseID) {
          const formData = new FormData();
          formData.append('courseID', this.selectedCourseID);
          formData.append('moduleID', this.moduleForm.get('moduleID')?.value);
          formData.append(
            'moduleName',
            this.moduleForm.get('moduleName')?.value
          );
          formData.append(
            'moduleDescription',
            this.moduleForm.get('moduleDescription')?.value
          );
          formData.append(
            'moduleDuration',
            this.moduleForm.get('moduleDuration')?.value
          );
          formData.append('moduleMOE', this.moduleForm.get('moduleMOE')?.value);
          formData.append('moduleREQ', this.moduleForm.get('moduleREQ')?.value);
          formData.append(
            'moduleCredit',
            this.moduleForm.get('moduleCredit')?.value
          );

          console.log(this.moduleForm);
          this.http
            .post(
              `${this.baseUrlService.baseUrl}/api/addModule/otherUniversity`,
              formData
            )
            .subscribe(
              (response: any) => {
                this.successMessage = 'Module added successfully!';
              
                const dialogRef = this.dialog.open(SuccessDialogComponent, {
                  data: { message: this.successMessage }
                });
            
                dialogRef.afterClosed().subscribe(result => {
                  this.router.navigate(['./modules-list']);
                });
               },

               (error: HttpErrorResponse) => {
                console.error('Upload error:', error.error.message);
                this.errorMessage =
                  'Error occurred during adding Module. Please try again!';
                  const dialogRef = this.dialog.open(ErrorDialogComponent, {
                    data: { message: this.errorMessage }
                  });
              
                  dialogRef.afterClosed().subscribe(result => {
                    this.router.navigate(['/add-module']);
                  });
              }
            );
        }
      }
  
  }

  closeAlert() {
    this.showAlert = false;
  }
}
