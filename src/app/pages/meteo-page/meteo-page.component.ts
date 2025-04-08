import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { registerLocaleData } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import localeIt from '@angular/common/locales/it';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { MeteoHeaderComponent } from "../../components/meteo-header/meteo-header.component";
import { ForecastHourlyComponent } from "../../components/forecast-hourly/forecast-hourly.component";
import { ForecastDailyComponent } from "../../components/forecast-daily/forecast-daily.component";

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-meteo-page',
  imports: [FormsModule, SearchBarComponent, MeteoHeaderComponent, ForecastHourlyComponent, ForecastDailyComponent],
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
  selectedDate: Date = new Date()

  ngOnInit(): void {
    const city = this.activatedRoute.snapshot.paramMap.get('city')
    city? this.navigateToCity(city) : this.navigateToCity(this.city)
  }



  navigateToCity(city: string){
    {
      this.weatherService.searchMeteoByCity(city).subscribe({
        next: (response) => {
          if(response.results){
            this.latitude = response.results[0].latitude
            this.longitude = response.results[0].longitude
            this.city = response.results[0].name.toLowerCase()
          }else {
            alert('Ci dispiace, la località inserita non è stata trovata')
          }
        },
        complete: () => {
          this.weatherService.searchMeteoByCoords(this.latitude, this.longitude).subscribe(response => {
            this.data = response
            this.daily = this.weatherService.fixedDailyData(response.daily)
            this.current = this.weatherService.fixedCurrentData(response.current)
            this.hourly = this.weatherService.fixedHourlyData(response.hourly, this.todayDate)
          })
          this.router.navigate(['meteo', this.city])
        },
      })
    }
  }

    getDayDetails(selectedDate: any){
    this.selectedDate = new Date(selectedDate)
    this.hourly = this.weatherService.fixedHourlyData(this.data.hourly, selectedDate)
  }

}
