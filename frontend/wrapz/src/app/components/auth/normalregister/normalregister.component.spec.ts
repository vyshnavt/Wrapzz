import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalregisterComponent } from './normalregister.component';

describe('NormalregisterComponent', () => {
  let component: NormalregisterComponent;
  let fixture: ComponentFixture<NormalregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
