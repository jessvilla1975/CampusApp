import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public userlocation: [number, number] | undefined;

  get isUserLocationReady(): boolean {
    return !!this.userlocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userlocation = [coords.longitude, coords.latitude];
          resolve(this.userlocation);
        },
        (error) => {
          console.error(error);
          alert('No se puedo obtener geolocalización');
          reject(error);
        }
      );
    });
  }






}
