import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';
import { HeaderPassengerComponent } from '../../../components/header-passenger/header-passenger.component';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [HeaderPassengerComponent],
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

    this.mapService.setMap(map);





  }



}
