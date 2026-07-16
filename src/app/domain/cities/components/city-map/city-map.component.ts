import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbCard, NbCardContent } from '@ng-brutalism/ui';

@Component({
  selector: 'app-city-map',
  imports: [NbCard, NbCardContent],
  templateUrl: './city-map.component.html',
  standalone: true,
})
export class CityMapComponent {
  private sanitizer = inject(DomSanitizer);

  latitude = input.required<number>();
  longitude = input.required<number>();

  mapUrl = computed(() => {
    const latitude = this.latitude();
    const longitude = this.longitude();
    const delta = 0.04;
    const bbox = [longitude - delta, latitude - delta, longitude + delta, latitude + delta].join(
      ',',
    );
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}&zoom=12`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
