import { Component } from '@angular/core';
import { SearchResultsComponent } from "../search-results/search-results.component";
import { PlacesService } from '../../services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchResultsComponent, FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;
  constructor(private placesService: PlacesService) { }

    onQueryChange(query: string ="") {

      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.placesService.getPlacesQuery(query);
      }, 1000);
    }
}
