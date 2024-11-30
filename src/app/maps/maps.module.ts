import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MapScreenComponent,
    FormsModule
  ],
  exports: [
    MapScreenComponent
  ]
})
export class MapsModule { }
