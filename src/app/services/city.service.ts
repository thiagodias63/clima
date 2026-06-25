import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { City } from '../interfaces/City';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  fetchCities() {
    return httpResource<City[]>(() => '/cities');
  }
}
