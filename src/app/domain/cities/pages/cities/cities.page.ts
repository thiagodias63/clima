import { Component, computed, inject, signal } from '@angular/core';
import { NbCluster, NbStack, NbTitle, NbButton } from '@ng-brutalism/ui';
import { CityApi } from '../../apis/city/city.api';
import { CityCardComponent } from '../../components/city-card/city-card.component';
import { CityAskLocationComponent } from '../../components/city-ask-location/city-ask-location.component';

@Component({
  templateUrl: './cities.page.html',
  imports: [CityCardComponent, CityAskLocationComponent, NbStack, NbCluster, NbTitle, NbButton],
  standalone: true,
})
export class CitiesPage {
  private cityApi = inject(CityApi);
  citiesResource = this.cityApi.fetchCities();
  showMap = signal<boolean>(false);

  updateCities(): void {
    this.citiesResource.reload();
  }

  cities = computed(() => {
    const cities = this.citiesResource.value()!;
    const showMap = this.showMap();
    if (cities.length && !showMap) {
      return cities.map((c, index) => ({
        index,
        city: c.city,
        temperature: c.temperature,
        latitude: undefined,
        longitude: undefined,
      }));
    }
    return cities.map((c, index) => ({ ...c, index }));
  });

  toggleMap(): void {
    this.showMap.update(showMap => !showMap);
  }
}
