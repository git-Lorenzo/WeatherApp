import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meteo-header',
  imports: [DatePipe],
  templateUrl: './meteo-header.component.html',
  styleUrl: './meteo-header.component.scss'
})
export class MeteoHeaderComponent {
  @Input() city!: string
  @Input() current!: any

  todayDate: Date = new Date()
}
