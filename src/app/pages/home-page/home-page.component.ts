import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home-page',
  imports: [FormsModule, DatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  weatherService = inject(WeatherService)


  city: string = ''
  dailyMeteo: any[] = []
  currentMeteo: any
  hourlyMeteo: any

  searchMeteoByCity(){
    this.weatherService.searchMeteoByCity(this.city).subscribe(response => {
      const latitude = response.results[0].latitude
      const longitude = response.results[0].longitude
      this.weatherService.searchMeteoByCoords(latitude, longitude).subscribe(response => {
        this.dailyMeteo = this.weatherService.fixedDailyData(response.daily)
        this.currentMeteo = this.weatherService.fixedCurrentData(response.current)
        console.log(response)
        this.hourlyMeteo = this.weatherService.fixedHourlyData(response.hourly)
      })
    })
  }
}
