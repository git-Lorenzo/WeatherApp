import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-page',
  imports: [FormsModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  weatherService = inject(WeatherService)
  router = inject(Router)

  city: string = ''

  navigateToCity(){
    this.router.navigate(['meteo', this.city])
  }


}
