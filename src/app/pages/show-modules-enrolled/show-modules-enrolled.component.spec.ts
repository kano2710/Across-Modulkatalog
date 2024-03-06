import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModulesEnrolledComponent } from './show-modules-enrolled.component';

describe('ShowModulesEnrolledComponent', () => {
  let component: ShowModulesEnrolledComponent;
  let fixture: ComponentFixture<ShowModulesEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowModulesEnrolledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowModulesEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
