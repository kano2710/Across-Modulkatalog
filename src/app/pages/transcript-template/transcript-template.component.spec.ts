import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptTemplateComponent } from './transcript-template.component';

describe('TranscriptTemplateComponent', () => {
  let component: TranscriptTemplateComponent;
  let fixture: ComponentFixture<TranscriptTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
