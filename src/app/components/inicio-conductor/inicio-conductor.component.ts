import { Component, OnInit } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-inicio-conductor',
  standalone: true,
  imports: [HeaderDriverComponent, FooterComponent],
  templateUrl: './inicio-conductor.component.html',
  styleUrl: './inicio-conductor.component.css'
})
export class InicioConductorComponent implements OnInit{

  fullName: string = '';
  userId: string = '';

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
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

}
