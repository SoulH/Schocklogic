import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpForm } from './signup.component';

describe('SignUpComponent', () => {
  let component: SignUpForm;
  let fixture: ComponentFixture<SignUpForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
