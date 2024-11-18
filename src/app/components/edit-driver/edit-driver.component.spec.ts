import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriverComponent } from './edit-driver.component';

describe('EditDriverComponent', () => {
  let component: EditDriverComponent;
  let fixture: ComponentFixture<EditDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
