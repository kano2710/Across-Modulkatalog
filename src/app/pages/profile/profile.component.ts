import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { Router } from '@angular/router';
import { UniversityService } from '../../services/university.service';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor,NavbarInComponent, SidebarComponent, FooterInComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any = {};
  universityName: string = '';
  address: string = '';
  fname: string = '';
  lname: string = '';
  phone: string = '';
  showUpdateForm = false;
  universities: any[] = [];

  constructor(private http: HttpClient,
    private baseUrlService: BaseUrlService, private router:Router, private universityService:UniversityService, private titleService: Title) { }

    ngOnInit(): void {
      this.titleService.setTitle('Across | Admin | Profile');
      const userId = localStorage.getItem('userId');
      const userRole = localStorage.getItem('role');
    
      if (userId && userRole) { // Check if both userId and userRole are available
        console.log(userRole);
    
        const queryParams = `userId=${userId}&role=${userRole}`; // Construct query parameters
    
        this.http.get<any>(`${this.baseUrlService.baseUrl}/api/user?${queryParams}`).subscribe(data => {
          console.log(data);
          this.user = this.processUserData(data);
          console.log(this.user);
        }, error => {
          console.error('Error fetching user details:', error);
        });
      } else {
        console.error('User ID or User Role not found in localStorage');
      }
    
      this.fetchUniversities();
    }
  
    processUserData(userData: any): any {
     
      for (let key in userData) {
        if (userData[key] === 'NaN') { 
          userData[key] = '';
        }
    
        if (key === 'university' && userData[key] != null) {
          const universityParts = userData[key].split(':');
          if (universityParts.length > 0) {
            const uniId = universityParts[universityParts.length - 1];
        
            this.universityService.getUniversityDetails(uniId).subscribe(
              (universityData) => {
                console.log(universityData.name);
                userData[key]=universityData.name

              },
              (error) => {
                console.error('Error fetching university details:', error);
              }
            );
          }

          }
        }
      
      return userData;
    }

    onSubmit() {
      this.http.post(`${this.baseUrlService.baseUrl}/api/updateUniUser`, this.user).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.showUpdateForm = false; // Hide the update form
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    }

    fetchUniversities() {
      this.http.get<string[]>(`${this.baseUrlService.baseUrl}/api/universities`).subscribe(
        data => {
          this.universities = data;
          console.log(this.universities);
        },
        error => {
          console.error('Error fetching universities:', error);
        }
      );
    }

    
    navigateTo(route: string): void {
      this.router.navigate([route]);
     
  }
}
