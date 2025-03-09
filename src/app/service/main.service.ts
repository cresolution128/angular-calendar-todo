import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAppointment } from '../shared/types';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  calendarData$: BehaviorSubject<IAppointment[]>;
  currentDate$: BehaviorSubject<Date>;

  constructor() {
    this.calendarData$ = new BehaviorSubject<IAppointment[]>([]);
    this.currentDate$ = new BehaviorSubject(new Date());
  }

  addAppointment(appointment: IAppointment) {
    const prev = this.calendarData$.getValue();
    const index = Math.max(...prev.map((item: IAppointment) => item.id)) + 1;
    this.calendarData$.next([...prev, {  ...appointment, id: index }]);
  }

  updateAppointment(id: number, newAppointment: IAppointment) {
    const prev = this.calendarData$.getValue();
    const changedArray = prev.map((item: IAppointment) => {
      if (item.id == id) {
        return {
          id: item.id,
          date: newAppointment.date,
          title: newAppointment.title,
          description: ''
        }
      } else return item;
    })
    this.calendarData$.next(changedArray);
  }

  nextMonth() {
    const firstOfCurrent = this.currentDate$.getValue();
    firstOfCurrent.setDate(1);
    const firstOfNext = new Date(firstOfCurrent);
    firstOfNext.setMonth(firstOfCurrent.getMonth() + 1);

    this.currentDate$.next(firstOfNext);
  }

  prevMonth() {
    const firstOfCurrent = this.currentDate$.getValue();
    firstOfCurrent.setDate(1);
    const firstOfPrev = new Date(firstOfCurrent);
    firstOfPrev.setMonth(firstOfCurrent.getMonth() - 1);

    this.currentDate$.next(firstOfPrev);
  }

  deleteAppointment(id: number) {
    const prev = this.calendarData$.getValue();
    const changedArray = prev.filter((item: IAppointment) => item.id !== id)
    
    this.calendarData$.next(changedArray);
  }
}
