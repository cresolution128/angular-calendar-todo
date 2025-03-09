import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MainService } from '../service/main.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointModalComponent } from '../main/component/appoint-modal/appoint-modal.component';
import { MatRippleModule } from '@angular/material/core';
import { IAppointment } from '../shared/types';


@Component({
  selector: 'app-calendar-body',
  standalone: true,
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, CommonModule, MatRippleModule]
})
export class CalendarBodyComponent implements OnInit {


  days: Date[] = [];
  appointments: IAppointment[] = [];
  connectedTo: string[] = [];
  currentDate: Date = new Date();
  weekdays: string[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]

  constructor(
    private _calendarService: MainService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.generateDays();
    this._calendarService.calendarData$.next([
      { id: 1, date: new Date(), title: 'Meeting' },
      { id: 2, date: new Date(), title: 'Meeting1' },
      { id: 3, date: new Date(), title: 'Meeting2' },
      { id: 4, date: new Date(new Date().setDate(2)), title: 'Meeting2' },
    ])
    this._calendarService.calendarData$.subscribe((res) => {
      this.appointments = res;
    })
    this._calendarService.currentDate$.subscribe((res) => {
      this.currentDate = res;
      this.days = [];

      this.generateDays();
    })
  }

  generateDays() {
    const start = new Date(this.currentDate);
    start.setDate(1);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    end.setDate(0);
    const tempStart = new Date(this.currentDate);
    const prevDaysCount = start.getDay();
    for (let preInd = 1; preInd <= prevDaysCount; preInd++) {
      const prevDate = new Date(tempStart);
      prevDate.setDate(-prevDaysCount + preInd)
      this.days.unshift(prevDate);
    }

    for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
      this.days.push(new Date(day));
    }

    const tempEnd = new Date(end);
    const nextDaysCount = 6 - end.getDay();

    for (let nextInd = 1; nextInd <= nextDaysCount; nextInd++) {
      const nextDate = new Date(tempEnd);
        nextDate.setDate(nextDate.getDate() + nextInd);
        this.days.push(nextDate);
    }
    this.connectedTo = this.days.map((_, index) => `dropList-${index}`);
  }

  getAppointmentsForDay(day: Date): IAppointment[] {
    return this.appointments.filter(
      appointment => appointment.date.toDateString() === day.toDateString()
    );
  }

  drop(event: CdkDragDrop<IAppointment[]>, day: Date) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const previousContainer = event.previousContainer;
    const container = event.container;

    if (previousContainer === container) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      const fromAppointment = previousContainer.data[previousIndex];
      this.appointments[this.appointments.findIndex((item) => item.id == fromAppointment.id)].date = day;

    }
  }

  updateAppointment(appointment: IAppointment, event: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AppointModalComponent, {
      data: {
        mode: 'update',
        data: appointment
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._calendarService.updateAppointment(appointment.id, result);
      }
    })
  }

  getBgClass(day: Date) {
    if (day.getMonth() === new Date(this.currentDate).getMonth()) {
      if(this.areSameDates(day, new Date())) return 'bg-highlight';
      return 'bg-normal'
    } else return 'bg-disabled'
  }

  areSameDates(first: Date, second: Date) {
    return (
      first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    )
  }

  handleClickDay(day: Date) {
    const dialogRef = this.dialog.open(AppointModalComponent, {
      data: { mode: 'create', data: { date: day } },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._calendarService.addAppointment({
          id: 0,
          date: result.date,
          title: result.title
        })
      }
    })
  }

  getWeekdayClass(weekday: string) {
    if(weekday === 'Sunday'){
      return 'week-sunday week-day'
    } else return 'week-day'
  }
}