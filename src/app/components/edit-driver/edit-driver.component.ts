import { Component } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";

@Component({
  selector: 'app-edit-driver',
  standalone: true,
  imports: [HeaderDriverComponent],
  templateUrl: './edit-driver.component.html',
  styleUrl: './edit-driver.component.css'
})
export class EditDriverComponent {

}
