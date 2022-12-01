import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInitialComponent } from './button-initial.component';

describe('ButtonInitialComponent', () => {
  let component: ButtonInitialComponent;
  let fixture: ComponentFixture<ButtonInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonInitialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
