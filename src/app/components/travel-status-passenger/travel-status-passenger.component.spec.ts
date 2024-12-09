import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelStatusPassengerComponent } from './travel-status-passenger.component';

describe('TravelStatusPassengerComponent', () => {
  let component: TravelStatusPassengerComponent;
  let fixture: ComponentFixture<TravelStatusPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelStatusPassengerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelStatusPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
