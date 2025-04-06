import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoPageComponent } from './meteo-page.component';

describe('MeteoPageComponent', () => {
  let component: MeteoPageComponent;
  let fixture: ComponentFixture<MeteoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
