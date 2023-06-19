import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationThrowsComponent } from './operation-throws.component';

describe('OperationThrowsComponent', () => {
  let component: OperationThrowsComponent;
  let fixture: ComponentFixture<OperationThrowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationThrowsComponent]
    });
    fixture = TestBed.createComponent(OperationThrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
