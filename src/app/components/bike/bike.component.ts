import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bike',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.css'
})
export class BikeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Establece un tiempo de carga de 3 segundos
      /* setTimeout(() => {
      this.router.navigate(['/login']); // Redirige a la ruta de inicio
    }, 5000); */
  }
}
