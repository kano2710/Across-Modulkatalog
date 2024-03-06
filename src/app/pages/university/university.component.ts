import { NgFor } from '@angular/common';
import { University } from '../../model/university.model';
import { UniversityListService } from '../../services/universityList-service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-university',
  standalone: true,
  imports: [NgFor, HeaderComponent, FooterComponent],
  templateUrl: './university.component.html',
  styleUrl: './university.component.css'
})
export class UniversityComponent  implements OnInit{
  universities: University[] = [];
  private bodyClasses = 'sidebar-collapse layout-top-nav';

  constructor(private universityService: UniversityListService, @Inject(PLATFORM_ID) private platformId: Object, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Affiliated Universities');
    if (isPlatformBrowser(this.platformId)) {
     
      document.body.className = this.bodyClasses;
    }

    this.universityService.getUniversities().subscribe((universities) => {
      this.universities = universities;
    });
  }
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = '';
    }
  }
}
