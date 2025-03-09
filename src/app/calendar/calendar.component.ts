import { Component } from '@angular/core';
import { CalendarBodyComponent } from '../calendar-body/calendar-body.component';
import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarBodyComponent, CalendarHeaderComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}

