import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityComponent } from './city/city.component';
import { CityService } from './services/city.service';
import { LocationService } from './services/location.service';
import { City } from './interfaces/City';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CityComponent, NbButton],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private cityService = inject(CityService);
  private locationService = inject(LocationService);

  citiesResource = this.cityService.fetchCities();

  isLoadingLocation = signal(false);
  locationError = signal<string | null>(null);
  localCity = signal<City | null>(null);

  detectLocation() {
    this.isLoadingLocation.set(true);
    this.locationError.set(null);
    this.localCity.set(null);

    this.locationService
      .getCurrentPosition()
      .then(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Gerar temperatura mockada (entre 10 e 35 graus)
        const mockTemp = Math.floor(Math.random() * 26) + 10;

        this.localCity.set({
          city: `Local (${lat.toFixed(2)}, ${lon.toFixed(2)})`,
          temperature: mockTemp,
        });
        this.isLoadingLocation.set(false);
      })
      .catch(error => {
        console.error('Erro de geolocalização:', error);
        let errorMsg = 'Não foi possível obter a sua localização.';
        if (error.code === 1) {
          errorMsg = 'Permissão de localização negada.';
        } else if (error.code === 2) {
          errorMsg = 'A localização não pôde ser determinada.';
        } else if (error.code === 3) {
          errorMsg = 'Tempo esgotado para obter a localização.';
        }
        this.locationError.set(errorMsg);
        this.isLoadingLocation.set(false);
      });
  }
}
