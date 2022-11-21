import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListPage } from './my-list.component';

describe('MyListComponent', () => {
  let component: MyListPage;
  let fixture: ComponentFixture<MyListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyListPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
