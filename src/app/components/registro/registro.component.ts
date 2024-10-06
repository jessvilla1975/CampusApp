import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Agregado FormsModule
import { UserService } from '../../services/user.service';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent, CommonModule], // Agregado FormsModule
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  agregarUsuario: FormGroup;
  agregarConductor: FormGroup;
  isPasswordVisible: boolean = false;
  tipoUsuario: string = 'usuario'; // Por defecto, seleccionamos "usuario"

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Formulario de registro de usuario
    this.agregarUsuario = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      genero: ['', Validators.required], 
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    // Formulario de registro de conductor
    this.agregarConductor = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      id: ['', Validators.required], // Número de identificación
      numero_licencia: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
      documento_verificacion: ['', Validators.required],
      id_vehiculo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: ['', Validators.required],
      color: ['', Validators.required],
      capacidad_pasajeros: ['', Validators.required],
      genero: ['', Validators.required], // Nuevo campo de género
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Otras inicializaciones si es necesario
  }

  // Validar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    return form.get('contraseña')?.value === form.get('confirmarContraseña')?.value ? null : { mismatch: true };
  }

  // Manejar envío del formulario de usuario
  onSubmitUsuario() {
    if (this.agregarUsuario.valid) {
      this.userService.crearUsuario(this.agregarUsuario.value).subscribe(
        response => {
          alert('Usuario registrado exitosamente');
        },
        error => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar el usuario. Por favor, intenta nuevamente.');
        }
      );
    } else {
      console.error('Formulario de usuario no válido');
    }
  }

  // Manejar envío del formulario de conductor
  onSubmitConductor() {
    if (this.agregarConductor.valid) {
      this.userService.crearConductor(this.agregarConductor.value).subscribe(
        response => {
          alert('Conductor registrado exitosamente');
        },
        error => {
          console.error('Error al registrar conductor:', error);
          alert('Error al registrar el conductor. Por favor, intenta nuevamente.');
        }
      );
    } else {
      console.error('Formulario de conductor no válido');
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Método para aumentar y desminuir pasajeros en el number

  incrementar() {
    const inputElement = document.getElementById('capacidad_pasajeros') as HTMLInputElement;
    let value = parseInt(inputElement.value) || 1;
    if (value < 8) { // Máximo valor 8
      value++;
      inputElement.value = value.toString();
      this.agregarConductor.patchValue({ capacidad_pasajeros: value });
    }
  }

  // Función para decrementar el valor
  decrementar() {
    const inputElement = document.getElementById('capacidad_pasajeros') as HTMLInputElement;
    let value = parseInt(inputElement.value) || 1;
    if (value > 1) { // Mínimo valor 1
      value--;
      inputElement.value = value.toString();
      this.agregarConductor.patchValue({ capacidad_pasajeros: value });
    }
  }
  
  
}