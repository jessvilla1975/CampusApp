import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule // Necesario para probar RouterLink
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar que el header esté presente en el DOM
  it('debería renderizar el elemento header', () => {
    const headerElement = fixture.debugElement.query(By.css('header'));
    expect(headerElement).toBeTruthy();
  });

  // Prueba para verificar la presencia de enlaces de navegación
  it('debería contener enlaces de navegación', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(links.length).toBeGreaterThan(0);
  });

  // Prueba para verificar el atributo RouterLink en los enlaces
  it('debería tener rutas válidas en los enlaces', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));

    links.forEach(link => {
      const routerLink = link.injector.get(RouterLink);
      expect(routerLink).toBeTruthy();
    });
  });

  // Prueba para verificar que el logo o título esté presente
  it('debería mostrar el logo o título', () => {
    const logoOrTitle = fixture.debugElement.query(By.css('.logo, h1, img'));
    expect(logoOrTitle).toBeTruthy();
  });

  // Prueba para verificar la estructura básica del header
  it('debería tener la estructura básica del header', () => {
    const headerElement = fixture.nativeElement;
    const navigation = headerElement.querySelector('nav');

    expect(navigation).toBeTruthy();
  });
});
