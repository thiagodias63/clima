import { Component, input } from '@angular/core';
import { NbCard, NbCardTitle, NbCardHeader, NbCardContent, NbTitle } from '@ng-brutalism/ui';

@Component({
  selector: 'app-city',
  imports: [NbCard, NbCardTitle, NbCardHeader, NbCardContent, NbTitle],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent {
  city = input<string>();
  tempeture = input<bigint>();
}
