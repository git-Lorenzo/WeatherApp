import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { meteoIconMap } from '../maps/meteoMap'
import { meteoIconNightMap } from '../maps/meteoMap'
import { meteoBackgroundMap } from '../maps/meteoMap'
import { meteoNightBackgroundMap } from '../maps/meteoMap'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  http = inject(HttpClient)
  router = inject(Router)

  latitude: any
  longitude: any
  city: string = ''

  data: any
  daily: any[] = []
  current: any
  hourly: any

  currentDate: Date = new Date()

  meteoMap = meteoIconMap;
  meteoNightMap = meteoIconNightMap;
  meteoBackgroundMap = meteoBackgroundMap;
  meteoNightBackgroundMap = meteoNightBackgroundMap;

  constructor() { }

  searchMeteoByCity(city: string): Observable<any> {
    return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=it`)
  }

  searchMeteoByCoords(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,precipitation,weather_code,is_day&current=temperature_2m,precipitation,weather_code,is_day&timezone=auto&past_hours=0&forecast_hours=168`)
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
    return this.daily
  }

  fixedCurrentData(currentMeteo: any) {
    this.current = {
      temperature: Math.round(currentMeteo.temperature_2m),
      precipitation: currentMeteo.precipitation,
      date: currentMeteo.time,
      icon: `/${this.meteoMap.get(currentMeteo.weather_code)}.png`,
      background: `url(${this.meteoBackgroundMap.get(currentMeteo.weather_code)}.png) center center / cover no-repeat fixed`,
    }
    if(!currentMeteo.is_day){
      this.current.icon = `/${this.meteoNightMap.get(currentMeteo.weather_code)}.png`
      this.current.background = `url(${this.meteoNightBackgroundMap.get(currentMeteo.weather_code)}.png) center center / cover no-repeat fixed`
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
          precipitation: hourlyMeteo.precipitation[i],
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
