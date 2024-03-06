import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { UserService } from '../../services/user.service';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  user: any = {};
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Across | Login');
  }

  async login() {
    const requestBody = { email: this.email, password: this.password };
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter Email and Password.';
      this.dialog.open(ErrorDialogComponent,  {
        data: { message: this.errorMessage }
      });
      return;
    }

    try {
      const baseUrl = this.baseUrlService.baseUrl;
      const response: any = await this.http
        .post(`${baseUrl}/api/login`, requestBody)
        .toPromise();

      localStorage.setItem('userId', response.user.id);
      const userRole = response.user.userRole;
      localStorage.setItem('role', userRole);
      localStorage.setItem('authToken', response.token);
      this.userService.setLoggedInUser(response.user);

      this.navigateToUserRole(userRole);
    } catch (error: any) {
      console.error(error);
      if (error.status === 401) {
        this.errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.status === 403) {
        this.errorMessage = 'Please wait until university verifies you.';
      } else {
        this.errorMessage =
          'An error occurred while logging in. Please try again later.';
      }
      this.dialog.open(ErrorDialogComponent,  {
        data: { message: this.errorMessage }
      });
    }
  }

  private navigateToUserRole(userRole: number) {
    switch (userRole) {
      case 1:
        this.router.navigate(['/prospective-student']);
        break;
      case 2:
        this.router.navigate(['/enrolled-student']);
        break;
      case 3:
        this.router.navigate(['/exchange-student']);
        break;
      case 4:
        this.router.navigate(['/exam-officer']);
        break;
      case 5:
        this.router.navigate(['/professors']);
        break;
      case 6:
        this.router.navigate(['/admin-dsb']);
        break;
      default:
        this.router.navigate(['/home']);
        break;
    }
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
