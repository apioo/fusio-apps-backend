import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSelectorComponent } from './action-selector.component';

describe('ActionSelectorComponent', () => {
  let component: ActionSelectorComponent;
  let fixture: ComponentFixture<ActionSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionSelectorComponent]
    });
    fixture = TestBed.createComponent(ActionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
