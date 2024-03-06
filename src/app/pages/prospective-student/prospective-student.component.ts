import { Component } from '@angular/core';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';

@Component({
  selector: 'app-prospective-student',
  standalone: true,
  imports: [NavbarInComponent, FooterInComponent],
  templateUrl: './prospective-student.component.html',
  styleUrl: './prospective-student.component.css'
})
export class ProspectiveStudentComponent {

}
