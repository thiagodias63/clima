import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAskLocationComponent } from './city-ask-location.component';

describe('CityAskLocationComponent', () => {
  let component: CityAskLocationComponent;
  let fixture: ComponentFixture<CityAskLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityAskLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityAskLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
