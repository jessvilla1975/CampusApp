import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auntentucation-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './auntentucation-login.component.html',
  styleUrls: ['./auntentucation-login.component.css']
})
export class AuntentucationLoginComponent {
  otp: string[] = ['', '', '', '']; // Almacena los valores de los inputs de OTP
  correo: string = ''; // Correo del usuario, este debe pasarse al componente

  constructor(private apiService: ApiService, private router: Router) {
    // Obtener el correo desde el almacenamiento local o un servicio compartido
    const savedCorreo = localStorage.getItem('correo');
    if (savedCorreo) {
      this.correo = savedCorreo;
      console.log('Correo guardado:', this.correo);
    }
  }

  // Enviar código de verificación al backend para validación
  onSubmit() {
    const codigo_verificacion = this.otp.join(''); // Combinar los inputs del código en un string
    if (codigo_verificacion.length !== 4) {
      alert('Por favor, complete el código de verificación.');
      return;
    }

    this.apiService.verificarCodigo({ correo: this.correo, codigo_verificacion }).subscribe(
      response => {
        if (response.success) {
          alert('Código verificado exitosamente.');
          this.router.navigate(['/login']); // Redirige a la página principal
        } else {
          alert('Código incorrecto. Inténtalo nuevamente.');
        }
      },
      error => {
        console.error('Error al verificar el código:', error);
        alert('Hubo un problema al verificar el código. Inténtalo más tarde.');
      }
    );
  }

  // Reenviar el código de verificación
  resendCode() {
    this.apiService.newUser({ correo: this.correo }).subscribe(
      response => {
        alert('Nuevo código enviado a tu correo.');
      },
      error => {
        console.error('Error al reenviar el código:', error);
        alert('No se pudo reenviar el código. Inténtalo más tarde.');
      }
    );
  }

  // Salir y redirigir a la página de inicio de sesión
  exit() {
    this.router.navigate(['/login']);
  }
}
