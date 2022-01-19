import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresSelectComponent } from './valores-select.component';

describe('ValoresSelectComponent', () => {
  let component: ValoresSelectComponent;
  let fixture: ComponentFixture<ValoresSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoresSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
