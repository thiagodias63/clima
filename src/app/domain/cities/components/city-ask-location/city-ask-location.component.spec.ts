import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityAskLocationComponent } from './city-ask-location.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocationService } from '../../services/location/location.service';
import { Position } from '../../interfaces/Position';
const position: Position = { coords: { latitude: 0, longitude: 0 } };
describe('CityAskLocationComponent', () => {
  let component: CityAskLocationComponent;
  let fixture: ComponentFixture<CityAskLocationComponent>;
  let locationServiceSpy: LocationService;
  let detectLocationButtonEl: HTMLButtonElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityAskLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityAskLocationComponent);
    component = fixture.componentInstance;
    locationServiceSpy = TestBed.inject(LocationService);
    fixture.detectChanges();
    const buttonSelector = '[data-testid="detect-location-button"]';
    detectLocationButtonEl = fixture.nativeElement.querySelector(buttonSelector);
    vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValue(
      new Promise(resolve => resolve(position as any)),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isLoadingLocation()).toBeFalsy();
    expect(component.locationError()).toBeNull();
    expect(component.localCity()).toBeNull();
  });

  it('should start detection when click on detect location buttun', () => {
    vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
      new Promise(resolve => {
        setTimeout(() => {
          resolve(position as any);
        }, 1_000);
      }),
    );

    expect(detectLocationButtonEl.getAttribute('disabled')).toBeNull();
    expect(detectLocationButtonEl.textContent).toContain('Detectar Minha Localização');
    detectLocationButtonEl.click();
    fixture.detectChanges();
    expect(detectLocationButtonEl.textContent).toContain('Detectando');
    expect(detectLocationButtonEl.getAttribute('disabled')).toBeDefined();
  });

  describe('get location with error', () => {
    beforeEach(() => {});
    it('should show error message when service return error', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise((resolve, reject) => reject('')),
      );
      let detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl).toBeNull();
      detectLocationButtonEl.click();
      fixture.detectChanges();
      detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl.textContent).toContain(component.locationError());
      expect(component.isLoadingLocation()).toBeFalsy();
      expect(component.locationError()).toBeTruthy();
    });
    it('should return "Não foi possível obter a sua localização." when that is no code match', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise((resolve, reject) => reject({ code: 4 } as any)),
      );
      detectLocationButtonEl.click();
      fixture.detectChanges();
      const detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl.textContent).toContain(
        'Não foi possível obter a sua localização.',
      );
    });
    it('should return "Não foi possível obter a sua localização." when that is no code is null', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise((resolve, reject) => reject({ code: null } as any)),
      );
      detectLocationButtonEl.click();
      fixture.detectChanges();
      const detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl.textContent).toContain(
        'Não foi possível obter a sua localização.',
      );
    });
    it('should return "Não foi possível obter a sua localização." when that is no code is undefined', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise((resolve, reject) => reject({ code: undefined } as any)),
      );
      detectLocationButtonEl.click();
      fixture.detectChanges();
      const detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl.textContent).toContain(
        'Não foi possível obter a sua localização.',
      );
    });
    it('should return "Permissão de localização negada" when browser dont allow location', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise((resolve, reject) => reject({ code: 1 } as any)),
      );
      detectLocationButtonEl.click();
      fixture.detectChanges();
      const detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl.textContent).toContain('Permissão de localização negada');
    });
    it('should return "A localização não pôde ser determinada." when browser can find the location', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise((resolve, reject) => reject({ code: 2 } as any)),
      );
      detectLocationButtonEl.click();
      fixture.detectChanges();
      const detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl.textContent).toContain('A localização não pôde ser determinada');
    });
    it('should return "Tempo esgotado para obter a localização." when has timeout error', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise((resolve, reject) => reject({ code: 3 } as any)),
      );
      detectLocationButtonEl.click();
      fixture.detectChanges();
      const detectLocationErrorEl = fixture.nativeElement.querySelector(
        '[data-testid="detect-location-error-message"]',
      );
      expect(detectLocationErrorEl.textContent).toContain(
        'Tempo esgotado para obter a localização',
      );
    });
  });

  describe('get location with success', () => {
    it('should render the city component', () => {
      vi.spyOn(locationServiceSpy, 'getCurrentPosition').mockReturnValueOnce(
        new Promise(resolve => resolve(position as any)),
      );
      const localCitySelector = '[data-testid="local-city"]';
      let localCitySelectorEl = fixture.nativeElement.querySelector(localCitySelector);
      expect(localCitySelectorEl).toBeNull();
      detectLocationButtonEl.click();
      fixture.detectChanges();
      localCitySelectorEl = fixture.nativeElement.querySelector(localCitySelector + ' city-card');
      expect(localCitySelectorEl).toBeDefined();
      expect(component.localCity()!.city).toEqual('Sua localização');
      expect(component.localCity()!.temperature).toEqual(21);
      expect(component.localCity()!.latitude).toEqual(position.coords.latitude);
      expect(component.localCity()!.longitude).toEqual(position.coords.longitude);
      expect(detectLocationButtonEl.getAttribute('disabled')).toBeNull();
    });
  });
});
