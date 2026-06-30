import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { describe, beforeEach, it, expect } from 'vitest';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('city', 'Sao Paulo');
    fixture.componentRef.setInput('temperature', 15);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display city in data-testid=city', () => {
    fixture.componentRef.setInput('city', 'Sao Paulo');
    fixture.componentRef.setInput('temperature', 15);
    fixture.detectChanges();

    const city = fixture.nativeElement.querySelector('[data-testid="city"]');

    expect(city.textContent).toContain('Sao Paulo');
  });

  it('should display temperature with sun emoji when temperature is greater than 10', () => {
    fixture.componentRef.setInput('city', 'Sao Paulo');
    fixture.componentRef.setInput('temperature', 15);
    fixture.detectChanges();

    const temperature = fixture.nativeElement.querySelector('[data-testid="temperature"]');

    expect(temperature.textContent).toContain('15ºc ☀️');
  });

  it('should display temperature with snow emoji when temperature is less than or equal to 10', () => {
    fixture.componentRef.setInput('city', 'Sao Paulo');
    fixture.componentRef.setInput('temperature', 10);
    fixture.detectChanges();

    const temperature = fixture.nativeElement.querySelector('[data-testid="temperature"]');

    expect(temperature.textContent).toContain('10ºc ❄️');
  });
});
