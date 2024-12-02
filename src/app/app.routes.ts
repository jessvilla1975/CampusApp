import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BikeComponent } from './components/bike/bike.component';
import { NgModule } from '@angular/core';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/slider/slider.component';
import { HeaderDriverComponent } from './components/header-driver/header-driver.component';
import { HeaderPassengerComponent } from './components/header-passenger/header-passenger.component';
import { InicioPasajeroComponent } from './components/inicio-pasajero/inicio-pasajero.component';
import { InicioConductorComponent } from './components/inicio-conductor/inicio-conductor.component';
import path from 'path';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'bike', component: BikeComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: 'new-password/:correo', component: NewPasswordComponent },
  {path: 'home', component: HomeComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'driver', component: HeaderDriverComponent},
  {path: 'pass', component: HeaderPassengerComponent},
  {path: 'inicio-pasajero', component: InicioPasajeroComponent},
  {path: 'inicio-conductor', component: InicioConductorComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true  // Esto puede ayudar con el enrutamiento en GitHub Pages
  })],
  exports: [RouterModule]
})
export class AppRoutes {}
