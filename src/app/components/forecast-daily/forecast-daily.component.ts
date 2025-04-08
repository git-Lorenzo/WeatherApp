import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-forecast-daily',
  imports: [DatePipe],
  templateUrl: './forecast-daily.component.html',
  styleUrl: './forecast-daily.component.scss'
})
export class ForecastDailyComponent {
  @Input() daily!: any
  @Output() onEmitDate: EventEmitter<Date> = new EventEmitter()

  getDayDetails(date: Date){
    this.onEmitDate.emit(date)
  }
}
