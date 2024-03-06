import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledModulesComponent } from './enrolled-modules.component';

describe('EnrolledModulesComponent', () => {
  let component: EnrolledModulesComponent;
  let fixture: ComponentFixture<EnrolledModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolledModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrolledModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
