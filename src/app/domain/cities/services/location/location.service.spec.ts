import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';
import { describe, beforeEach, it, expect, vi } from 'vitest';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService],
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve position when geolocation is successful', async () => {
    const mockPosition = {
      coords: {
        latitude: -23.55,
        longitude: -46.63,
      },
    } as GeolocationPosition;

    const getCurrentPositionSpy = vi.fn(successCallback => {
      successCallback(mockPosition);
    });

    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: getCurrentPositionSpy,
      },
    });

    const position = await service.getCurrentPosition();
    expect(position.coords.latitude).toBe(-23.55);
    expect(position.coords.longitude).toBe(-46.63);
    expect(getCurrentPositionSpy).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it('should reject when geolocation fails', async () => {
    const mockError = {
      code: 1,
      message: 'User denied Geolocation',
    } as GeolocationPositionError;

    const getCurrentPositionSpy = vi.fn((_, errorCallback) => {
      errorCallback(mockError);
    });

    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: getCurrentPositionSpy,
      },
    });

    await expect(service.getCurrentPosition()).rejects.toEqual(mockError);
    expect(getCurrentPositionSpy).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
