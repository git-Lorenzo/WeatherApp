import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forecast-hourly',
  imports: [DatePipe],
  templateUrl: './forecast-hourly.component.html',
  styleUrl: './forecast-hourly.component.scss'
})
export class ForecastHourlyComponent implements AfterViewInit{
  @Input() date!: Date
  @Input() hourly: any
  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef;

  atStart = true;
  atEnd = false;

  ngAfterViewInit() {
      this.onScroll();
  }

  scrollLeft() {
    if (this.scrollContainer){
      this.scrollContainer.nativeElement.scrollBy({ left: -150, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer){
      this.scrollContainer.nativeElement.scrollBy({ left: 150, behavior: 'smooth' });
    }
  }

  onScroll() {
    if (!this.scrollContainer) return;

    const scroll = this.scrollContainer.nativeElement;
    this.atStart = scroll.scrollLeft <= 0;
    this.atEnd = scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth
  }
}
