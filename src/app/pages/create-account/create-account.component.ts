import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseUrlService } from '../../services/base-url.service';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';

interface AccountRequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mainOption: string;
  subOption: number;
  userRole: number;
  university?: string;
}

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  selectedMainOption: string = '';
  selectedSubOption: number = 0;
  showUniversityDropdown: boolean = false;
  university: string = '';
  universities: any[] = [];

  studentOptions = [
    { id: 'enrolledStudent', value: 2, label: 'Enrolled Student' },
    { id: 'exchangeStudent', value: 3, label: 'Exchange Student' },
    { id: 'prospectiveStudent', value: 1, label: 'Prospective Student' },
  ];

  universityOptions = [
    { id: 'universityExamOfficer', value: 4, label: 'Exam Officer' },
    { id: 'universityProfessor', value: 5, label: 'Professor' },
    { id: 'universityAdmin', value: 6, label: 'Admin' },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private baseUrlService: BaseUrlService,
    protected titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Across | Create Account');
    this.fetchUniversities();
  }

  createAccount() {
    if (
      !this.firstname ||
      !this.lastname ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'All fields are required to Create an Across Account';
      this.dialog.open(ErrorDialogComponent,  {
        data: { message: this.errorMessage }
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Both Passwords do not match.';
      this.dialog.open(ErrorDialogComponent,  {
        data: { message: this.errorMessage }
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Enter a valid email address.';
      this.dialog.open(ErrorDialogComponent,  {
        data: { message: this.errorMessage }
      });
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password should be at least 8 characters long.';
      this.dialog.open(ErrorDialogComponent,  {
        data: { message: this.errorMessage }
      });
      return;
    }

    const requestBody: AccountRequestBody = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      mainOption: this.selectedMainOption,
      subOption: this.selectedSubOption,
      userRole: this.selectedSubOption,
    };
    if (this.university != null) {
      requestBody.university = this.university;
    }

    const baseUrl = this.baseUrlService.baseUrl;
    this.http.post(`${baseUrl}/api/create-account`, requestBody).subscribe(
      (response: any) => {
        this.errorMessage = 'Account created successfully.';
        const dialogRef = this.dialog.open(SuccessDialogComponent,  {
          data: { message: this.errorMessage }
        });
        dialogRef.afterClosed().subscribe((result: any) => {
          this.router.navigate(['/login']);
        });
       
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 409) {
          this.errorMessage = 'Email Address already exists.';
        } else {
          this.errorMessage = 'An error occurred while creating the account.';
        }
        this.dialog.open(ErrorDialogComponent,  {
          data: { message: this.errorMessage }
        });
      }
    );
  }

  selectMainOption(mainOption: string) {
    this.selectedMainOption = mainOption;
    this.selectedSubOption = 0;
  }

  selectSubOption(subOption: number, mainOption: string) {
    this.selectedMainOption = mainOption;
    this.selectedSubOption = subOption;
    this.showUniversityDropdown = [2, 4, 5, 6].includes(subOption);
  }

  fetchUniversities() {
    this.http
      .get<string[]>(`${this.baseUrlService.baseUrl}/api/universities`)
      .subscribe(
        (data) => {
          this.universities = data;
          console.log(this.universities);
        },
        (error) => {
          console.error('Error fetching universities:', error);
        }
      );
  }
}
