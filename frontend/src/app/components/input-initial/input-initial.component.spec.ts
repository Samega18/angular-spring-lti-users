import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInitialComponent } from './input-initial.component';

describe('InputInitialComponent', () => {
  let component: InputInitialComponent;
  let fixture: ComponentFixture<InputInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInitialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
