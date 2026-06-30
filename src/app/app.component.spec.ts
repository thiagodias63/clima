import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CityService } from './services/city.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AppComponent', () => {
  let mockCityService: Partial<CityService>;

  beforeEach(async () => {
    mockCityService = {
      fetchCities: () => {
        return {
          value: () => [{ city: 'Londres', temperature: '15' }],
          isLoading: () => false,
          error: () => null,
          reload: () => true,
        } as any;
      },
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: CityService, useValue: mockCityService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the mock city list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cityElements = compiled.querySelectorAll('app-city');
    expect(cityElements.length).toBe(1);
    expect(cityElements[0].textContent).toContain('Londres');
    expect(cityElements[0].textContent).toContain('15ºc');
  });
});
