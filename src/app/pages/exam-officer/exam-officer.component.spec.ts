import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamOfficerComponent } from './exam-officer.component';

describe('ExamOfficerComponent', () => {
  let component: ExamOfficerComponent;
  let fixture: ComponentFixture<ExamOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamOfficerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
