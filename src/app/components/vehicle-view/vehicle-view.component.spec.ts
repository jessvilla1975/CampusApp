import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleViewComponent } from './vehicle-view.component';

describe('VehicleViewComponent', () => {
  let component: VehicleViewComponent;
  let fixture: ComponentFixture<VehicleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
