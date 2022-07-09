import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeValuesComponent } from './scope-values.component';

describe('ScopeValuesComponent', () => {
  let component: ScopeValuesComponent;
  let fixture: ComponentFixture<ScopeValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
