import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/appusers'; // URL Api

  constructor(private httpClient: HttpClient) { }

  // Método para crear un nuevo usuario
  crearUsuario(user: { nombre: string; apellido: string; correo: string; telefono?: string; direccion?: string; fecha_nacimiento?: string; contraseña: string }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/newUser`, user);
  }

  // Método para obtener todos los usuarios
  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/allUsers`);
  }
}
