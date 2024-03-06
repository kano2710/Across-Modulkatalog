import { Component } from '@angular/core';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';

@Component({
  selector: 'app-exchange-student',
  standalone: true,
  imports: [NavbarInComponent, FooterInComponent],
  templateUrl: './exchange-student.component.html',
  styleUrl: './exchange-student.component.css'
})
export class ExchangeStudentComponent {

}
