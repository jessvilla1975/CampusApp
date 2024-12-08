import { Component, OnInit } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-travel-history-passenger',
  standalone: true,
  imports: [
    HeaderPassengerComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './travel-history-passenger.component.html',
  styleUrls: ['./travel-history-passenger.component.css']
})
export class TravelHistoryPassengerComponent implements OnInit {
  fullName: string = '';
  userId: string = '';
  historialViajes: any[] = [];  // Array para almacenar el historial de viajes

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verificación detallada del userId en localStorage
    const userIdFromStorage = localStorage.getItem('userId');
    console.log('UserID almacenado:', userIdFromStorage);

    if (userIdFromStorage) {
      this.userId = userIdFromStorage;
      this.loadUserData();
      this.loadTravelHistory();
    } else {
      console.warn('No se encontró userID en localStorage');
      this.router.navigate(['/login']);
    }
  }

  // Método para cargar datos del usuario
  private loadUserData(): void {
    console.log('Cargando datos del usuario con ID:', this.userId);

    this.apiService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        console.log('Respuesta al cargar los datos del usuario:', response);

        if (response.success) {
          this.fullName = `${response.data.usuario.nombre} ${response.data.usuario.apellido}`;
        } else {
          console.error('No se pudo cargar la información del usuario');
          alert('No se pudo cargar la información del usuario.');
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario', error);
        alert('Error al cargar los datos del usuario. Verifica la consola para más detalles.');
      }
    });
  }

  // Método para cargar historial de viajes con manejo flexible de respuestas
  private loadTravelHistory(): void {
    console.log('Cargando historial de viajes para el usuario:', this.userId);

    this.apiService.getTravelHistory(this.userId).subscribe({
      next: (response: any) => {
        console.log('Respuesta de la API: ', response);

        // Manejo flexible de diferentes estructuras de respuesta
        if (Array.isArray(response)) {
          // Si la respuesta es directamente un array
          this.historialViajes = response;
        } else if (response.success && Array.isArray(response.data)) {
          // Si la respuesta tiene una propiedad success y data
          this.historialViajes = response.data;
        } else {
          console.error('Formato de respuesta inesperado', response);
          alert('No se pudo cargar el historial de viajes.');
          this.historialViajes = []; // Asegurar que el array esté vacío
        }

        console.log('Historial de viajes cargados:', this.historialViajes);
      },
      error: (error) => {
        console.error('Error al cargar el historial de viajes', error);
        alert('Error al cargar el historial de viajes. Verifica la consola para más detalles.');
        this.historialViajes = []; // Asegurar que el array esté vacío en caso de error
      }
    });
  }
}
