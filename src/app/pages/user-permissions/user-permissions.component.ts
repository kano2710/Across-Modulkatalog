import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FooterInComponent } from '../footer-in/footer-in.component';
import { NavbarInComponent } from '../navbar-in/navbar-in.component';
import { BaseUrlService } from '../../services/base-url.service';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { UniversityService } from '../../services/university.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-user-permissions',
  standalone: true,
  imports: [
    NavbarInComponent,
    SidebarComponent,
    FooterInComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './user-permissions.component.html',
  styleUrl: './user-permissions.component.css',
})
export class UserPermissionsComponent implements OnInit {
  @ViewChild('dataTable', { static: false })
  table!: ElementRef;
  dataTable: any;
  data: any[] = [];
  universities: any[] = [];
  user: any = {};

  constructor(
    private baseUrlService: BaseUrlService,
    private http: HttpClient,
    private titleService: Title,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Across | Admin | User Permission');
    this.fetchUserData();
  }

  fetchUserData() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http
        .get(
          `${this.baseUrlService.baseUrl}/api/userPermission?userId=${userId}`
        )
        .subscribe({
          next: (data: any) => {
            this.data = data.users;
            this.initDataTable(data.users);
          },
          error: (error) => console.error('Error fetching users:', error),
        });
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  private initDataTable(data: any): void {
    $('#loadingSpinner').show();
    if ($.fn.DataTable.isDataTable(this.table.nativeElement)) {
      $(this.table.nativeElement).DataTable().clear().destroy();
    }
    this.dataTable = $(this.table.nativeElement).DataTable({
      data: data,
      columns: [
        { title: 'First Name', data: 'firstName' },
        { title: 'Last Name', data: 'lastName' },
        { title: 'Email Address', data: 'email' },
        { title: 'User Role', data: 'roleName' },
        {
          title: 'Actions',
          data: null,
          render: function (_data: any, type: any, row: any) {
            const approveButtonText = row.isApproved ? 'Disapprove' : 'Approve';
            return `
                      <button class="btn btn-danger mr-2 action-delete" data-id="${row.id}">Delete</button>
                      <button class="btn btn-primary action-toggle-approval" data-id="${row.id}" data-is-approved="${row.isApproved}">${approveButtonText}</button>
                  `;
          },
          orderable: false,
        },
      ],
      deferRender: true,
      autowidth: true,
      responsive: true,
    });

    $(this.table.nativeElement).on(
      'click',
      '.action-delete',
      (event: { currentTarget: any }) => {
        const itemId = $(event.currentTarget).data('id');
        const item = this.data.find((d) => d.id === itemId);
        if (item) {
          this.deleteUser(item);
          window.location.reload();
        }
      }
    );

    $(this.table.nativeElement).on(
      'click',
      '.action-toggle-approval',
      (event: { currentTarget: any }) => {
        const itemId = $(event.currentTarget).data('id');
        const item = this.data.find((d) => d.id === itemId);
        if (item) {
          this.toggleApproval(item);
        }
      }
    );
  }

  deleteUser(item: any): void {
    this.http
      .patch(`${this.baseUrlService.baseUrl}/api/userPermission/${item.id}`, {})
      .subscribe({
        next: (response) => {
          console.log('User deleted', response);
          this.data = this.data.filter((user) => user.id !== item.id);
        },
        error: (error) => {
          console.error('Error deleting user', error);
        },
      });
  }

  toggleApproval(item: any): void {
    const updatedStatus = item.isApproved ? 0 : 1;
    this.http
      .post(`${this.baseUrlService.baseUrl}/api/userPermission/${item.id}`, {
        isApproved: updatedStatus,
      })
      .subscribe({
        next: (response) => {
          console.log('Approval status updated', response);
          item.isApproved = updatedStatus;
          $(`button.action-toggle-approval[data-id="${item.id}"]`)
            .text(item.isApproved ? 'Disapprove' : 'Approve')
            .data('is-approved', item.isApproved);
        },
        error: (error) => {
          console.error('Error updating approval status', error);
        },
      });
  }
}
