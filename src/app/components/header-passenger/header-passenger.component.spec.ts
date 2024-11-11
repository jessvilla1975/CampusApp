import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPassengerComponent } from './header-passenger.component';

describe('HeaderPassengerComponent', () => {
  let component: HeaderPassengerComponent;
  let fixture: ComponentFixture<HeaderPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPassengerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
