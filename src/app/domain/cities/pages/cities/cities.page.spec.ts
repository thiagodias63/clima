import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesPage } from './cities.page';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { spyOn } from '@vitest/spy';
import { CityApi } from '../../apis/city/city.api';
import { City } from '../../interfaces/City';

describe('CitiesPage', () => {
	let component: CitiesPage;
	let fixture: ComponentFixture<CitiesPage>;
	const citiesMock: City[] = [{ city: 'Londres', temperature: 15, latitude: 3.3333, longitude: 4.4444 }];
	const fetchCitiesMock = {
		value: () => citiesMock,
		isLoading: () => false,
		error: () => null,
		reload: () => true,
	} as any;
	let cityApiSpy: CityApi;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CitiesPage],
		}).compileComponents();

		cityApiSpy = TestBed.inject(CityApi);
		vi.spyOn(cityApiSpy, 'fetchCities').mockReturnValue(fetchCitiesMock);
		fixture = TestBed.createComponent(CitiesPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should display title', () => {
		const city = fixture.nativeElement.querySelector('[data-testid="cities-title"]');
		expect(city.textContent).toContain('Previsões por Cidade:');
	});

	it('should display empty message when has no cities', () => {
		const response = {
			value: () => [],
			isLoading: () => false,
			error: () => null,
			reload: () => true,
		} as any;
		vi.spyOn(cityApiSpy, 'fetchCities').mockReturnValueOnce(response);
		fixture = TestBed.createComponent(CitiesPage);
		fixture.detectChanges();
		component = fixture.componentInstance;
		const noCitiesMessageEl = fixture.nativeElement.querySelector('[data-testid="no-cities-to-show"]');
		expect(noCitiesMessageEl.textContent).toContain('⚠️ Nenhuma cidade para mostrar');
		expect(component.cities().length).toEqual(0);
	});

	describe('toggle map', () => {
		let toggleMapButton: HTMLButtonElement;
		beforeEach(() => {
			toggleMapButton = fixture.nativeElement.querySelector('[data-testid="toggle-map-button"]');
		});

		it('should show maps when click on "toggle map" once', () => {
			expect(fixture.nativeElement.querySelector('city-map')).toBeNull();
			toggleMapButton.click();
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('city-map')).not.toBeNull();
			component.cities()?.forEach((city) => {
				expect(city.index).not.toBeNull();
				expect(city.city).not.toBeNull();
				expect(city.temperature).not.toBeNull();
				expect(city.latitude).not.toBeUndefined();
				expect(city.longitude).not.toBeUndefined();
			});
		});

		it('should hide maps when click on "toggle map" twice', () => {
			expect(fixture.nativeElement.querySelector('city-map')).toBeNull();
			// first click
			toggleMapButton.click();
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('city-map')).not.toBeNull();
			// second click
			toggleMapButton.click();
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('city-map')).toBeNull();
			component.cities()?.forEach((city) => {
				expect(city.index).not.toBeNull();
				expect(city.city).not.toBeNull();
				expect(city.temperature).not.toBeNull();
				expect(city.latitude).toBeUndefined();
				expect(city.longitude).toBeUndefined();
			});
		});
	});

	describe('toggle show type', () => {
		let toggleShowTypeButton: HTMLButtonElement;
		beforeEach(() => {
			toggleShowTypeButton = fixture.nativeElement.querySelector('[data-testid="show-as-list-grid-button"]');
		});

		it('should show maps when click on "toggle map" once', () => {
			expect(fixture.nativeElement.querySelector('[data-testid="cities-list"]').classList).toContain('grid-cols-5');
			toggleShowTypeButton.click();
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('[data-testid="cities-list"]').classList).toContain('grid-cols-1');
		});

		it('should hide maps when click on "toggle map" twice', () => {
			expect(fixture.nativeElement.querySelector('[data-testid="cities-list"]').classList).toContain('grid-cols-5');
			toggleShowTypeButton.click();
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('[data-testid="cities-list"]').classList).toContain('grid-cols-1');
			toggleShowTypeButton.click();
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('[data-testid="cities-list"]').classList).toContain('grid-cols-5');
		});
	});

	describe('update cities', () => {
		let updateCitiesButton: HTMLButtonElement;
		beforeEach(() => {
			updateCitiesButton = fixture.nativeElement.querySelector('[data-testid="update-cities-button"]');
		});

		it('should update the cities list when click on "update cities"', () => {
			const spy = spyOn(component.citiesResource, 'reload');
			updateCitiesButton.click();
			fixture.detectChanges();
			expect(spy).toHaveBeenCalledWith();
		});
	});
});
