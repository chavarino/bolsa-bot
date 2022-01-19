import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTableComponent } from './actions-table.component';

describe('ActionsTableComponent', () => {
  let component: ActionsTableComponent;
  let fixture: ComponentFixture<ActionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
