import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ingresoUsuario: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) {
    this.ingresoUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.ingresoUsuario.valid) {
      console.log(this.ingresoUsuario.value);
      this.userService.login(this.ingresoUsuario.value).subscribe({
        next: (response) => {
          console.log('Usuario validado:', response);

          // Acceder directamente al rol desde la respuesta
          const rol = response.rol; // Ya no usamos response.user.rol

          // Guardar información del usuario en localStorage
          localStorage.setItem('userId', response.id);
          localStorage.setItem('userRole', rol);

          // Verifica que los valores se almacenaron correctamente
          console.log('userId en localStorage:', localStorage.getItem('userId'));
          console.log('userRole en localStorage:', localStorage.getItem('userRole'));
          console.log('Datos enviados:', this.ingresoUsuario.value);
          // Redirige dependiendo del rol
          switch(rol) {
            case 'admin':
              // this.router.navigate(['/admin-dashboard']);
              break;
            case 'conductor':
              this.router.navigate(['/edit-driver']);
              break;
            case 'pasajero':
              this.router.navigate(['/edit-passenger']);

              break;
            default:
              this.router.navigate(['/login']);
          }

          alert('Ingreso exitoso');
        },
        error: (error) => {
          console.error('Error al ingresar usuario:', error);
          alert('Usuario o contraseña incorrecto. Por favor, intenta nuevamente.');
        }
      });
    } else {
      console.error('Formulario no válido');
      Object.keys(this.ingresoUsuario.controls).forEach(control => {
        const controlErrors = this.ingresoUsuario.get(control)?.errors;
        if (controlErrors) {
          console.log(`Control: ${control}`, controlErrors);
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
