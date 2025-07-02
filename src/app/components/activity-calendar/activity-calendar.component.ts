import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Activity {
  title: string;
  start_date: Date;
  activity_type: 'call' | 'visit' | 'e-mail';
}

export interface CalendarDay {
  date: Date;
  isDummy: boolean;
}

@Component({
  selector: 'app-activity-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-calendar.component.html',
  styleUrl: './activity-calendar.component.css'
})
export class ActivityCalendarComponent implements OnInit {
  @Input() activities: Activity[] = [];

  currentMonth: Date = new Date();
  currentView: 'month' | 'week' | 'day' = 'month'; // Default view
  daysInMonth: CalendarDay[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  readonly DUMMY_DATE = new Date(0, 0, 0); // A constant dummy date

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.daysInMonth = [];
    let startDate: Date;
    let endDate: Date;

    if (this.currentView === 'month') {
      startDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
      endDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

      // Fill with leading empty days
      const firstDayOfWeek = startDate.getDay();
      for (let i = 0; i < firstDayOfWeek; i++) {
        this.daysInMonth.push({ date: this.DUMMY_DATE, isDummy: true });
      }

      // Fill with days of the month
      for (let i = 1; i <= endDate.getDate(); i++) {
        this.daysInMonth.push({ date: new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i), isDummy: false });
      }
    } else if (this.currentView === 'week') {
      startDate = new Date(this.currentMonth);
      const dayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() - dayOfWeek); // Go to the first day of the week (Sunday)

      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        this.daysInMonth.push({ date: day, isDummy: false });
      }
    } else if (this.currentView === 'day') {
      this.daysInMonth.push({ date: new Date(this.currentMonth), isDummy: false });
    }
  }

  nextPeriod(): void {
    if (this.currentView === 'month') {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    } else if (this.currentView === 'week') {
      this.currentMonth.setDate(this.currentMonth.getDate() + 7);
    } else if (this.currentView === 'day') {
      this.currentMonth.setDate(this.currentMonth.getDate() + 1);
    }
    this.generateCalendar();
  }

  prevPeriod(): void {
    if (this.currentView === 'month') {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    } else if (this.currentView === 'week') {
      this.currentMonth.setDate(this.currentMonth.getDate() - 7);
    } else if (this.currentView === 'day') {
      this.currentMonth.setDate(this.currentMonth.getDate() - 1);
    }
    this.generateCalendar();
  }

  setMonthView(): void {
    this.currentView = 'month';
    this.generateCalendar();
  }

  setWeekView(): void {
    this.currentView = 'week';
    this.generateCalendar();
  }

  setDayView(): void {
    this.currentView = 'day';
    this.generateCalendar();
  }

  getMonthYear(): string {
    if (this.currentView === 'month') {
      return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    } else if (this.currentView === 'week') {
      const startOfWeek = new Date(this.currentMonth);
      startOfWeek.setDate(this.currentMonth.getDate() - this.currentMonth.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    } else if (this.currentView === 'day') {
      return this.currentMonth.toLocaleDateString();
    }
    return '';
  }

  getActivitiesForDay(day: Date): Activity[] {
    return this.activities.filter(activity =>
      activity.start_date.toDateString() === day.toDateString()
    );
  }
}