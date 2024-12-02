import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ApiService } from '../../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: Router;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Importar el componente standalone
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent
      ],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    expect(component.ingresoUsuario.get('correo')?.value).toBe('');
    expect(component.ingresoUsuario.get('contraseña')?.value).toBe('');
  });

  it('debería marcar el formulario como inválido cuando está vacío', () => {
    expect(component.ingresoUsuario.valid).toBeFalsy();
  });

  it('debería validar el formato de correo electrónico', () => {
    const correoControl = component.ingresoUsuario.get('correo');

    correoControl?.setValue('correo-invalido');
    expect(correoControl?.errors?.['email']).toBeTruthy();

    correoControl?.setValue('correo@valido.com');
    expect(correoControl?.errors).toBeNull();
  });


  it('no debería navegar cuando el login falla', () => {
    const credenciales = {
      correo: 'test@example.com',
      contraseña: 'password123'
    };

    apiService.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.ingresoUsuario.setValue(credenciales);
    component.onSubmit();

    expect(apiService.login).toHaveBeenCalledWith(credenciales);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debería alternar la visibilidad de la contraseña', () => {
    expect(component.isPasswordVisible).toBeFalse();

    component.togglePasswordVisibility();
    expect(component.isPasswordVisible).toBeTrue();

    component.togglePasswordVisibility();
    expect(component.isPasswordVisible).toBeFalse();
  });
});
