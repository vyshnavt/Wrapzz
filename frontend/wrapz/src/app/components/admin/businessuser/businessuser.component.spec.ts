import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessuserComponent } from './businessuser.component';

describe('BusinessuserComponent', () => {
  let component: BusinessuserComponent;
  let fixture: ComponentFixture<BusinessuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
