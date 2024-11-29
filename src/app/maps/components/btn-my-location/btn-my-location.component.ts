
import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { error } from 'console';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(private placesService: PlacesService, private mapService: MapService) {

  }
  goToMyLocation() {
    console.log('Go to my location');
    this.placesService.getUserLocation().then((coords) => {
      this.mapService.flyto(coords);
    }).catch((error) => {
      console.error(error);
    });

  }

}
