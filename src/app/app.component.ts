import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, LoginComponent, HttpClientModule, HomeComponent, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
   
  }

}
