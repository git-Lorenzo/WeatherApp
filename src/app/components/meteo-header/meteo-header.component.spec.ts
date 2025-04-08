import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoHeaderComponent } from './meteo-header.component';

describe('MeteoHeaderComponent', () => {
  let component: MeteoHeaderComponent;
  let fixture: ComponentFixture<MeteoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
