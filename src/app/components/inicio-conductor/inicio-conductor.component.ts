import { Component, OnInit } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MapScreenComponent } from "../../maps/screens/map-screen/map-screen.component";
import { MapService, PlacesService } from '../../maps/services';
import { Feature } from '../../maps/interfaces/places';

@Component({
  selector: 'app-inicio-conductor',
  standalone: true,
  imports: [HeaderDriverComponent, FooterComponent, CommonModule,
    ReactiveFormsModule, MapScreenComponent],
  templateUrl: './inicio-conductor.component.html',
  styleUrls: ['./inicio-conductor.component.css']
})

export class InicioConductorComponent implements OnInit {

  fullName: string = '';
  userId: string = '';
  solicitudesViajes: any[] = [];  // Array para almacenar las solicitudes de viaje
  solicitudSeleccionada: any = null;

  constructor(private router: Router, private apiService: ApiService, private placesService: PlacesService,
    private mapService: MapService) { }

  ngOnInit(): void {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      this.userId = userIdFromStorage;
      this.loadUserData();
      this.loadSolicitudesViajes();

    } else {
      this.router.navigate(['/login']);
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

  // Cargar las solicitudes de viaje desde el endpoint
  private loadSolicitudesViajes(): void {
    this.apiService.getSolicitudesViajes().subscribe({
      next: (response: any) => {
        if (response) {
          this.solicitudesViajes = response;
        } else {
          console.log('No hay solicitudes de viajes en proceso');
        }
      },
      error: (error) => {
        console.error('Error al cargar las solicitudes de viajes', error);
        alert('Error al cargar las solicitudes de viajes.');
      }
    });
  }

  aceptarViaje(solicitud: any) {
    // Verificar que el userId del conductor esté disponible
    if (!this.userId) {
      alert('No se ha identificado al conductor');
      return;
    }

    // Llamar al servicio para aceptar el viaje
    this.apiService.aceptarViaje(solicitud.id_viaje, this.userId).subscribe({
      next: (response: any) => {
        // Manejar respuesta exitosa
        alert('Viaje aceptado exitosamente');

        // Eliminar la solicitud de la lista
        this.solicitudesViajes = this.solicitudesViajes.filter(viaje => viaje.id_viaje !== solicitud.id_viaje);
      },
      error: (error) => {
        // Manejar errores
        console.error('Error al aceptar el viaje', error);
        alert('No se pudo aceptar el viaje. Intente nuevamente.');
      }
    });
  }

 //selecccionar tarjeta
 seleccionarViaje(solicitud: any) {
  console.log('Datos de solicitud:', solicitud);

  // Verificar si la ubicación del conductor está lista
  if (!this.placesService.isUserLocationReady) {
    alert('No se ha obtenido la ubicación del conductor');
    return;
  }

  // Obtener la ubicación del conductor
  this.placesService.getUserLocation().then((conductorCoords) => {
    console.log('Coordenadas del conductor:', conductorCoords);

    // Llamar a la API para obtener las coordenadas del viaje
    this.apiService.getCoordenadasViaje(solicitud.id_viaje).subscribe({
      next: (response: any) => {
        if (response.success) {
          const { origen_latitud, origen_longitud, nombre_origen } = response.data;

          // Obtener coordenadas de origen del pasajero
          const pasajeroCoords: [number, number] = [parseFloat(origen_longitud), parseFloat(origen_latitud)];

          // Crear un objeto Feature que coincida con la interfaz
          const pasajeroFeature: Feature = {
            id: `passenger-${solicitud.id_viaje}`,
            type: 'Feature',
            place_type: ['point'],
            relevance: 1,
            properties: {
              landmark: true,
              category: 'passenger-location'
            },
            text_es: 'Ubicación del Pasajero',
            text: 'Ubicacion Pasajero',
            place_name_es: nombre_origen,
            place_name: nombre_origen,
            center: pasajeroCoords,
            geometry: {
              type: 'Point',
              coordinates: pasajeroCoords
            },
            context: [] // Puedes dejarlo vacío o añadir contexto si lo tienes
          };

          // Marcar la posición del pasajero
          this.mapService.createMarkersFronPlaces([pasajeroFeature], conductorCoords);

          // Dibujar la ruta entre el conductor y el origen del pasajero
          this.mapService.getRouteBetweenPoints(conductorCoords, pasajeroCoords);
        } else {
          alert('No se pudieron obtener las coordenadas del pasajero');
        }
      },
      error: (error) => {
        console.error('Error al obtener coordenadas del viaje', error);
        alert('Error al obtener las coordenadas del viaje');
      },
    });
  }).catch((error) => {
    console.error('Error al obtener ubicación', error);
    alert('No se pudo obtener su ubicación actual');
  });
}









}

