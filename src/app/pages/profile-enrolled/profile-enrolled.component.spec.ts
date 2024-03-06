import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEnrolledComponent } from './profile-enrolled.component';

describe('ProfileEnrolledComponent', () => {
  let component: ProfileEnrolledComponent;
  let fixture: ComponentFixture<ProfileEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEnrolledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
