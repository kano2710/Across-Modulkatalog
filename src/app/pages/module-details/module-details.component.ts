import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrlService } from '../../services/base-url.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { SimilarityDetailsComponent } from '../similarity-details/similarity-details.component';
import { MatDialog } from '@angular/material/dialog';
// import Chart, { ChartItem } from 'chart.js/auto';
import { SidebarEnrolledComponent } from '../sidebar-enrolled/sidebar-enrolled.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-module-details',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    NavbarInComponent,
    SidebarComponent,
    SidebarEnrolledComponent,
    FooterInComponent,
    NgFor,
    SimilarityDetailsComponent,
  ],
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.css'],
})
export class ModuleDetailsComponent implements OnInit {
  @ViewChild('similarityChart') similarityChart!: ElementRef<HTMLCanvasElement>;
  module: any;
  similarityResults: any;
  dialog!: MatDialog;
  showSimilarityResults: boolean = false;
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private baseUrlService: BaseUrlService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private router: Router,
    private location: Location,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Across | Module | Details');
    this.userRole = localStorage.getItem('role');
    const moduleId = this.route.snapshot.paramMap.get('id');
    console.log(moduleId);
    this.http
      .get(`${this.baseUrlService.baseUrl}/api/modules/${moduleId}`)
      .subscribe((data: any) => {
        this.module = data;
        console.log(this.module.uniID);
      });
  }

  openSimilarityDialog(result: any): void {
    this.dialog.open(SimilarityDetailsComponent, {
      width: '250px',
      data: result, // Pass the similarity result as data to the dialog
    });
  }
  checkSimilarity() {
    const url = `${this.baseUrlService.baseUrl}/api/modules/similarity`;
    this.http.post(url, { module: this.module }).subscribe(
      (response: any) => {
        console.log('Similarity response:', response);
        this.showSimilarityResults = true;
        this.similarityResults = response;
        this.router.navigate(['/similarity-details'], {
          state: {
            selectedModule: this.module,
            similarityResults: this.similarityResults,
          },
        });
      },
      (error) => {
        console.error('Error checking similarity:', error);
      }
    );
  }

  backToModuleDetails() {
    this.showSimilarityResults = false;
  }

  // createChart(result: any, index: number) {
  //   const chartContainer = document.getElementById('chartsContainer');

  //   const moduleContainer = this.renderer.createElement('div');
  //   this.renderer.addClass(moduleContainer, 'module-container');

  //   const detailsContainer = this.renderer.createElement('div');
  //   this.renderer.addClass(detailsContainer, 'details-container');

  //   const detailFields = [
  //     'courseID', 'courseName', 'modID', 'modName', 'modDesc', 'modDuration', 'modMOE', 'modREQ', 'modCredit'
  //   ];

  //   detailFields.forEach(field => {
  //     const detailElement = this.renderer.createElement('p');
  //     this.renderer.addClass(detailElement, 'module-detail');
  //     this.renderer.setProperty(detailElement, 'textContent', `${field}: ${result[field]}`);
  //     this.renderer.appendChild(detailsContainer, detailElement);
  //   });

  //   this.renderer.appendChild(moduleContainer, detailsContainer);

  //   const canvas = this.renderer.createElement('canvas');
  //   this.renderer.setProperty(canvas, 'id', `similarityChart-${index}`);
  //   this.renderer.setAttribute(canvas, 'width', '200');
  //   this.renderer.setAttribute(canvas, 'height', '200');
  //   this.renderer.addClass(canvas, 'chart-canvas');
  //   this.renderer.appendChild(moduleContainer, canvas);

  //   this.renderer.appendChild(chartContainer, moduleContainer);

  //   const ctx = canvas.getContext('2d');
  //   if (ctx) {
  //     const chart = new Chart(ctx, {
  //       type: 'doughnut',
  //       data: {
  //         datasets: [{
  //           data: [result.similarityScore, 1 - result.similarityScore],
  //           backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.2)'],
  //           borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         cutout: '80%',
  //         plugins: {
  //           legend: {
  //             display: false
  //           },
  //           title: {
  //             display: true,
  //             text: result.modName,
  //             position: 'bottom'
  //           }
  //         }
  //       }
  //     });
  //   }
  // }

  // reloadPage() {
  //   this.location.go(this.location.path());
  //   window.location.reload();
  // }
}
