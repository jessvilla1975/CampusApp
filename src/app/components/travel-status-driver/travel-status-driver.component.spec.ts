import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelStatusDriverComponent } from './travel-status-driver.component';

describe('TravelStatusDriverComponent', () => {
  let component: TravelStatusDriverComponent;
  let fixture: ComponentFixture<TravelStatusDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelStatusDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelStatusDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
