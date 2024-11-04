import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { ApiService } from '../../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SliderComponent } from '../slider/slider.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['createHelpDeskRequest']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        SliderComponent
      ],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    expect(component.helpForm.get('nombre')?.value).toBe('');
    expect(component.helpForm.get('correo')?.value).toBe('');
    expect(component.helpForm.get('telefono')?.value).toBe('');
    expect(component.helpForm.get('comentario')?.value).toBe('');
  });

  it('debería marcar el formulario como inválido cuando está vacío', () => {
    expect(component.helpForm.valid).toBeFalsy();
  });

  it('debería validar el formato de correo electrónico', () => {
    const correoControl = component.helpForm.get('correo');

    correoControl?.setValue('correo-invalido');
    expect(correoControl?.errors?.['email']).toBeTruthy();

    correoControl?.setValue('correo@valido.com');
    expect(correoControl?.errors).toBeNull();
  });

  it('debería validar los campos requeridos', () => {
    const nombreControl = component.helpForm.get('nombre');
    const correoControl = component.helpForm.get('correo');
    const comentarioControl = component.helpForm.get('comentario');

    expect(nombreControl?.errors?.['required']).toBeTruthy();
    expect(correoControl?.errors?.['required']).toBeTruthy();
    expect(comentarioControl?.errors?.['required']).toBeTruthy();
  });

  it('debería ser válido con todos los campos requeridos completos', () => {
    const formData = {
      nombre: 'Usuario Test',
      correo: 'test@example.com',
      telefono: '1234567890',
      comentario: 'Comentario de prueba'
    };

    component.helpForm.setValue(formData);
    expect(component.helpForm.valid).toBeTruthy();
  });

  it('debería llamar al servicio createHelpDeskRequest y resetear el formulario cuando el envío es exitoso', () => {
    const formData = {
      nombre: 'Usuario Test',
      correo: 'test@example.com',
      telefono: '1234567890',
      comentario: 'Comentario de prueba'
    };

    spyOn(window, 'alert');
    apiService.createHelpDeskRequest.and.returnValue(of({ success: true }));

    component.helpForm.setValue(formData);
    component.onSubmit();

    expect(apiService.createHelpDeskRequest).toHaveBeenCalledWith(formData);
    expect(window.alert).toHaveBeenCalledWith('Su mensaje ha sido enviado correctamente.');
    expect(component.helpForm.value).toEqual({
      nombre: '',
      correo: '',
      telefono: '',
      comentario: ''
    });
  });

  it('debería mostrar un mensaje de error cuando falla el envío del formulario', () => {
    const formData = {
      nombre: 'Usuario Test',
      correo: 'test@example.com',
      telefono: '1234567890',
      comentario: 'Comentario de prueba'
    };

    spyOn(window, 'alert');
    apiService.createHelpDeskRequest.and.returnValue(throwError(() => new Error('Error en el envío')));

    component.helpForm.setValue(formData);
    component.onSubmit();

    expect(apiService.createHelpDeskRequest).toHaveBeenCalledWith(formData);
    expect(window.alert).toHaveBeenCalledWith('Hubo un error al enviar el mensaje. Inténtelo de nuevo.');
  });

  it('debería mostrar mensaje de error cuando se intenta enviar un formulario inválido', () => {
    spyOn(window, 'alert');

    component.onSubmit();

    expect(apiService.createHelpDeskRequest).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Por favor, complete los campos obligatorios.');
  });
});
