import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdailogComponent } from './editdailog.component';

describe('EditdailogComponent', () => {
  let component: EditdailogComponent;
  let fixture: ComponentFixture<EditdailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
