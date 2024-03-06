import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, protected titleService: Title,) {}
  ngOnInit(): void {
    this.titleService.setTitle('Across | Forgot Password');
  }
}
