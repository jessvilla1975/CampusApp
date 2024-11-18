import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderPassengerComponent } from './components/header-passenger/header-passenger.component';
import { HeaderDriverComponent } from './components/header-driver/header-driver.component';
import { BikeComponent } from './components/bike/bike.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { HomeComponent } from './components/home/home.component';
import { AuntentucationLoginComponent } from './components/auntentucation-login/auntentucation-login.component';
import { SliderComponent } from './components/slider/slider.component';
import { EditPassengerComponent } from './components/edit-passenger/edit-passenger.component';
import { EditDriverComponent } from './components/edit-driver/edit-driver.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule, RouterLink,
    LoginComponent, RegistroComponent, HeaderComponent, HeaderPassengerComponent, HeaderDriverComponent, BikeComponent, 
    PasswordRecoveryComponent, NewPasswordComponent, HomeComponent, SliderComponent, AuntentucationLoginComponent, EditPassengerComponent, EditDriverComponent], // Importa el componente TarjetaComponent aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido de styleUrl a styleUrls
})
export class AppComponent {
  title = 'campusRide';
}
