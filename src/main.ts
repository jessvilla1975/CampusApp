import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from './environments/environment.development';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc3ZpbGxhMTk3NSIsImEiOiJjbTN6N29kZG8xOWh1Mmtwc21kOXY3NHlmIn0.HzSxs5C37iEUIU2pDlJyuQ';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule)
  ]
})
.catch(err => console.error(err));

if (environment.production) {
  enableProdMode();
}

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}
