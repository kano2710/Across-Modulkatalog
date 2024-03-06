import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeStudentComponent } from './exchange-student.component';

describe('ExchangeStudentComponent', () => {
  let component: ExchangeStudentComponent;
  let fixture: ComponentFixture<ExchangeStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
