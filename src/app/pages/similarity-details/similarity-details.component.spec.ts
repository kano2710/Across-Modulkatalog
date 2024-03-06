import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityDetailsComponent } from './similarity-details.component';

describe('SimilarityDetailsComponent', () => {
  let component: SimilarityDetailsComponent;
  let fixture: ComponentFixture<SimilarityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimilarityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
