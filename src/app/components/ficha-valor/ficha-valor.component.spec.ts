import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaValorComponent } from './ficha-valor.component';

describe('FichaValorComponent', () => {
  let component: FichaValorComponent;
  let fixture: ComponentFixture<FichaValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
