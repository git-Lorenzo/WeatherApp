import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { meteoIconMap } from '../maps/meteoIconMap'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  http = inject(HttpClient)

  daily: any[] = []
  meteoMap = meteoIconMap;

  constructor() { }

  searchMeteoByCity(city: string): Observable<any> {
    return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=it`)
  }

  searchMeteoByCoords(latitude: number, longitude: number): Observable<any> {
    const apiResponse = this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m`)

    return apiResponse
  }


  fixedDailyData(dailyMeteo: any) {
    this.daily = [];
    for(let i=0; i < dailyMeteo.time.length; i++){
      const day = {
        id: i+1,
        maxTemp: Math.round(dailyMeteo.temperature_2m_max[i]),
        minTemp: Math.round(dailyMeteo.temperature_2m_min[i]),
        date: dailyMeteo.time[i],
        icon: `/${this.meteoMap.get(dailyMeteo.weather_code[i])}.png`
      }
      this.daily.push(day)
    }
    console.log(this.daily)
    return this.daily
  }


}
