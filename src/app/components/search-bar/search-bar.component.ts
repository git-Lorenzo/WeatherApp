import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Output() onSearchCity: EventEmitter<string> = new EventEmitter() 
  city: string = ''

  navigateToCity(){
    this.onSearchCity.emit(this.city)
  }
}
