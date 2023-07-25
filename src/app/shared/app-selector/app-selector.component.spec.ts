import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectorComponent } from './app-selector.component';

describe('AppSelectorComponent', () => {
  let component: AppSelectorComponent;
  let fixture: ComponentFixture<AppSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSelectorComponent]
    });
    fixture = TestBed.createComponent(AppSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
