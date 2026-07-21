import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não é suportada por este navegador.'));
      } else {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position),
          error => reject(error),
        );
      }
    });
  }
}
