import { Component, computed, effect, inject, input, OnInit, signal, untracked } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CityMapGenerator } from '../../services/city-map-generator/city-map-generator.service';

@Component({
	selector: 'city-map',
	templateUrl: './city-map.component.html',
	standalone: true,
})
export class CityMapComponent {
	private sanitizer = inject(DomSanitizer);

	city = input.required<string>();
	latitude = input.required<number>();
	longitude = input.required<number>();
	showRealMap = input.required<boolean>();

	htmlReady = signal(false);

	constructor() {
		effect(() => {
			this.longitude();
			this.latitude();
			if (this.htmlReady()) {
				untracked(() => {
					console.log(this.showRealMap());
					if (!this.showRealMap()) {
						this.generateMap();
					}
				});
			}
		});
	}

	ngAfterViewInit(): void {
		this.htmlReady.set(true);
	}

	private generateMap(): void {
		const latitude = this.latitude();
		const longitude = this.longitude();
		return CityMapGenerator.generate(this.city(), latitude, longitude);
	}

	mapIframeUrl = computed(() => {
		const latitude = this.latitude();
		const longitude = this.longitude();
		const delta = 0.04;
		const bbox = [longitude - delta, latitude - delta, longitude + delta, latitude + delta].join(',');
		const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}&zoom=12`;

		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	});
}
