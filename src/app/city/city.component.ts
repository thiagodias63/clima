import { Component, computed, input } from '@angular/core';
import { NbCard, NbCardTitle, NbCardHeader, NbCardContent, NbTitle } from '@ng-brutalism/ui';

@Component({
  selector: 'app-city',
  imports: [NbCard, NbCardTitle, NbCardHeader, NbCardContent, NbTitle],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent {
  city = input.required<string>();
  temperature = input.required<number>();

  temperatureWithEmoji = computed(() => {
    const temperature = this.temperature();
    if (temperature > 10) {
      return temperature + 'ºc ☀️';
    }
    return temperature + 'ºc ❄️';
  });
}
