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

  latitude: any
  longitude: any
  city: any
  daily: any
  current: any
  hourly: any
  data: any
  todayDate: Date = new Date()

  ngOnInit(): void {
    const city = this.activatedRoute.snapshot.paramMap.get('city')

    if(city) {
      this.weatherService.searchMeteoByCity(city).subscribe({
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
          // this.router.navigate(['meteo', this.city])
        }
      })
    }
  }

  getDayDetails(selectedDate: any){
    const fixedSelectedDate = new Date(selectedDate)
    this.hourly = this.weatherService.fixedHourlyData(this.data.hourly, fixedSelectedDate)

  }
}
