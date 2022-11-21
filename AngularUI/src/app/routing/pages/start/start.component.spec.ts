import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPage } from './start.component';

describe('LoginComponent', () => {
  let component: StartPage;
  let fixture: ComponentFixture<StartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
