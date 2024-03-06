import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, AfterViewInit{
  userRole: string | null = null;
  expandedMenus: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    this.loadExpandedMenus();
  }

  showSectionForRoles(roles: string[]): boolean {
    return roles.includes(this.userRole || '');
  }

  toggleMenu(menu: string): void {
    this.expandedMenus[menu] = !this.expandedMenus[menu];
    this.saveExpandedMenus();
  }

  isMenuExpanded(menu: string): boolean {
    return !!this.expandedMenus[menu];
  }

  private loadExpandedMenus(): void {
    const savedMenus = localStorage.getItem('expandedMenus');
    if (savedMenus) {
      this.expandedMenus = JSON.parse(savedMenus);
    }
  }

  private saveExpandedMenus(): void {
    localStorage.setItem('expandedMenus', JSON.stringify(this.expandedMenus));
  }
  
  ngAfterViewInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  }
}
