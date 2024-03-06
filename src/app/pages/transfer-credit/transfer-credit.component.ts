import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, NgIf } from '@angular/common';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from '../../services/base-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';
import { Observable, map, of, startWith, switchMap, tap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';

@Component({
  selector: 'app-transfer-credit',
  standalone: true,
  imports: [
    FooterInComponent,
    SidebarComponent,
    NavbarInComponent,
    ReactiveFormsModule,
    NgIf,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
  providers: [UserService],
  templateUrl: './transfer-credit.component.html',
  styleUrl: './transfer-credit.component.css',
})
export class TransferCreditComponent implements OnInit {
  module: any;
  transferCreditsForm!: FormGroup;
  modules!: any[];
  options!: any[];
  filteredModules!: Observable<any[]>;
  successMessage = '';
  errorMessage = '';
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private titleService: Title,
    private baseUrlService: BaseUrlService,
    private userService: UserService,
    private Router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    const navigation = this.location.getState() as any;
    this.module = navigation.module || {};
    this.transferCreditsForm = this.fb.group({
      currentModuleID: [this.module.moduleId],
      currentModuleName: [this.module.moduleName],
      currentModuleCredit: [this.module.moduleCredit],
      transferToModuleName: [''],
    });
  }
  ngOnInit(): void {
    this.titleService.setTitle('Across | Student | Transfer Credits');
    // Initialize this.modules to an empty array to ensure it's defined.
    this.modules = [];

    this.filteredModules = this.transferCreditsForm
      .get('transferToModuleName')!
      .valueChanges.pipe(
        startWith(''),
        // Use RxJS switchMap to handle the asynchronous nature of the HTTP request.
        switchMap((value) => {
          const filterValue =
            typeof value === 'string' ? value.toLowerCase() : '';
          console.log(filterValue);
          return this.modules.length > 0
            ? of(this._filterModules(filterValue))
            : this.http
                .get(`${this.baseUrlService.baseUrl}/api/moduleNames`)
                .pipe(
                  tap((data: any) => (this.modules = data)), // Populate this.modules with the data.
                  map(() => this._filterModules(filterValue))
                );
        })
      );
  }

  /* ngAfterViewInit(): void {
    this.http.get(`${this.baseUrlService.baseUrl}/api/modules`).subscribe((data: any) => {
      this.modules = data;
      this.options=this.modules;
      console.log(this.modules);
    });
  }*/

  displayModuleName(module: any): string {
    console.log(module);
    return module && module.modName ? module.modName : '';
  }

  private _filterModules(name: string): any[] {
    console.log('name' + name);
    const filterValue = name?.toLowerCase() ?? '';
    return this.modules.filter((module) =>
      module.modName.toLowerCase().includes(filterValue)
    );
  }

  onSubmitCreditTransfer() {
    if (this.transferCreditsForm.valid) {
      const studentId = localStorage.getItem('userId');
      const formValue = this.transferCreditsForm.value;
      console.log(formValue);

      const requestData = {
        studentId: studentId,
        fromModuleId: this.module.moduleUId,
        toModuleName: formValue.transferToModuleName.modName,
      };

      console.log(requestData);
      const submitUrl = `${this.baseUrlService.baseUrl}/api/creditTransferReq`;

      this.http.post(submitUrl, requestData).subscribe({
        next: (response: any) => {
          console.log('Success:', response);
          this.successMessage = 'Request sent successfully!';
          const dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: { message: this.successMessage }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.Router.navigate(['/enrolled-modules']);
          });
         },
         error: (error) => {
          console.error('Error updating course:', error);
          this.errorMessage = error.message;
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: { message: this.errorMessage }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.Router.navigate(['/enrolled-modules']);
          });
        }
      });
    }
  }
}
