import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelHistoryPassengerComponent } from './travel-history-passenger.component';

describe('TravelHistoryPassengerComponent', () => {
  let component: TravelHistoryPassengerComponent;
  let fixture: ComponentFixture<TravelHistoryPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelHistoryPassengerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelHistoryPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
