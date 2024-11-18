import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuntentucationLoginComponent } from './auntentucation-login.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

describe('AuntentucationLoginComponent', () => {
  let component: AuntentucationLoginComponent;
  let fixture: ComponentFixture<AuntentucationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuntentucationLoginComponent, HeaderComponent, FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuntentucationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
