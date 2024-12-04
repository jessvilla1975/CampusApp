import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userlocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

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

      this.isLoadingPlaces = false;
      this.places = resp.features;
      this.mapService.createMarkersFronPlaces(this.places, this.userlocation!);
    });
  }

  deletePlaces(){
    this.places = [];


  }



}
