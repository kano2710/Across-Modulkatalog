import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInComponent } from './footer-in.component';

describe('FooterInComponent', () => {
  let component: FooterInComponent;
  let fixture: ComponentFixture<FooterInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
