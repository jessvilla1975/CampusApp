import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  constructor(private  placesApi: PlacesApiClient,
    private mapService: MapService,
    private http: HttpClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userlocation = [coords.longitude, coords.latitude];
          resolve(this.userlocation);
          console.log(this.userlocation);


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

  getPlaceName(longitude: number, latitude: number): Observable<any> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`;
    const params = new HttpParams()
      .set('country', 'co')
      .set('language', 'es')
      .set('limit', '1')
      .set('access_token', environment.apiKey);

    return this.http.get<any>(url, { params });
  }




}
