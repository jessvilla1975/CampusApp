import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelHistoryDriverComponent } from './travel-history-driver.component';

describe('TravelHistoryDriverComponent', () => {
  let component: TravelHistoryDriverComponent;
  let fixture: ComponentFixture<TravelHistoryDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelHistoryDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelHistoryDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
