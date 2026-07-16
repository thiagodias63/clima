import { Component, inject } from '@angular/core';
import { NbCluster, NbStack, NbTitle } from '@ng-brutalism/ui';
import { CityApi } from '../../apis/city/city.api';
import { CityCardComponent } from '../../components/city-card/city-card.component';
import { CityAskLocationComponent } from '../../components/city-ask-location/city-ask-location.component';

@Component({
  templateUrl: './cities.page.html',
  imports: [CityCardComponent, CityAskLocationComponent, NbStack, NbCluster, NbTitle],
  standalone: true,
})
export class CitiesPage {
  private cityApi = inject(CityApi);
  citiesResource = this.cityApi.fetchCities();
}
