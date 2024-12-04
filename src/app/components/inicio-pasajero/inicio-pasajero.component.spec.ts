import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPasajeroComponent } from './inicio-pasajero.component';

describe('InicioPasajeroComponent', () => {
  let component: InicioPasajeroComponent;
  let fixture: ComponentFixture<InicioPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPasajeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
