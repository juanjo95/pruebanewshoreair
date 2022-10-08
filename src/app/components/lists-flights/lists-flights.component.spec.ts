import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsFlightsComponent } from './lists-flights.component';

describe('ListsFlightsComponent', () => {
  let component: ListsFlightsComponent;
  let fixture: ComponentFixture<ListsFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsFlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
