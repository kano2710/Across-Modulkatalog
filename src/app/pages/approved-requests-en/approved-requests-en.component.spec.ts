import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRequestsEnComponent } from './approved-requests-en.component';

describe('ApprovedRequestsEnComponent', () => {
  let component: ApprovedRequestsEnComponent;
  let fixture: ComponentFixture<ApprovedRequestsEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedRequestsEnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedRequestsEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
