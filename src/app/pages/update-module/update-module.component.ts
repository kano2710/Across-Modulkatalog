import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModuleService } from '../../services/module.service';
import { BaseUrlService } from '../../services/base-url.service';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { CommonModule, NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-module',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, NavbarInComponent, FooterInComponent, NgIf, FormsModule, CommonModule],
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent implements OnInit {
  updateForm: FormGroup;
  updateSuccess: boolean = false;
  showAlert: boolean = false;
  updateError: boolean = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private titleService: Title,
    private baseUrlService: BaseUrlService,
    private moduleService: ModuleService,
    private router: Router,
    public dialog: MatDialog,

  ) {
    this.updateForm = this.fb.group({
      modID: '',
      modName: '',
      modDesc: '',
      modCredit: '',
      modDuration: '',
      modMOE: '',
      modREQ: ''
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Update Module');
    this.route.params.subscribe(params => {
      const modID = params['modID'];
      this.fetchModuleDetails(modID);
    });

  }




  fetchModuleDetails(modID: string): void {
    // Example using HttpClient directly
    this.http.get<any>(`${this.baseUrlService.baseUrl}/api/modules/${modID}`).subscribe(module => {
      // console.log(module);
      this.updateForm.patchValue(module);
    });


  }

  onSubmit(): void {
    console.log('Updating module:', this.updateForm.value);

    const modID = this.updateForm.value.modID;


    const requestBody = {
      modName: this.updateForm.value.modName,
      modDesc: this.updateForm.value.modDesc,
      modCredit: this.updateForm.value.modCredit,
      modDuration: this.updateForm.value.modDuration,
      modMOE: this.updateForm.value.modMOE,
      modREQ: this.updateForm.value.modREQ
    };


    this.http
      .patch<any>(`${this.baseUrlService.baseUrl}/api/updateModule/${modID}`, requestBody)
      .subscribe({
        next: (response: any) => {
          this.message="Module updated Successfully!";
          const dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: { message: this.message }
          });
      
          dialogRef.afterClosed().subscribe((result: any) => {
            this.router.navigate(['/module-list']);
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




