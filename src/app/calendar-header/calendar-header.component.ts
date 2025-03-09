import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointModalComponent } from '../main/component/appoint-modal/appoint-modal.component';
import { MainService } from '../service/main.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  standalone: true,
  styleUrls: ['./calendar-header.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class CalendarHeaderComponent {

  constructor(
    public dialog: MatDialog,
    private _calendarService: MainService
  ) { }


  currentView: Date = new Date();
  current: Date = new Date();

  goToPrevious() {
    // Logic to go to the previous month/week/day
    const currentDate = new Date(this.currentView);
    currentDate.setMonth(this.currentView.getMonth() - 1);
    this.currentView = currentDate;
    this._calendarService.prevMonth();
  }

  goToNext() {
    // Logic to go to the next month/week/day
    const currentDate = new Date(this.currentView);
    currentDate.setMonth(this.currentView.getMonth() + 1);
    this.currentView = currentDate;
    this._calendarService.nextMonth();
  }

  createAppointment() {
    const dialogRef = this.dialog.open(AppointModalComponent, {
      data: { mode: 'create' },
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

  moveToday() {
    this._calendarService.currentDate$.next(new Date());
  }
}