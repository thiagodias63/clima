import { Component, inject, signal } from '@angular/core';
import { City } from '../../interfaces/City';
import { LocationService } from '../../services/location/location.service';
import { CityCardComponent } from '../city-card/city-card.component';
import { NbStack, NbCluster, NbButton, NbCallout } from '@ng-brutalism/ui';

@Component({
  selector: 'city-ask-location',
  imports: [CityCardComponent, NbStack, NbCluster, NbButton, NbCallout],
  templateUrl: './city-ask-location.component.html',
  styleUrl: './city-ask-location.component.css',
})
export class CityAskLocationComponent {
  private locationService = inject(LocationService);

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
