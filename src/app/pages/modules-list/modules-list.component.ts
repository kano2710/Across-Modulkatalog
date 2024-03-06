import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from '../../services/base-url.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialogbox/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialogbox/error-dialog/error-dialog.component';
// import { FooterInComponent } from '../footer-in/footer-in.component';

@Component({
  selector: 'app-modules-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NavbarInComponent, SidebarComponent, ReactiveFormsModule],
  templateUrl: './modules-list.component.html',
  styleUrl: './modules-list.component.css'
})

export class ModulesListComponent implements OnInit {
  data: any[] = [];
  filter = {
    moduleNumber: '',
    moduleName: '',
    creditPoints: null,

  };
successMessage: string = '';
    errorMessage: string = '';
  constructor(
    private baseUrlService: BaseUrlService,
    private http: HttpClient,
    private router: Router,
    private moduleService: ModuleService,
    private titleService: Title,
    public dialog: MatDialog,
  
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Modules List');
    this.loadModules();
  }

  applyFilters() {

    this.filterData();
  }

  clearFilters() {
    this.filter = {
      moduleNumber: '',
      moduleName: '',
      creditPoints: null,
    };
    this.loadModules();
  }

  selectModule(item: any) {

    this.router.navigate(['/update-module', item.modID]);
  }

  private loadModules() {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("role");

    if (userId && userRole) {
      const queryParams = `userId=${userId}&role=${userRole}`;
      this.http.get<any>(`${this.baseUrlService.baseUrl}/api/user?${queryParams}`).subscribe({
        next: (userData) => {
          const uniId = this.processUserData(userData); // Assuming processUserData returns uniID
          if (uniId) {
            // Now call getModules from ModuleService with the uniID
            this.moduleService.getModules(uniId).subscribe({
              next: (modulesData) => {
                this.data = modulesData;
              },
              error: (error) => console.error('Error fetching modules:', error)
            });
          }
        },
        error: (error) => console.error("Error fetching user details:", error),
      });
    } else {
      console.error("User ID or User Role not found in localStorage");
    }
  }


  processUserData(userData: any): string | null {
    let uniId: string | null = null;
    for (let key in userData) {
      if (userData.hasOwnProperty(key)) {
        if (userData[key] === "NaN") {
          userData[key] = "";
        }
        if (key === "university" && userData[key] != null) {
          const universityParts = userData[key].split(":");
          if (universityParts.length > 0) {
            uniId = universityParts[universityParts.length - 1];
          }
        }
      }
    }
    return uniId;
  }

  private filterData() {
    const filteredData = this.data.filter((item) => {
      return (
        (this.filter.moduleNumber ? item.modID.includes(this.filter.moduleNumber) : true) &&
        (this.filter.moduleName ? item.modName.toLowerCase().includes(this.filter.moduleName.toLowerCase()) : true) &&
        (this.filter.creditPoints !== null ? item.creditPoints === this.filter.creditPoints : true)
      );
    });
    this.data = filteredData;
  }

  viewModuleDetails(item: any) {
    console.log("clicked");
    this.router.navigate(["./module-details", item.modID]);
  }
deleteModule(item: any) {
  console.log(item);
  const modUID = item.modUID;
  console.log(modUID);
  const deleteEndpoint = `${this.baseUrlService.baseUrl}/api/deleteModule/${modUID}`;
    this.http.delete(deleteEndpoint).subscribe({
      next: (response: any) => {
        this.successMessage = 'Module deleted successfully.';
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          data: { message: this.successMessage }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.loadModules();
        });
       
       
      },
      error: (error) => {
        console.error('Error updating course:', error);
      
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: { message: error.message }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.loadModules();
        });
      }
    });
  }

}
