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
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display map', () => {
    fixture.componentRef.setInput('latitude', -23.55);
    fixture.componentRef.setInput('longitude', -46.63);
    fixture.detectChanges();

    const map = fixture.nativeElement.querySelector('[data-testid="city-map"]');

    expect(map).toBeTruthy();
  });
});
