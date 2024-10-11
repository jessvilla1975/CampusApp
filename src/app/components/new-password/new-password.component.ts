import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
  export class NewPasswordComponent implements OnInit {
    establecerPassword: FormGroup;
    isPasswordVisible = false; 
    isConfirmPasswordVisible = false; 


    constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) {
      this.establecerPassword = this.fb.group({
        nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    ngOnInit(): void {}

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
          this.router.navigate(['/bike']); // Redirige al usuario a la página de inicio de sesión
          // Falta añadir la lógica para enviar la nueva contraseña al servidor

          
        } else {
          alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        }
      } else {
        console.error('Formulario no válido');
      }
    }
     // }
}
