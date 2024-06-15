import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowComponent } from './row.component';

describe('RowComponent', () => {
  let component: RowComponent;
  let fixture: ComponentFixture<RowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RowComponent]
    });
    fixture = TestBed.createComponent(RowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
