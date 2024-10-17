import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router'; // Importa Router
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ingresoUsuario: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) { // Inyecta Router
    this.ingresoUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Otras inicializaciones si es necesario
  }

  onSubmit() {
    if (this.ingresoUsuario.valid) {
      console.log(this.ingresoUsuario.value);
      this.userService.login(this.ingresoUsuario.value).subscribe(
        response => {
          console.log('Usuario validado:', response);
          alert('Ingreso exitoso');
          this.router.navigate(['/bike']); // Navega a la página /bike
        },
        error => {
          console.error('Error al ingresar usuario:', error);
          alert('Usuario o contraseña incorrecto. Por favor, intenta nuevamente.');
        }
      );
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

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
