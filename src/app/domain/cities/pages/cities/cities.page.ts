import { Component, computed, inject, signal } from '@angular/core';
import { NbCluster, NbStack, NbTitle, NbButton } from '@ng-brutalism/ui';
import { CityApi } from '../../apis/city/city.api';
import { CityCardComponent } from '../../components/city-card/city-card.component';
import { CityAskLocationComponent } from '../../components/city-ask-location/city-ask-location.component';
import { CommonModule } from '@angular/common';

@Component({
	templateUrl: './cities.page.html',
	imports: [CityCardComponent, CityAskLocationComponent, NbStack, NbCluster, NbTitle, NbButton, CommonModule],
	standalone: true,
})
export class CitiesPage {
	private cityApi = inject(CityApi);
	citiesResource = this.cityApi.fetchCities();
	showingMap = signal<boolean>(false);
	showType = signal<'list' | 'grid'>('grid');

	updateCities(): void {
		this.citiesResource.reload();
	}

	cities = computed(() => {
		const cities = this.citiesResource.value();
		return cities?.map((c, index) => ({ ...c, index })) ?? [];
	});

	isList = computed(() => this.showType() === 'list');
	isGrid = computed(() => this.showType() === 'grid');

	toggleMap(): void {
		this.showingMap.update((showingMap) => !showingMap);
	}

	toggleShowType(): void {
		this.showType.update((showType) => (showType === 'list' ? 'grid' : 'list'));
	}
}
