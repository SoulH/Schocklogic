import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchockBarComponent } from './schock-bar.component';

describe('SchockBarComponent', () => {
  let component: SchockBarComponent;
  let fixture: ComponentFixture<SchockBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchockBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchockBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
