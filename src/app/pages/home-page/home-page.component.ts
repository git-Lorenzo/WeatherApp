import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';



@Component({
  selector: 'app-home-page',
  imports: [FormsModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  weatherService = inject(WeatherService)

  city: string = ''

  searchMeteoByCity(){
    this.weatherService.navigateToMeteo(this.city.toLowerCase())
  }


}
