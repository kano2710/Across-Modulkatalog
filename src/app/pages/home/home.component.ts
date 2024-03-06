import { NgClass, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';



@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NgIf, NgClass, MatMenuModule, MatButtonModule, RouterModule, HeaderComponent, FooterComponent],
})
export class HomeComponent implements OnInit {

  private bodyClasses = 'sidebar-collapse layout-top-nav';

  ngOnInit(): void {
    this.titleService.setTitle('Across | Home');
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = this.bodyClasses;
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = '';
    }
  }
    
    isClicked = false;
    // form: FormGroup;

    constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object, private titleService: Title) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isClicked = false;
            }
        });
        // this.form = this.fb.group({
        //     name: ['', Validators.required],
        //     email: ['', [Validators.required, Validators.email]],
        //     message: ['', Validators.required],
        // });
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
        this.isClicked = true;
    }

    // onSubmit() {
    //     if (this.form.valid) {
    //         const sanitizedFormData = this.sanitizeFormData(this.form.value);
    //         this.http
    //             .post<any>('url', sanitizedFormData)
    //             .subscribe(
    //                 (response) => {
    //                     const status = document.getElementById('status');
    //                     if (status) {
    //                         status.classList.remove('error');
    //                         status.innerHTML = 'Form submitted successfully.';
    //                     }
    //                     this.form.reset();
    //                 },
    //                 (error) => {
    //                     const status = document.getElementById('status');
    //                     if (status) {
    //                         status.classList.add('error');
    //                         status.innerHTML = 'There was a problem. Please try again.';
    //                     }
    //                 }
    //             );
    //     }
    // }

    // sanitizeFormData(formData: any): any {
    //     const sanitizedData: any = {};
    //     for (const key in formData) {
    //         if (formData.hasOwnProperty(key)) {
    //             sanitizedData[key] = this.sanitizeInput(formData[key]);
    //         }
    //     }
    //     return sanitizedData;
    // }

    // sanitizeInput(userInput: string): string {
    //     const tempElement = document.createElement('div');
    //     tempElement.innerHTML = userInput;
    //     return tempElement.textContent || tempElement.innerText || '';
    // }

}
