import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdetailsComponent } from './accountdetails.component';

describe('AccountdetailsComponent', () => {
  let component: AccountdetailsComponent;
  let fixture: ComponentFixture<AccountdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5', () => {
    expect(component.add()).toEqual(5);
  });

});
