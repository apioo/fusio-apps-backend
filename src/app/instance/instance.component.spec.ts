import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceComponent } from './instance.component';

describe('InstanceComponent', () => {
  let component: InstanceComponent;
  let fixture: ComponentFixture<InstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
