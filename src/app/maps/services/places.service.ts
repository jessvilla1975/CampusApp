import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userlocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  private placeSUbjet = new BehaviorSubject<string>('');
  place$ = this.placeSUbjet.asObservable();


  get isUserLocationReady(): boolean {
    return !!this.userlocation;
  }

  constructor(private  placesApi: PlacesApiClient, private mapService: MapService) {
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


  getPlacesQuery(query: string= "") {

    if (query.length == 0){
      this.places = [];
      this.isLoadingPlaces = false;

      return;
    }

    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`,{
      params:{
        proximity: this.userlocation!.join(',')
      }
      }).subscribe( resp => {

      const nameUserLOcation = resp.features[0].place_name;
      console.log(nameUserLOcation);
      this.placeSUbjet.next(nameUserLOcation); // locacion destino

      this.isLoadingPlaces = false;
      this.places = resp.features;
      this.mapService.createMarkersFronPlaces(this.places, this.userlocation!);
    });
  }

  deletePlaces(){
    this.places = [];


  }



}
