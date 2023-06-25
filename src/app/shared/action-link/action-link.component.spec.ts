import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLinkComponent } from './action-link.component';

describe('ActionLinkComponent', () => {
  let component: ActionLinkComponent;
  let fixture: ComponentFixture<ActionLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionLinkComponent]
    });
    fixture = TestBed.createComponent(ActionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
