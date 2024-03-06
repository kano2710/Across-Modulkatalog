import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditApprovalDialogComponent } from './credit-approval-dialog.component';

describe('CreditApprovalDialogComponent', () => {
  let component: CreditApprovalDialogComponent;
  let fixture: ComponentFixture<CreditApprovalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditApprovalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditApprovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
