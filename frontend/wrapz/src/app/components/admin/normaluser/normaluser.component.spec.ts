import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaluserComponent } from './normaluser.component';

describe('NormaluserComponent', () => {
  let component: NormaluserComponent;
  let fixture: ComponentFixture<NormaluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormaluserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormaluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
