import { Component } from '@angular/core';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-professors',
  standalone: true,
  imports: [NavbarInComponent, FooterInComponent, SidebarComponent],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css'
})
export class ProfessorsComponent {

}
