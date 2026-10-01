import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mockCityInterceptor } from './mock-city.interceptor';
import { City } from '../../interfaces/City';
import { faker } from '@faker-js/faker';

describe('MockCityInterceptor', () => {
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(withInterceptors([mockCityInterceptor])), provideHttpClientTesting()],
		});

		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);

		// Enables fake Vitest timers to control delay(2_000)
		vi.useFakeTimers();
	});

	afterEach(() => {
		// Ensures there are no pending, unverified requests.
		httpTestingController.verify();
		vi.useRealTimers();
	});

	it('should intercept requests for "/cities" and return mocked cities after the delay.', async () => {
		let responseReceived = false;
		let responseBody: City[] | null = null;
		const bigIntSpy = vi.spyOn(faker.number, 'bigInt');

		httpClient.get<City[]>('/api/cities').subscribe((response: any) => {
			responseReceived = true;
			responseBody = response;
		});

		// Since the interceptor uses delay(2_000), the request should not have returned yet.
		expect(responseReceived).toBe(false);

		// Advance the Vitest time by 2 seconds to simulate the delay.
		vi.advanceTimersByTime(2000);

		// No real request should go to the backend (HttpTestingController),
		// because the interceptor generated the mocked response locally via of()
		httpTestingController.expectNone('/api/cities');

		expect(responseReceived).toBe(true);
		expect(responseBody).not.toBeNull();
		expect(Array.isArray(responseBody)).toBe(true);
		expect((responseBody as any)?.length).toBe(5);

		// Validates the structure of the mocked data.
		const firstCity = responseBody![0];
		expect(firstCity).toHaveProperty('city');
		expect(firstCity).toHaveProperty('temperature');
		expect(firstCity.latitude).toBeTypeOf('number');
		expect(firstCity.longitude).toBeTypeOf('number');
		expect(bigIntSpy).toHaveBeenCalled();
		expect(bigIntSpy).toHaveBeenCalledWith({ min: -10n, max: 50n });
		expect(bigIntSpy).toHaveBeenCalledTimes(5);
	});

	it('should move on (next) if the URL does not end with /cities.', () => {
		let responseReceived = false;

		httpClient.get('/api/other-endpoint').subscribe(() => {
			responseReceived = true;
		});

		// since is not the mocked url, should call backend
		const req = httpTestingController.expectOne('/api/other-endpoint');
		expect(req.request.method).toBe('GET');

		// Simulates a response from the real server.
		req.flush({ success: true });

		expect(responseReceived).toBe(true);
	});
});
