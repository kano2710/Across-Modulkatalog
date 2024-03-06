import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectiveStudentComponent } from './prospective-student.component';

describe('ProspectiveStudentComponent', () => {
  let component: ProspectiveStudentComponent;
  let fixture: ComponentFixture<ProspectiveStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProspectiveStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectiveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
