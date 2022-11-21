import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchockHeaderComponent } from './schock-header.component';

describe('SchockHeaderComponent', () => {
  let component: SchockHeaderComponent;
  let fixture: ComponentFixture<SchockHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchockHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchockHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
