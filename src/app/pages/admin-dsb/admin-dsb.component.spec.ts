import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDsbComponent } from './admin-dsb.component';

describe('AdminDsbComponent', () => {
  let component: AdminDsbComponent;
  let fixture: ComponentFixture<AdminDsbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDsbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
