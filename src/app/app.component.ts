import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from "./registro/registro.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RegistroComponent], // Importa el componente TarjetaComponent aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido de styleUrl a styleUrls
})
export class AppComponent {
  title = 'campusRide';
}
