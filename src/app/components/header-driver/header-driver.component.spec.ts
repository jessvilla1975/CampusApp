import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDriverComponent } from './header-driver.component';

describe('HeaderDriverComponent', () => {
  let component: HeaderDriverComponent;
  let fixture: ComponentFixture<HeaderDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
