import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit-approval-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,CommonModule,FormsModule],
  templateUrl: './credit-approval-dialog.component.html',
  styleUrl: './credit-approval-dialog.component.css'
})
export class CreditApprovalDialogComponent {
  public credit!: number;
  constructor(
    public dialogRef: MatDialogRef<CreditApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

