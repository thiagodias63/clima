// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CityService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
    appRef = TestBed.inject(ApplicationRef);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cities', async () => {
    const mockCities = [
      { city: 'São Paulo', temperature: '22' },
      { city: 'Rio de Janeiro', temperature: '30' },
    ];

    const citiesRef = TestBed.runInInjectionContext(() => service.fetchCities());
    
    // Dispara a leitura do value para que a requisição seja agendada
    citiesRef.value();

    // Roda os efeitos iniciais para que a chamada HTTP seja disparada de fato
    TestBed.flushEffects();
    
    const req = httpMock.expectOne('/cities');
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);

    // Aguarda a resolução da resposta pelo recurso até a aplicação se estabilizar
    await appRef.whenStable();

    expect(citiesRef.value()).toEqual(mockCities);
  });
});
