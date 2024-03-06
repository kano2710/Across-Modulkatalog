import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowModulesComponent } from './show-modules.component';

describe('ShowModulesComponent', () => {
  let component: ShowModulesComponent;
  let fixture: ComponentFixture<ShowModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
