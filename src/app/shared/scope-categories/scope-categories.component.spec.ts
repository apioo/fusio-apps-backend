import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeCategoriesComponent } from './scope-categories.component';

describe('ScopeCategoriesComponent', () => {
  let component: ScopeCategoriesComponent;
  let fixture: ComponentFixture<ScopeCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
