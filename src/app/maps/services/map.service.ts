import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map | undefined;
  private markers: Marker[] = []

  get isMapReady() {
    return !!this.map;
  }

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

  createMarkersFronPlaces(places: Feature[]){
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

  }


}
