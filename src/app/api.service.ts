import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //https://api-rest-vo9r.onrender.com/api
  //http://localhost:9001/api
  private apiUrl = 'http://localhost:9001/api'; //URL de la API

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
    return this.http.post(`${this.apiUrl}/newPassword`, data);
    //return this.http.post('https://api-rest-vo9r.onrender.com/api/newPassword', data);
  }

  // Función para enviar solicitud de ayuda
  // Método para crear una solicitud en la mesa de ayuda
  createHelpDeskRequest(data: { nombre: string; correo: string; telefono?: string; comentario: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/helpDesk`, data);
  }
  getUserById(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/usuariosid/${userId}`);
  }

  getConductorById(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/conductor/${userId}`);
  }

  getTravelHistory(userId: string) {
    const url = `${this.apiUrl}/historialViajes/${userId}`;
    console.log('URL de la solicitud:', url); // Depuración
    return this.http.get<any>(url);
  }

  getTravelHistoryDriver(userId: string) {
    const url = `${this.apiUrl}/historialViajesConductor/${userId}`;
    console.log('URL de la solicitud:', url); // Depuración
    return this.http.get<any>(url);
  }







  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateUser/${userId}`, userData);
  }

  updateDriver(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateConductor/${userId}`, userData);
  }

  // Función para crear un viaje
  createViaje(viajeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/viajes `, viajeData);
  }

  // Función para obtener la lista de solicitudes de viaje
  getSolicitudesViajes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudViajes`);
  }

  // Función para aceptar un viaje

  aceptarViaje(idViaje: number, idConductor: string) {
    return this.http.put(`${this.apiUrl}/aceptarViaje/${idViaje}`, { id_conductor: idConductor });
  }

  createUbicacion(ubicacionData: any) {
    return this.http.post<any>(`${this.apiUrl}/ubicacion`, ubicacionData);
  }

  // Método para obtener el último ID de viaje
  getUltimoViajeId(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/ultimo-viaje/${userId}`);
  }

  getCoordenadasViaje(idViaje: number) {
    return this.http.get<any>(`${this.apiUrl}/coordenadas-viaje/${idViaje}`);
  }


















}
