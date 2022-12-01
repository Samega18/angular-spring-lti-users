import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxInitialComponent } from './checkbox-initial.component';

describe('CheckboxInitialComponent', () => {
  let component: CheckboxInitialComponent;
  let fixture: ComponentFixture<CheckboxInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxInitialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
