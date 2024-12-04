import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService, private mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userlocation,
      zoom: 12, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`

        <h8 style="font-weight: bold; text-align: left;">Ubicación Cercana   </h8>


    `);



    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userlocation || [-76.1986, 4.08472])
      .setPopup(popup)
      .addTo(map);

      // Llamada para obtener el nombre del lugar
      if (this.placesService.userlocation) {
        this.placesService.getPlaceName(this.placesService.userlocation[0], this.placesService.userlocation[1])
        .subscribe(response => {
          const placeName = response.features.length > 0 ? response.features[0].place_name : 'Ubicación desconocida';
          // Actualiza el contenido del popup con el nombre de la ubicación
          popup.setHTML(`
            <h8 style="font-weight: bold; text-align: left;">Ubicación Cercana</h8>
            <p>${placeName}</p>
          `);
        });
      }

    this.mapService.setMap(map);





  }



}
