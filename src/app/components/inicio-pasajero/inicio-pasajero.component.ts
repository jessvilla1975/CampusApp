import { Component, OnInit } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';
import { MapScreenComponent } from "../../maps/screens/map-screen/map-screen.component";
import { MapService, PlacesService } from '../../maps/services';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from "../../maps/components/search-results/search-results.component";
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-pasajero',
  standalone: true,
  imports: [HeaderPassengerComponent, FooterComponent, MapScreenComponent,
    FormsModule, SearchResultsComponent, CommonModule],
  templateUrl: './inicio-pasajero.component.html',
  styleUrl: './inicio-pasajero.component.css'
})
export class InicioPasajeroComponent implements OnInit {
  private debounceTimer?: NodeJS.Timeout;
  fullName: string = '';
  userId: string = '';
  locationInput: string = '';
  locationOutput: string = '';
  distance: number = 0;
  duration: number = 0;
  price: number = 0;

  constructor(private placesService: PlacesService,
              private mapService: MapService,
              private router: Router,
              private apiService: ApiService) {}

  ngOnInit(): void {
    // Suscribirse al observable de distancia
    this.mapService.distance$.subscribe((distance) => {
      this.distance = distance;
    });

    // Suscribirse al observable de duración
    this.mapService.duration$.subscribe((duration) => {
      this.duration = duration;
    });

    // Suscribirse al observable de precio
    this.mapService.price$.subscribe((price) => {
      this.price = price;
    });

    // Obtener la ubicación del usuario
    this.placesService.place$.subscribe((place) => {
      this.locationOutput = place;
    });

    // Obtener el userId desde localStorage
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      this.userId = userIdFromStorage;
      this.loadUserData();
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no hay userId
    }
  }

  // Cargar los datos del usuario desde la API
  private loadUserData(): void {
    this.apiService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.fullName = `${response.data.usuario.nombre} ${response.data.usuario.apellido}`;
        } else {
          alert('No se pudo cargar la información del usuario.');
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario', error);
        alert('Error al cargar los datos del usuario.');
      }
    });
  }

  // Obtiene la ubicación y llena el input automáticamente
  goToMyLocation() {
    console.log('Go to my location');
    this.locationInput = 'Mi ubicación'; // Texto temporal en el input

    // Llamar al servicio para obtener las coordenadas del usuario
    this.placesService.getUserLocation().then((coords) => {
      // Usamos las coordenadas obtenidas para obtener el nombre del lugar
      this.placesService.getPlaceName(coords[0], coords[1]).subscribe({
        next: (response) => {
          const placeName = response.features.length > 0 ? response.features[0].place_name : 'Ubicación desconocida';
          if (placeName === 'Calle 42 22 10, 763022 Tuluá, Valle del Cauca, Colombia') {
            this.locationInput  = 'Universidad Universidad del Valle - Sede Príncipe, Kra 23, Tuluá, Valle del Cauca 763022, Colombia';
          }else{
            this.locationInput = placeName;
          }



        },
        error: (error: any) => {
          console.error('Error al obtener el nombre del lugar', error);
          this.locationInput = 'Ubicación desconocida';
        }
      });

      // Mover el mapa a las coordenadas
      this.mapService.flyto(coords);
    }).catch((error) => {
      console.error('Error al obtener la ubicación', error);
      this.locationInput = 'Ubicación desconocida';
    });
  }

  onQueryChange(query: string = "") {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesQuery(query);
    }, 1000);
  }
}
