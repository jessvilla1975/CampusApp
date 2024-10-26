import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterOutlet, RouterLink, CommonModule, FooterComponent, RouterLink],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  establecerPassword: FormGroup;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  correo: string = ''; // Para almacenar el correo

  constructor(
    private fb: FormBuilder,
    private userService: ApiService,
    private router: Router,
    private route: ActivatedRoute // Inyectar ActivatedRoute para acceder al parámetro
  ) {
    this.establecerPassword = this.fb.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Obtener el parámetro 'correo' de la ruta
    this.correo = this.route.snapshot.paramMap.get('correo') || '';
    console.log('Correo recibido:', this.correo);
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onSubmit() {
    if (this.establecerPassword.valid) {
      const { nuevaContrasena, confirmarContrasena } = this.establecerPassword.value;
      if (nuevaContrasena === confirmarContrasena) {
        console.log('Contraseña establecida:', nuevaContrasena);
        alert('La contraseña se ha establecido correctamente.');


        const data = {
          correo: this.correo,
          contraseña: nuevaContrasena
        };

        this.userService.establecerContrasena(data).subscribe({
          next: (response) => {
            console.log('Respuesta del servidor:', response);
            this.router.navigate(['/bike']);
          },
          error: (err) => {
            console.error('Error al establecer la contraseña:', err);
            alert('Error al establecer la contraseña. Por favor, inténtalo de nuevo.');
          }
        });

      } else {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      }
    } else {
      console.error('Formulario no válido');
    }
  }

}

