import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditorComponent } from './tag-editor.component';

describe('TagEditorComponent', () => {
  let component: TagEditorComponent;
  let fixture: ComponentFixture<TagEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
