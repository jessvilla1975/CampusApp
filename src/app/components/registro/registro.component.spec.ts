import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistroComponent } from './registro.component';
import { ApiService } from '../../api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bike',
  standalone: true,
  template: '<div>Bike Component</div>'
})
class MockBikeComponent {}

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;

  const mockValidUser = {
    id: '12345',
    genero: 'Masculino',
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juanito@example.com',
    telefono: '1234567890',
    direccion: 'Calle 123',
    fecha_nacimiento: '1995-05-15',
    contraseña: 'password123',
    confirmarContraseña: 'password123'
  };

  const mockValidConductor = {
    ...mockValidUser,
    numero_licencia: 'LIC123',
    fecha_vencimiento: '2025-01-01',
    id_placa: 'ABC123',
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: '2020',
    color: 'Rojo',
    capacidad_pasajeros: '4'
  };

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['newUser', 'addConductor', 'addVehiculo']);
    apiServiceSpy.newUser.and.returnValue(of({ success: true }));
    apiServiceSpy.addConductor.and.returnValue(of({ success: true }));
    apiServiceSpy.addVehiculo.and.returnValue(of({ success: true }));

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'bike', component: MockBikeComponent }
        ]),
        ReactiveFormsModule,
        RegistroComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialización del Formulario', () => {
    it('debería inicializarse con tipo de usuario normal', () => {
      expect(component.tipoUsuario).toBe('usuario');
    });


  });

  describe('Validación del Formulario', () => {
    it('debería ser inválido cuando está vacío', () => {
      expect(component.agregarUsuario.valid).toBeFalsy();
    });

    it('debería validar el formato del correo electrónico', () => {
      const correo = component.agregarUsuario.controls['correo'];
      correo.setValue('correo-invalido');
      expect(correo.hasError('email')).toBeTruthy();

      correo.setValue('correo.valido@ejemplo.com');
      expect(correo.hasError('email')).toBeFalsy();
    });

    it('debería validar la longitud de la contraseña', () => {
      const password = component.agregarUsuario.controls['contraseña'];
      password.setValue('12345');
      expect(password.hasError('minlength')).toBeTruthy();

      password.setValue('123456');
      expect(password.hasError('minlength')).toBeFalsy();
    });

    it('debería validar que las contraseñas coincidan', () => {
      component.agregarUsuario.patchValue({
        contraseña: 'password123',
        confirmarContraseña: 'diferente'
      });
      expect(component.agregarUsuario.hasError('mismatch')).toBeTruthy();

      component.agregarUsuario.patchValue({
        contraseña: 'password123',
        confirmarContraseña: 'password123'
      });
      expect(component.agregarUsuario.hasError('mismatch')).toBeFalsy();
    });
  });

  describe('Cambio de Tipo de Usuario', () => {
    it('debería agregar controles específicos al cambiar a conductor', () => {
      component.onUserTypeChange('conductor');

      expect(component.agregarUsuario.contains('numero_licencia')).toBeTruthy();
      expect(component.agregarUsuario.contains('fecha_vencimiento')).toBeTruthy();
      expect(component.agregarUsuario.contains('id_placa')).toBeTruthy();
      expect(component.agregarUsuario.contains('marca')).toBeTruthy();
    });

    it('debería eliminar controles específicos al cambiar a usuario normal', () => {
      component.onUserTypeChange('conductor');
      component.onUserTypeChange('usuario');

      expect(component.agregarUsuario.contains('numero_licencia')).toBeFalsy();
      expect(component.agregarUsuario.contains('fecha_vencimiento')).toBeFalsy();
      expect(component.agregarUsuario.contains('id_placa')).toBeFalsy();
      expect(component.agregarUsuario.contains('marca')).toBeFalsy();
    });
  });


  describe('Visibilidad de la Contraseña', () => {
    it('debería alternar la visibilidad de la contraseña', () => {
      expect(component.isPasswordVisible).toBeFalse();

      component.togglePasswordVisibility();
      expect(component.isPasswordVisible).toBeTrue();

      component.togglePasswordVisibility();
      expect(component.isPasswordVisible).toBeFalse();
    });
  });

  describe('Registro usuario pasajero', () => {
    it('debería registrar al usuario', () => {
      component.agregarUsuario.setValue(mockValidUser);
      component.onSubmit();

      expect(apiService.newUser).toHaveBeenCalledWith(mockValidUser);

    });
  });
});

