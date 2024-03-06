import { Component } from '@angular/core';
import { SearchModulesComponent } from '../search-modules/search-modules.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-modules',
  standalone: true,
  imports: [SearchModulesComponent, SidebarComponent, NavbarInComponent, FooterInComponent],
  templateUrl: './show-modules.component.html',
  styleUrl: './show-modules.component.css'
})
export class ShowModulesComponent {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Across | Admin | Modules');
  }
}
