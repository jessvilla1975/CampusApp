import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  private apiUrl = 'https://api-rest-vo9r.onrender.com/api'; // Asegúrate de colocar aquí tu URL de la API

  constructor(private http: HttpClient) { }


  // Función para crear un nuevo usuario
  newUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/newUser`, user);
  }

  // Función para obtener la lista de usuarios
  Allusuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  // Función para hacer login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }


  // Función para agregar conductor
  addConductor(conductor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/newConductor`, conductor);
  }

  // Función para agregar vehículo
  addVehiculo(vehiculo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/newVehiculo`, vehiculo);
  }

  // Función para recuperar contraseña
  recuperarContrasena(credenciales: any): Observable<any> {
    //return this.http.post(`${this.apiUrl}/recuperar-contrasena`, data);
    return this.http.post(`${this.apiUrl}/sendVerificationCode`, credenciales);
    //return of({ success: true, message: 'Código de recuperación enviado.' });//marca todo como true
  }

  verificarCodigo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verifyCode`, data);
  }

  establecerContrasena(data: { correo: string; contraseña: string }) {
    return this.http.post('https://api-rest-vo9r.onrender.com/api/newPassword', data);
  }

}
