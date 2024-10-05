import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BikeComponent } from './components/bike/bike.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule, RouterLink,
    LoginComponent, RegistroComponent, HeaderComponent, BikeComponent], // Importa el componente TarjetaComponent aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido de styleUrl a styleUrls
})
export class AppComponent {
  title = 'campusRide';
}
