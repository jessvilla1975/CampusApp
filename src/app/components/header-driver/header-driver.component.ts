import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-driver',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-driver.component.html',
  styleUrl: './header-driver.component.css'
})
export class HeaderDriverComponent {
  @Input() fullName: string = '';
}
