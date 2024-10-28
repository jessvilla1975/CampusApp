import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que el footer esté presente en el DOM
  it('debería renderizar el elemento footer', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement).toBeTruthy();
  });

// Prueba para verificar la presencia de contenido en el footer
it('debería contener texto en el footer', () => {
  const footerText = fixture.debugElement.query(By.css('footer')).nativeElement.textContent;
  expect(footerText).toContain('Campus Ride UV © Todos Los Derechos Reservados 2024  Tuluá - Valle del Cauca');
});


  // Si tienes enlaces en el footer, puedes verificar que existan
  it('debería contener enlaces de navegación', () => {
    const links = fixture.debugElement.queryAll(By.css('footer a'));
    expect(links.length).toBeGreaterThan(0); // Asegúrate de que haya al menos un enlace
  });
});
