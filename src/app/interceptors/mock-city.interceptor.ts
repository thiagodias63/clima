import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { City } from '../interfaces/City';

export const mockCityInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.endsWith('/cities')) {
    // Gerar um array de cidades mockadas
    const mockCities: City[] = Array.from({ length: 5 }, () => ({
      city: faker.location.city(),
      temperature: faker.number.bigInt({ min: -10n, max: 50n }).toString(),
    }));

    return of(
      new HttpResponse({
        status: 200,
        body: mockCities,
      }),
    ).pipe(delay(2_000));
  }
  return next(req);
};
