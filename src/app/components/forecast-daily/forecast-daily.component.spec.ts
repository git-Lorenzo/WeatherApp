import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDailyComponent } from './forecast-daily.component';

describe('ForecastDailyComponent', () => {
  let component: ForecastDailyComponent;
  let fixture: ComponentFixture<ForecastDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastDailyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
