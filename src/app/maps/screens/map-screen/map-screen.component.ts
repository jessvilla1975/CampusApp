import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';
import { LoadingComponent } from "../../components/loading/loading.component";
import { MapViewComponent } from "../../components/map-view/map-view.component";
import { CommonModule } from '@angular/common';
import { BtnMyLocationComponent } from "../../components/btn-my-location/btn-my-location.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [LoadingComponent, MapViewComponent, CommonModule, BtnMyLocationComponent, SearchBarComponent],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent{
  constructor(private placeService: PlacesService) {}

  ngOnInit() {}

  get isUserLocationReady(){
    return this.placeService.isUserLocationReady;
  }

}
