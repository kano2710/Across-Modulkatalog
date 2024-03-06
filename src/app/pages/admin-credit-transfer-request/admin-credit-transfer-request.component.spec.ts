import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreditTransferRequestComponent } from './admin-credit-transfer-request.component';

describe('AdminCreditTransferRequestComponent', () => {
  let component: AdminCreditTransferRequestComponent;
  let fixture: ComponentFixture<AdminCreditTransferRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreditTransferRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreditTransferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
