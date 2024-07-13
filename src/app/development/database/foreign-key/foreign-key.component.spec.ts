import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignKeyComponent } from './foreign-key.component';

describe('ForeignKeyComponent', () => {
  let component: ForeignKeyComponent;
  let fixture: ComponentFixture<ForeignKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignKeyComponent]
    });
    fixture = TestBed.createComponent(ForeignKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
