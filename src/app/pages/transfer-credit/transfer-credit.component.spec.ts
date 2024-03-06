import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCreditComponent } from './transfer-credit.component';

describe('TransferCreditComponent', () => {
  let component: TransferCreditComponent;
  let fixture: ComponentFixture<TransferCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferCreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
