import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import localeIt from '@angular/common/locales/it';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-meteo-page',
  imports: [DatePipe, FormsModule],
  templateUrl: './meteo-page.component.html',
  styleUrl: './meteo-page.component.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'it' }
  ]
})
export class MeteoPageComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute)
  weatherService = inject(WeatherService)
  router = inject(Router)

  latitude: any
  longitude: any
  city: any = 'roma'
  daily: any
  current: any
  hourly: any
  data: any
  todayDate: Date = new Date()

  ngOnInit(): void {
    // const city = this.activatedRoute.snapshot.paramMap.get('city')
    {
      this.weatherService.searchMeteoByCity(this.city).subscribe({
        next: (response) => {
          this.latitude = response.results[0].latitude
          this.longitude = response.results[0].longitude
          this.city = response.results[0].name.toLowerCase()
        },
        complete: () => {
          this.weatherService.searchMeteoByCoords(this.latitude, this.longitude).subscribe(response => {
            this.daily = this.weatherService.fixedDailyData(response.daily)
            this.current = this.weatherService.fixedCurrentData(response.current)
            this.hourly = this.weatherService.fixedHourlyData(response.hourly, this.todayDate)
            this.data = response
          })
          this.router.navigate(['meteo', this.city])
        }
      })
    }
  }

  getDayDetails(selectedDate: any){
    const fixedSelectedDate = new Date(selectedDate)
    this.hourly = this.weatherService.fixedHourlyData(this.data.hourly, fixedSelectedDate)
  }

  navigateToCity(){
    {
      this.weatherService.searchMeteoByCity(this.city).subscribe({
        next: (response) => {
          this.latitude = response.results[0].latitude
          this.longitude = response.results[0].longitude
          this.city = response.results[0].name.toLowerCase()
        },
        complete: () => {
          this.weatherService.searchMeteoByCoords(this.latitude, this.longitude).subscribe(response => {
            this.daily = this.weatherService.fixedDailyData(response.daily)
            this.current = this.weatherService.fixedCurrentData(response.current)
            this.hourly = this.weatherService.fixedHourlyData(response.hourly, this.todayDate)
            this.data = response
            console.log(this.current.background)
          })
          this.router.navigate(['meteo', this.city])
        }
      })
    }
  }



}
