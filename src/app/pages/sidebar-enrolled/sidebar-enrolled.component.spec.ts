import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEnrolledComponent } from './sidebar-enrolled.component';

describe('SidebarEnrolledComponent', () => {
  let component: SidebarEnrolledComponent;
  let fixture: ComponentFixture<SidebarEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarEnrolledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
