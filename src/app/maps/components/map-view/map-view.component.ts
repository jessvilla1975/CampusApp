import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService } from '../../services';
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

  constructor(private placesService: PlacesService
  ) {}

  ngAfterViewInit(): void {
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userlocation || [-76.1986, 4.08472], // starting position [lng, lat]
      zoom: 12, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`

        <h8 style="font-weight: bold; text-align: left;">Ubicación Cercana   </h8>
    `);


    if (this.placesService.userlocation) {
      new Marker({ color: 'red' })
        .setLngLat(this.placesService.userlocation)
        .setPopup(popup)
        .addTo(map);
    } else {
      console.error('User location is not defined');
    }




  }



}
