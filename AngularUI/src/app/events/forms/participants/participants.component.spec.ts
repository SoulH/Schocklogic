import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsForm } from './participants.component';

describe('ParticipantsComponent', () => {
  let component: ParticipantsForm;
  let fixture: ComponentFixture<ParticipantsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
