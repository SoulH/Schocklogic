import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventForm } from './event.component';

describe('EventComponent', () => {
  let component: EventForm;
  let fixture: ComponentFixture<EventForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
