import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from '../../services/base-url.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';
@Component({
  selector: 'app-similarity-details',
  standalone: true,
  imports: [NgFor,NgIf,MatExpansionModule,CommonModule, NavbarInComponent, SidebarComponent, FooterInComponent],
  templateUrl: './similarity-details.component.html',
  styleUrl: './similarity-details.component.css'
})
export class SimilarityDetailsComponent {
  similarityResults: any[] = [];
  selectedModule: any;
 userRole: any;
 successMessage: string = '';
  errorMessage: string = '';
  message: string = '';

  constructor(private router: Router, private http: HttpClient,  private titleService: Title, 
    public dialog: MatDialog, private baseUrlService:BaseUrlService, private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;
    this.selectedModule = state?.selectedModule;
    this.similarityResults = state?.similarityResults || [];
    
  }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Similarity Details');
    if (this.similarityResults.length === 0) {
      console.warn('No similarity results available');
    }
    this.userRole = localStorage.getItem('role');
    console.log('User role:', this.userRole);

  }

  requestParticipation(modID: any): void {
    const requestPayload = {
      studentId: localStorage.getItem('userId'), 
      moduleId: modID
    };

    console.log('Requesting participation', requestPayload);
    this.http.post(`${this.baseUrlService.baseUrl}/api/enrollModule`, requestPayload).subscribe({
      next: (response: any) => {
        this.message="Enrollment Successful!";
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          data: { message: this.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['/enrolled-student']);
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

}
