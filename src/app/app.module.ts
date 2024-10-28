import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [


  ],
  imports: [
    BrowserModule,
    AppRoutes,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule


  ],
  providers: [],

})
export class AppModule { }
