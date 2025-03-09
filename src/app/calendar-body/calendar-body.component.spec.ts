import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBodyComponent } from './calendar-body.component';

describe('CalendarBodyComponent', () => {
  let component: CalendarBodyComponent;
  let fixture: ComponentFixture<CalendarBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
