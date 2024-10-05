import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  agregarUsuario: FormGroup;
  isPasswordVisible: boolean = false;
  constructor(private fb: FormBuilder, private userService: ApiService) {
    this.agregarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Otras inicializaciones si es necesario
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('contraseña')?.value === form.get('confirmarContraseña')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.agregarUsuario.valid) {
      console.log(this.agregarUsuario.value); // Muestra los datos del formulario en la consola
      // Llama al servicio para registrar el usuario
      this.userService.newUser(this.agregarUsuario.value).subscribe(
        response => {
          console.log('Usuario registrado:', response);
          // Aquí puedes redirigir o mostrar un mensaje de éxito
          alert('Registro exitoso'); // Muestra una alerta o puedes redirigir a otra página
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Maneja el error, muestra un mensaje al usuario si es necesario
          alert('Error al registrar el usuario. Por favor, intenta nuevamente.'); // Muestra una alerta de error
        }
      );
    } else {
      console.error('Formulario no válido');
      // Imprimir los errores específicos
      Object.keys(this.agregarUsuario.controls).forEach(control => {
        const controlErrors = this.agregarUsuario.get(control)?.errors;
        if (controlErrors) {
          console.log(`Control: ${control}`, controlErrors);
        }
      });
    }
  }

   // Método para alternar la visibilidad de la contraseña
   togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


}
