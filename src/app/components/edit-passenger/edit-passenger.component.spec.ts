import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassengerComponent } from './edit-passenger.component';

describe('EditPassengerComponent', () => {
  let component: EditPassengerComponent;
  let fixture: ComponentFixture<EditPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPassengerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
