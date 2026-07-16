import { Component, computed, input } from '@angular/core';
import { NbCard, NbCardTitle, NbCardHeader, NbCardContent, NbTitle } from '@ng-brutalism/ui';
import { CityMapComponent } from '../city-map/city-map.component';

@Component({
  selector: 'city-card',
  imports: [NbCard, NbCardTitle, NbCardHeader, NbCardContent, NbTitle, CityMapComponent],
  templateUrl: './city-card.component.html',
})
export class CityCardComponent {
  city = input.required<string>();
  temperature = input.required<number>();
  latitude = input<number>();
  longitude = input<number>();

  temperatureWithEmoji = computed(() => {
    const temperature = this.temperature();
    if (temperature > 10) {
      return temperature + 'ºc ☀️';
    }
    return temperature + 'ºc ❄️';
  });
}
