import { Component } from '@angular/core';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SearchModulesComponent } from '../search-modules/search-modules.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-modules-enrolled',
  standalone: true,
  imports: [NavbarInComponent, FooterInComponent, SidebarComponent, SearchModulesComponent],
  templateUrl: './show-modules-enrolled.component.html',
  styleUrl: './show-modules-enrolled.component.css'
})
export class ShowModulesEnrolledComponent {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Student | Modules');
  }

}
