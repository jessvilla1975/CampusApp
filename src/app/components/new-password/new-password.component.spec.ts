import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NewPasswordComponent } from './new-password.component';
import { ApiService } from '../../api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bike',
  standalone: true,
  template: '<div>Bike Component</div>'
})
class MockBikeComponent {}

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['establecerContrasena']);
    apiServiceSpy.establecerContrasena.and.returnValue(of({ success: true }));

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'bike', component: MockBikeComponent }
        ]),
        ReactiveFormsModule,
        NewPasswordComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['correo', 'test@example.com']]) } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialización del componente', () => {
    it('debería recibir el parámetro "correo" de la ruta', () => {
      expect(component.correo).toBe('test@example.com');
    });

    it('debería inicializar el formulario correctamente', () => {
      expect(component.establecerPassword).toBeTruthy();
      expect(component.establecerPassword.contains('nuevaContrasena')).toBeTruthy();
      expect(component.establecerPassword.contains('confirmarContrasena')).toBeTruthy();
    });
  });

  describe('Validación del formulario', () => {
    it('debería ser inválido cuando está vacío', () => {
      expect(component.establecerPassword.valid).toBeFalse();
    });

    it('debería validar la longitud de la nueva contraseña', () => {
      const nuevaContrasena = component.establecerPassword.controls['nuevaContrasena'];
      nuevaContrasena.setValue('12345');
      expect(nuevaContrasena.hasError('minlength')).toBeTruthy();

      nuevaContrasena.setValue('123456');
      expect(nuevaContrasena.hasError('minlength')).toBeFalsy();
    });

    it('debería validar que las contraseñas coincidan antes de enviar', () => {
      component.establecerPassword.patchValue({
        nuevaContrasena: 'password123',
        confirmarContrasena: 'different'
      });
      component.onSubmit();
      expect(apiService.establecerContrasena).not.toHaveBeenCalled();
    });
  });

  describe('Acciones del usuario', () => {
    it('debería alternar la visibilidad de la nueva contraseña', () => {
      expect(component.isPasswordVisible).toBeFalse();

      component.togglePasswordVisibility();
      expect(component.isPasswordVisible).toBeTrue();

      component.togglePasswordVisibility();
      expect(component.isPasswordVisible).toBeFalse();
    });

    it('debería alternar la visibilidad de la confirmación de contraseña', () => {
      expect(component.isConfirmPasswordVisible).toBeFalse();

      component.toggleConfirmPasswordVisibility();
      expect(component.isConfirmPasswordVisible).toBeTrue();

      component.toggleConfirmPasswordVisibility();
      expect(component.isConfirmPasswordVisible).toBeFalse();
    });
  });

  describe('Envío del formulario', () => {
    it('debería enviar los datos correctamente si el formulario es válido', () => {
      spyOn(router, 'navigate');
      component.establecerPassword.patchValue({
        nuevaContrasena: 'password123',
        confirmarContrasena: 'password123'
      });

      component.onSubmit();

      expect(apiService.establecerContrasena).toHaveBeenCalledWith({
        correo: 'test@example.com',
        contraseña: 'password123'
      });
      expect(router.navigate).toHaveBeenCalledWith(['/bike']);
    });

    it('debería manejar errores del servicio', () => {
      spyOn(window, 'alert');
      apiService.establecerContrasena.and.returnValue(throwError(() => new Error('Error de red')));

      component.establecerPassword.patchValue({
        nuevaContrasena: 'password123',
        confirmarContrasena: 'password123'
      });

      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Error al establecer la contraseña. Por favor, inténtalo de nuevo.');
    });
  });
});
