import { Component } from '@angular/core';
import { HeaderDriverComponent } from "../header-driver/header-driver.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inicio-conductor',
  standalone: true,
  imports: [HeaderDriverComponent, FooterComponent],
  templateUrl: './inicio-conductor.component.html',
  styleUrl: './inicio-conductor.component.css'
})
export class InicioConductorComponent {

}
