import { Component, inject, signal } from '@angular/core';
import { NbButton, NbCallout, NbCluster, NbStack, NbTitle } from '@ng-brutalism/ui';
import { CityApi } from '../../apis/city/city.api';
import { CityCardComponent } from '../../components/city-card/city-card.component';
import { City } from '../../interfaces/City';
import { LocationService } from '../../services/location/location.service';

@Component({
  templateUrl: './cities.page.html',
  imports: [CityCardComponent, NbButton, NbStack, NbCluster, NbCallout, NbTitle],
  standalone: true,
})
export class CitiesPage {
  private cityApi = inject(CityApi);
  private locationService = inject(LocationService);

  citiesResource = this.cityApi.fetchCities();

  isLoadingLocation = signal(false);
  locationError = signal<string | null>(null);
  localCity = signal<City | null>(null);

  detectLocation() {
    this.isLoadingLocation.set(true);
    this.locationError.set(null);
    this.localCity.set(null);

    this.locationService
      .getCurrentPosition()
      .then((position: any) => {
        console.log(position);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Gerar temperatura mockada (entre 10 e 35 graus)
        const mockTemp = Math.floor(Math.random() * 26) + 10;

        this.localCity.set({
          city: `Local (${lat.toFixed(2)}, ${lon.toFixed(2)})`,
          temperature: mockTemp,
          latitude: lat,
          longitude: lon,
        });
        this.isLoadingLocation.set(false);
      })
      .catch((error: any) => {
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
