import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityMapComponent } from './city-map.component';
import { beforeEach, describe, expect, it } from 'vitest';

describe('CityMapComponent', () => {
	let component: CityMapComponent;
	let fixture: ComponentFixture<CityMapComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CityMapComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CityMapComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		fixture.componentRef.setInput('latitude', -23.55);
		fixture.componentRef.setInput('longitude', -46.63);
		fixture.componentRef.setInput('city', 'city');
		fixture.componentRef.setInput('showRealMap', true);
		fixture.detectChanges();

		expect(component).toBeTruthy();
	});

	it('should display map', () => {
		fixture.componentRef.setInput('latitude', -23.55);
		fixture.componentRef.setInput('longitude', -46.63);
		fixture.componentRef.setInput('city', 'city');
		fixture.componentRef.setInput('showRealMap', true);
		fixture.detectChanges();

		const map = fixture.nativeElement.querySelector('[data-testid="city-map"]');

		expect(map).toBeTruthy();
	});

	it('should computed map correctly', () => {
		const latitude = 1;
		const longitude = 2;
		fixture.componentRef.setInput('latitude', latitude);
		fixture.componentRef.setInput('longitude', longitude);
		fixture.componentRef.setInput('city', 'city');
		fixture.componentRef.setInput('showRealMap', true);
		fixture.detectChanges();
		const bbox = '1.96,0.96,2.04,1.04';
		const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}&zoom=12`;
		const map: HTMLIFrameElement = fixture.nativeElement.querySelector('[data-testid="city-map"]');
		expect(map.getAttribute('src')).toEqual(mapUrl);
	});
});
