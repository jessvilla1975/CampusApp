import { Component, OnInit } from '@angular/core';
import { HeaderPassengerComponent } from '../header-passenger/header-passenger.component';
import { FooterComponent } from '../footer/footer.component';
import { MapScreenComponent } from "../../maps/screens/map-screen/map-screen.component";
import { MapService, PlacesService } from '../../maps/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [HeaderPassengerComponent, FooterComponent, MapScreenComponent,
    FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
  
})

export class RoadmapComponent {

}
