import { describe, beforeEach, it, expect } from 'vitest';
import { CityCardComponent } from './city-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CityCardComponent', () => {
	let component: CityCardComponent;
	let fixture: ComponentFixture<CityCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CityCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CityCardComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		fixture.componentRef.setInput('city', 'Sao Paulo');
		fixture.componentRef.setInput('temperature', 15);
		fixture.componentRef.setInput('showType', 'grid');
		fixture.detectChanges();

		expect(component).toBeTruthy();
		expect(component.loading()).toBeFalsy();
		expect(component.latitude()).toBeUndefined();
		expect(component.longitude()).toBeUndefined();
	});

	describe('city map', () => {
		it('should display city map if it has latitude and longitude', () => {
			fixture.componentRef.setInput('latitude', 1);
			fixture.componentRef.setInput('longitude', 1);
			fixture.componentRef.setInput('city', 'Sao Paulo');
			fixture.componentRef.setInput('temperature', 15);
			fixture.componentRef.setInput('showType', 'grid');
			fixture.detectChanges();

			const cityMap = fixture.nativeElement.querySelector('city-map');

			expect(cityMap).not.toBeNull();
		});

		it('should hide city map if it has latitude and longitude', () => {
			fixture.componentRef.setInput('city', 'Sao Paulo');
			fixture.componentRef.setInput('temperature', 15);
			fixture.componentRef.setInput('showType', 'grid');
			fixture.detectChanges();

			const cityMap = fixture.nativeElement.querySelector('city-map');

			expect(cityMap).toBeNull();
		});
	});

	it('should display city name', () => {
		fixture.componentRef.setInput('city', 'Sao Paulo');
		fixture.componentRef.setInput('temperature', 15);
		fixture.componentRef.setInput('showType', 'grid');
		fixture.detectChanges();

		const city = fixture.nativeElement.querySelector('[data-testid="city"]');

		expect(city.textContent).toContain('Sao Paulo');
	});

	it('should display temperature with sun emoji when temperature is greater than 10', () => {
		fixture.componentRef.setInput('city', 'Sao Paulo');
		fixture.componentRef.setInput('temperature', 15);
		fixture.componentRef.setInput('showType', 'grid');
		fixture.detectChanges();

		const temperature = fixture.nativeElement.querySelector('[data-testid="temperature"]');

		expect(temperature.textContent).toContain('15ºc ☀️');
	});

	it('should display temperature with snow emoji when temperature is less than or equal to 10', () => {
		fixture.componentRef.setInput('city', 'Sao Paulo');
		fixture.componentRef.setInput('temperature', 10);
		fixture.componentRef.setInput('showType', 'grid');
		fixture.detectChanges();

		const temperature = fixture.nativeElement.querySelector('[data-testid="temperature"]');

		expect(temperature.textContent).toContain('10ºc ❄️');
	});
});
