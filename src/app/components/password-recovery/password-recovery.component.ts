import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recovery: FormGroup;
  showVerification = false;
  verification: FormGroup;

  recoverySubmitted: boolean = false; // Para el formulario de recuperación de contraseña
  verificationCodeSubmitted: boolean = false; // Para el formulario de verificación de código

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) {
    this.recovery = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    this.verification = this.fb.group({
      codigo_verificacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Otras inicializaciones si es necesario
  }

  onSubmit() {
    if (this.recovery.valid) {
      console.log(this.recovery.value);
      this.userService.recuperarContrasena(this.recovery.value).subscribe(
        response => {
          console.log('Solicitud de recuperación de contraseña enviada:', response);
          alert('Se enviará un código a tu correo para que restablezcas tu contraseña.');
          this.showVerification = true; // Cambia a la vista de ingresar código
        },
        error => {
          console.error('Error en la recuperación de contraseña:', error);
          alert('Hubo un error al procesar la solicitud. Intenta nuevamente.');
        }
      );
    } else {
      console.error('Formulario no válido');
      const controlErrors = this.recovery.get('correo')?.errors;
      if (controlErrors) {
        console.log('Error en el campo correo:', controlErrors);
      }
    }
  }

  onVerifyCode() {
    this.verificationCodeSubmitted = true;

    if (this.verification.valid) {
      const verificationData = {
        correo: this.recovery.get('correo')?.value, // Reutiliza el correo del formulario recovery
        codigo_verificacion: this.verification.get('codigo_verificacion')?.value
      };

      this.userService.verificarCodigo(verificationData).subscribe(
        response => {
          if (response.success) {
            console.log('Código verificado correctamente:', response);
            alert('Código de verificación correcto');

            // Navegar a la página de nueva contraseña
            const correo = this.recovery.get('correo')?.value; // Obtener el correo
            const codigo_verificacion = this.verification.get('codigo_verificacion')?.value; // Obtener el código

            this.router.navigate(['/new-password', correo]); // Navega a new-password
          } else {
            console.error('Código de verificación incorrecto');
            alert('Código de verificación incorrecto. Inténtalo de nuevo.');
          }
        },
        error => {
          console.error('Error al verificar el código:', error);
          alert('Error al verificar el código. Intenta nuevamente.');
        }
      );
    } else {
      console.error('Formulario de verificación no válido');
      alert('Por favor, ingresa el código de verificación.');
    }
  }
}
