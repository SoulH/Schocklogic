import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPage } from './roles.component';

describe('RolesComponent', () => {
  let component: RolesPage;
  let fixture: ComponentFixture<RolesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
