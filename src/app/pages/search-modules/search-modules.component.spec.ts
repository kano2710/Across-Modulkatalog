import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModulesComponent } from './search-modules.component';

describe('SearchModulesComponent', () => {
  let component: SearchModulesComponent;
  let fixture: ComponentFixture<SearchModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
