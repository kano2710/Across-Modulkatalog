import { Component, OnInit } from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { HttpClient } from '@angular/common/http';
import { SearchModulesComponent } from '../search-modules/search-modules.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dsb',
  standalone: true,
  imports: [SearchModulesComponent, SidebarComponent, NavbarInComponent, FooterInComponent],
  templateUrl: './admin-dsb.component.html',
  styleUrl: './admin-dsb.component.css'
})


export class AdminDsbComponent implements OnInit{

  totalCourses: number | null = null;
  totalModules: number | null = null;
  totalUni: number | null = null;
  totalStudents: number | null = null;

  constructor(
    private baseUrlService: BaseUrlService,
    private titleService: Title,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Dashboard');
    this.http
      .get(`${this.baseUrlService.baseUrl}/api/courseCount`)
      .subscribe((data: any) => {
        this.totalCourses = data.totalCourses;
      });
      this.http
      .get(`${this.baseUrlService.baseUrl}/api/moduleCount`)
      .subscribe((data: any) => {
        this.totalModules = data.totalModules;
      });

      this.http
      .get(`${this.baseUrlService.baseUrl}/api/uniCount`)
      .subscribe((data: any) => {
        this.totalUni = data.totalUni;
      });

      this.http
      .get(`${this.baseUrlService.baseUrl}/api/stuCount`)
      .subscribe((data: any) => {
        this.totalStudents = data.totalStudents;
      });
  }

  // ngAfterViewInit(): void {
  //   this.http
  //     .get(`${this.baseUrlService.baseUrl}/api/courseCount`)
  //     .subscribe((data: any) => {
  //       this.totalCourses = data.totalCourses;
  //     });
  //     this.http
  //     .get(`${this.baseUrlService.baseUrl}/api/moduleCount`)
  //     .subscribe((data: any) => {
  //       this.totalModules = data.totalModules;
  //     });

  //     this.http
  //     .get(`${this.baseUrlService.baseUrl}/api/uniCount`)
  //     .subscribe((data: any) => {
  //       this.totalUni = data.totalUni;
  //     });

  //     this.http
  //     .get(`${this.baseUrlService.baseUrl}/api/stuCount`)
  //     .subscribe((data: any) => {
  //       this.totalStudents = data.totalStudents;
  //     });
  // }

}