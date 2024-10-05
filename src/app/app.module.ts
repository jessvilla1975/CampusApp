import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component'; // Asegúrate de la ruta correcta
import { LoginComponent } from './components/login/login.component'; // Asegúrate de la ruta correcta
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
@NgModule({
  declarations: [


  ],
  imports: [
    BrowserModule,
    AppRoutes,
    ReactiveFormsModule,
    CommonModule


  ],
  providers: [],

})
export class AppModule { }
