import { Component, OnInit } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MapScreenComponent } from "../../maps/screens/map-screen/map-screen.component";

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

  constructor(private router: Router, private apiService: ApiService) { }

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






}

