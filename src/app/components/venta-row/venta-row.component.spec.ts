import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaRowComponent } from './venta-row.component';

describe('VentaRowComponent', () => {
  let component: VentaRowComponent;
  let fixture: ComponentFixture<VentaRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
