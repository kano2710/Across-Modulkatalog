import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { CommonModule, NgFor } from '@angular/common';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { CreditApprovalDialogComponent } from '../credit-approval-dialog/credit-approval-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';

@Component({
  selector: 'app-admin-credit-transfer-request',
  standalone: true,
  imports: [
    NgFor,
    NavbarInComponent,
    SidebarComponent,
    FooterInComponent,
    NgFor,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './admin-credit-transfer-request.component.html',
  styleUrl: './admin-credit-transfer-request.component.css',
})
export class AdminCreditTransferRequestComponent {
  creditTransferRequests: any[] = [];
  message: string = '';
  constructor(
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private titleService: Title,

  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Credit Transfer Requests');
    this.fetchPendingRequests();
  }

  fetchPendingRequests(): void {
    const adminID = localStorage.getItem('userId');
    if (adminID) {
      this.http
        .get(
          `${this.baseUrlService.baseUrl}/api/AdminCreditTransferRequest/${adminID}`
        )
        .subscribe({
          next: (data: any) => {
            this.creditTransferRequests = data;
          },
          error: (error) => {
            console.error('Error fetching credit transfer requests:', error);
          },
        });
    }
  }

  approve(requestId: any): void {
    const dialogRef = this.dialog.open(CreditApprovalDialogComponent, {
      width: '250px',
      data: { requestId: requestId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.http
          .post(`${this.baseUrlService.baseUrl}/api/ApproveCreditTransfer`, {
            requestId: requestId,
            credit: result,
          })
          .subscribe({
            next: (response) => {
              console.log(response);
              this.message="Request Approved Successfully!";
              const dialogRef = this.dialog.open(SuccessDialogComponent, {
                data: { message: this.message }
              });
          
              dialogRef.afterClosed().subscribe(result => {
                this.fetchPendingRequests();
              });
              this.fetchPendingRequests(); 
            },
            error: (error) => {
              console.error('Error updating course:', error);
              this.message = error.message;
              const dialogRef = this.dialog.open(ErrorDialogComponent, {
                data: { message: this.message }
              });
          
              dialogRef.afterClosed().subscribe(result => {
                this.fetchPendingRequests();
              });
            }
          });
      }
    });
  }
  reject(requestId: any): void {
    
    this.http.post(`${this.baseUrlService.baseUrl}/api/RejectCreditTransfer`, { requestId: requestId, credit: "0" })
    .subscribe({
      next: (response) => {
        console.log(response);
        this.message="Request Rejected Successfully!";
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          data: { message: this.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.fetchPendingRequests();
        });
        this.fetchPendingRequests(); 
      },
      error: (error) => {
        console.error('Error updating course:', error);
        this.message = error.message;
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: { message: this.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.fetchPendingRequests();
        });
      }
    });
 
  }
}
