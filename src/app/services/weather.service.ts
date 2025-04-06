import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { meteoIconMap } from '../maps/meteoIconMap'
import { meteoIconNightMap } from '../maps/meteoIconMap'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  http = inject(HttpClient)
  router = inject(Router)

  data: any
  daily: any[] = []
  current: any
  hourly: any
  currentDate: Date = new Date()
  meteoMap = meteoIconMap;
  meteoNightMap = meteoIconNightMap;

  constructor() { }

  navigateToMeteo(city: string){
    this.router.navigate(['meteo', city])
  }

  searchMeteoByCity(city: string): void {
    this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=it`).subscribe(response => {
      const latitude = response.results[0].latitude
      const longitude = response.results[0].longitude
      this.searchMeteoByCoords(latitude, longitude).subscribe(response => {
        console.log(response)
        this.daily = this.fixedDailyData(response.daily)
        this.current = this.fixedCurrentData(response.current)
        this.hourly = this.fixedHourlyData(response.hourly, this.currentDate)
        this.data = response
      })
    })
  }

  searchMeteoByCoords(latitude: number, longitude: number): Observable<any> {
    const apiResponse = this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max,apparent_temperature_max,apparent_temperature_min&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,is_day&timezone=auto&past_hours=0&forecast_hours=168`)

    return apiResponse
  }


  fixedDailyData(dailyMeteo: any) {
    this.daily = [];
    for(let i=0; i < dailyMeteo.time.length; i++){
      const day = {
        id: i+1,
        maxTemp: Math.round(dailyMeteo.temperature_2m_max[i]),
        minTemp: Math.round(dailyMeteo.temperature_2m_min[i]),
        appMaxTemp: Math.round(dailyMeteo.apparent_temperature_max[i]),
        appMinTemp: Math.round(dailyMeteo.apparent_temperature_min[i]),
        date: dailyMeteo.time[i],
        icon: `/${this.meteoMap.get(dailyMeteo.weather_code[i])}.png`
      }
      this.daily.push(day)
    }
    return this.daily
  }

  fixedCurrentData(currentMeteo: any) {
    this.current = {
      temperature: Math.round(currentMeteo.temperature_2m),
      appTemperature: Math.round(currentMeteo.apparent_temperature),
      precipitation: currentMeteo.precipitation,
      humidity: currentMeteo.relative_humidity_2m,
      windSpeed: Math.round(currentMeteo.wind_speed_10m),
      windDirection: currentMeteo.wind_direction_10m,
      date: currentMeteo.time,
      icon: `/${this.meteoMap.get(currentMeteo.weather_code)}.png`
    }
    if(currentMeteo.isday){
      this.current.icon = `/${this.meteoNightMap.get(currentMeteo.weather_code)}.png`
    }
    return this.current
  }

  fixedHourlyData(hourlyMeteo: any, selectedDate: any) {

    this.hourly = []
    const dayNumber = new Date(selectedDate)

    for(let i=0; i < hourlyMeteo.time.length; i++){
      const hourDate = new Date(hourlyMeteo.time[i])
      if(dayNumber.toDateString() === hourDate.toDateString()){
        const hour = {
          id: i+1,
          temperature: Math.round(hourlyMeteo.temperature_2m[i]),
          appTemperature: Math.round(hourlyMeteo.apparent_temperature[i]),
          precipitation: hourlyMeteo.precipitation[i],
          windSpeed: Math.round(hourlyMeteo.wind_speed_10m[i]),
          windDirection: hourlyMeteo.wind_direction_10m[i],
          date: hourlyMeteo.time[i],
          isday: hourlyMeteo.is_day[i],
          icon: ``
        }
        hourlyMeteo.is_day[i] ? 
          hour.icon = `/${ this.meteoMap.get(hourlyMeteo.weather_code[i]) }.png` : 
          hour.icon = `/${ this.meteoNightMap.get(hourlyMeteo.weather_code[i])}.png`
  
        this.hourly.push(hour)
      }

    }
    return this.hourly
  }


}
