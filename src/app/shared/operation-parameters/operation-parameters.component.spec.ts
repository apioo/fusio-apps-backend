import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationParametersComponent } from './operation-parameters.component';

describe('OperationParametersComponent', () => {
  let component: OperationParametersComponent;
  let fixture: ComponentFixture<OperationParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationParametersComponent]
    });
    fixture = TestBed.createComponent(OperationParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
