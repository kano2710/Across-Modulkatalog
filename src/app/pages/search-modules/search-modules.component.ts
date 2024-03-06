import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { BaseUrlService } from '../../services/base-url.service';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-search-modules',
  templateUrl: './search-modules.component.html',
  styleUrls: ['./search-modules.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
})

export class SearchModulesComponent implements OnDestroy {
  @ViewChild('dataTable', { static: false })
  table!: ElementRef;
  dataTable: any;
  data: any[] = [];
  filter = {
    moduleNumber: '',
    moduleName: '',
    creditPoints: null,
  };
  constructor(
    private baseUrlService: BaseUrlService,
    private http: HttpClient,
    private router: Router
  ) {}

  applyFilters(event: Event) {
    event.preventDefault();

    console.log(
      'Filtering with: ',
      this.filter.moduleNumber,
      this.filter.moduleName,
      this.filter.creditPoints
    );

    const filteredData = this.data.filter((item) => {
      return (
        (!this.filter.moduleNumber ||
          item.modID.includes(this.filter.moduleNumber)) &&
        (!this.filter.moduleName ||
          item.modName
            .toLowerCase()
            .includes(this.filter.moduleName.toLowerCase())) &&
        (this.filter.creditPoints === null ||
          Number(item.modCredit) === this.filter.creditPoints)
      );
    });

    console.log('Filtered data: ', filteredData);

    if (this.dataTable) {
      this.dataTable.clear().destroy();
    }

    this.initDataTable(filteredData);
  }

  ngAfterViewInit(): void {
    this.http
      .get(`${this.baseUrlService.baseUrl}/api/modules`)
      .subscribe((data: any) => {
        this.data = data;
        setTimeout(() => {
          this.initDataTable(this.data);
        }, 0);
      });
  }

  private initDataTable(data: any[]): void {
    $('#loadingSpinner').show();
    if ($.fn.DataTable.isDataTable(this.table.nativeElement)) {
      $(this.table.nativeElement).DataTable().clear().destroy();
    }

    this.dataTable = $(this.table.nativeElement).DataTable({
      data: data,
      pageLength: 10,
      columns: [
        // {
        //   title: "Course ID",
        //   data: "courseID",
        //   render: (data: any, type: any, row: any) => {
        //     return `<span class="badge" style="color:rgb(204, 34, 34); font-size: medium; background-color:rgb(212, 208, 208)">${data}</span>`;
        //   }
        // },
        {
          title: 'Course Name',
          data: 'courseName',
          render: (data: any, type: any, row: any) => {
            return `<span style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bold;">${data}</span>`;
          },
        },
        {
          title: 'Module ID',
          data: 'modID',
          render: (data: any, type: any, row: any) => {
            return `<span class="badge" style="color:rgb(2, 2, 2); font-size: medium; background-color: rgb(212, 208, 208);">${data}</span>`;
          },
        },
        {
          title: 'Module Name',
          data: 'modName',
          render: (data: any, type: any, row: any) => {
            return `<span style="font-family: Georgia, 'Times New Roman', Times, serif; font-weight: bold;">${data}</span>`;
          },
        },
        //  { title: 'Module Description' },
        // { title: "Module Duration" },
        // { title: "Mode of Exam" },
        // { title: "Module Requirements" },
        // { title: "Module Credits" },
        {
          title: 'Show Details',
          data: null,
          defaultContent:
            "<button class='btn btn-outline-primary'><i class='fas fa-info-circle'></i> See More</button>",
        },
      ],
      deferRender: true,
      
      language: {
        zeroRecords: 'No Modules Found',
        infoEmpty: 'No Modules Found',
        lengthMenu: 'Display _MENU_ modules per page',
      },

      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'All'],
      ],
      autowidth: true,
      responsive: true,
      stateSave: true,
      
      drawCallback: () => {
        $('.btn-outline-primary')
          .off('click')
          .on('click', (event: { target: any }) => {
            const rowData = this.dataTable
              .row($(event.target).closest('tr'))
              .data();
            this.viewModuleDetails(rowData);
          });
      },
    });
    $('#loadingSpinner').hide();
    $(this.table.nativeElement).on(
      'click',
      'tbody tr',
      (event: { currentTarget: any }) => {
        const rowData = this.dataTable.row(event.currentTarget).data();
        if (rowData) {
          // Assuming `rowData[2]` is the modID based on your data mapping
          const modID = rowData[2];
          this.viewModuleDetails({ modID: modID });
        }
      }
    );
    const headers = [
      { index: 0, icon: 'fa-graduation-cap' },
      { index: 1, icon: 'fa-hashtag' },
      { index: 2, icon: 'fa-book' },
      { index: 3, icon: 'fa-eye' },
      { index: 4, icon: 'fa-star' },
    ];

    headers.forEach((header) => {
      const columnHeader = $(this.table.nativeElement)
        .find('thead th')
        .eq(header.index);
      columnHeader.html(
        `<i class="fas ${header.icon}"></i> ${columnHeader.text()}`
      );
    });
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  viewModuleDetails(item: any) {
    console.log('clicked');
    this.router.navigate(['./module-details', item.modID]);
  }

  clearFilters() {
    this.filter = {
      moduleNumber: '',
      moduleName: '',
      creditPoints: null,
    };

    this.http
      .get(`${this.baseUrlService.baseUrl}/api/modules`)
      .subscribe((data: any) => {
        this.data = data; // Update the data array with all modules

        // Check if DataTables is initialized and clear/destroy it before re-initializing
        if ($.fn.DataTable.isDataTable(this.table.nativeElement)) {
          $(this.table.nativeElement).DataTable().clear().destroy();
        }

        
        this.initDataTable(this.data); // Re-initialize the DataTable with all modules
      });
  }
}
