import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLayout } from './side.component';

describe('SideComponent', () => {
  let component: SideLayout;
  let fixture: ComponentFixture<SideLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideLayout ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
