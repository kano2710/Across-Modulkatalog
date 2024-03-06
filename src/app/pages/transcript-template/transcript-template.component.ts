import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-transcript-template',
  standalone: true,
  imports: [SidebarComponent, NavbarInComponent, FooterInComponent],
  templateUrl: './transcript-template.component.html',
  styleUrl: './transcript-template.component.css'
})
export class TranscriptTemplateComponent {
  module: any
  constructor(private router: Router, private titleService: Title,
    private route: ActivatedRoute) {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { module: any };
    console.log(state.module);
    this.module = state.module;
  }
  ngOnInit() {
    this.titleService.setTitle('Across | Student | Transcript Details');
  }

  printPage() {
    window.print();
  }
}
