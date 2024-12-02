import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  constructor(private placesService: PlacesService, private mapService: MapService) {
    // constructor implementation
}
  get isLoadingPlaces(): boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesService.places;
  }

  flyto (place: Feature){
    const[lng, lat] = place.center;
    this.mapService.flyto([lng, lat]);

  }



}
