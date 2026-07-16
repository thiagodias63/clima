import { Routes } from '@angular/router';
import { CitiesPage } from '../pages/cities/cities.page';
import { CityApi } from '../apis/city/city.api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockCityInterceptor } from '../apis/interceptors/mock-city.interceptor';

export const CITIES_ROUTES: Routes = [
  {
    path: '',
    component: CitiesPage,
    providers: [CityApi, provideHttpClient(withInterceptors([mockCityInterceptor]))],
  },
];
