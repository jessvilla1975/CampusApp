import { Properties } from './../interfaces/places';
import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponde, Route } from '../interfaces/directions';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = []
  private distanceSubject = new BehaviorSubject<number>(0); // Distancia inicial en 0
  distance$ = this.distanceSubject.asObservable(); // Observable para suscribirse a cambios de distancia
  private durationSubject = new BehaviorSubject<number>(0); // Duración inicial en 0
  duration$ = this.durationSubject.asObservable(); // Observable para suscribirse a cambios
  private priceSUbjet = new BehaviorSubject<number>(0);
  price$ = this.priceSUbjet.asObservable();




  get isMapReady() {
    return !!this.map;
  }

  constructor(private directionsApi: DirectionsApiClient) { }

  setMap(map: Map) {
    this.map = map;
  }

  flyto( coords: LngLatLike){
    if(!this.isMapReady) throw new Error('Map is not ready');

    this.map?.flyTo({
      center: coords,
      zoom: 14
    });
  }

  createMarkersFronPlaces(places: Feature[], userLocation: [number, number]){
    if(!this.map) throw Error("Mapa no inicializado");

    this.markers.forEach (marker => marker.remove());
    const newMarkers = [];

    for (const place of places){
      const [lng, lat] = place.center;
      const popup = new Popup()
      .setHTML(`

        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
    `);

    const newMarker = new Marker()
        .setLngLat([lng,lat])
        .setPopup (popup)
        .addTo (this.map);


      newMarkers.push(newMarker);

    }

    this.markers = newMarkers;
    if(places.length == 0 ) return;

    //limites del mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach(marker =>bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);
    this.map.fitBounds(bounds,{
      padding: 200
    })

  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    return this.directionsApi
      .get<DirectionsResponde>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((resp) => {
        const distanceInKm = resp.routes[0].distance / 1000;
        const durationInMinutes = resp.routes[0].duration / 60;
        const baseFare = 2000; // Tarifa base en COP
        const costPerKm = 300; // Costo por km en COP
        const costPerMinute = 100; // Costo por minuto en COP


        // Cálculo del precio total
        const price = Math.round(baseFare + (distanceInKm * costPerKm) + (durationInMinutes * costPerMinute));


        this.durationSubject.next(durationInMinutes); // Emitir
        this.distanceSubject.next(distanceInKm); // Emitir distancia
        this.priceSUbjet.next(price); // Emitir precio


        this.drawPolyLine(resp.routes[0]);
      });
  }

  private drawPolyLine (route: Route){
    console.log( {kms: route.distance/1000, time: route.duration/60});
    if(!this.map) throw Error('Map is not ready');
    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach( ([lng, lat]) => {
      bounds.extend([lng, lat]); ;
    });


    this.map?.fitBounds(bounds, {
      padding: 200
    });


    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    //limpiar

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }
    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 5
      }
    });


  }


}
