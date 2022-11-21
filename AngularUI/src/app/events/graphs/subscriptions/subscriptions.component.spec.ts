import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsGraph } from './subscriptions.component';

describe('SubscriptionsComponent', () => {
  let component: SubscriptionsGraph;
  let fixture: ComponentFixture<SubscriptionsGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsGraph ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
