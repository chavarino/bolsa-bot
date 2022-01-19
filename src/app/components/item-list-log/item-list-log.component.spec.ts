import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListLogComponent } from './item-list-log.component';

describe('ItemListLogComponent', () => {
  let component: ItemListLogComponent;
  let fixture: ComponentFixture<ItemListLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
