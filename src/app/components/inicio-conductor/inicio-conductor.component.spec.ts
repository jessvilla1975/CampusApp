import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioConductorComponent } from './inicio-conductor.component';

describe('InicioConductorComponent', () => {
  let component: InicioConductorComponent;
  let fixture: ComponentFixture<InicioConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
