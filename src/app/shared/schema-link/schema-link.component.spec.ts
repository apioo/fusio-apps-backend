import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaLinkComponent } from './schema-link.component';

describe('SchemaLinkComponent', () => {
  let component: SchemaLinkComponent;
  let fixture: ComponentFixture<SchemaLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaLinkComponent]
    });
    fixture = TestBed.createComponent(SchemaLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
