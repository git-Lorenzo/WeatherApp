import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meteo-page',
  imports: [DatePipe],
  templateUrl: './meteo-page.component.html',
  styleUrl: './meteo-page.component.scss'
})
export class MeteoPageComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute)
  weatherService = inject(WeatherService)

  ngOnInit(): void {
    const city = this.activatedRoute.snapshot.paramMap.get('city')

    if(city) {
      this.weatherService.searchMeteoByCity(city)
    }
  }

  getDayDetails(selectedDate: any){
    const fixedSelectedDate = new Date(selectedDate)
    this.weatherService.hourly = this.weatherService.fixedHourlyData(this.weatherService.data.hourly, fixedSelectedDate)
  }
}
