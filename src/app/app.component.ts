import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityComponent } from './city/city.component';
import { CityService } from './services/city.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CityComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private cityService = inject(CityService);

  citiesResource = this.cityService.fetchCities();

  toBigInt(val: string): bigint {
    try {
      return BigInt(val);
    } catch {
      return 0n;
    }
  }
}
