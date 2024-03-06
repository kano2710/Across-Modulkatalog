import { Component } from '@angular/core';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-exam-officer',
  standalone: true,
  imports: [NavbarInComponent, FooterInComponent, SidebarComponent],
  templateUrl: './exam-officer.component.html',
  styleUrl: './exam-officer.component.css'
})
export class ExamOfficerComponent {

}
