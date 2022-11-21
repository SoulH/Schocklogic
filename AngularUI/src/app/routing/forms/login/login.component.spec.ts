import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginForm } from './login.component';

describe('LoginComponent', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
